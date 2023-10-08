import type { ApolloQueryResult } from "@apollo/client";
import clsx from "clsx";
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Custom404 from "pages/404";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { Layout, RichText, VariantSelector } from "@/components";
import { useRegions } from "@/components/RegionsProvider";
import { AttributeDetails } from "@/components/product/AttributeDetails";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPageSeo } from "@/components/seo/ProductPageSeo";
import { messages } from "@/components/translations";
import { usePaths } from "@/lib/paths";
import {
  getAttributeOptionsForVariantSelector,
  getPrimaryAttribute,
  getSelectedVariant,
} from "@/lib/product";
import { useCheckout } from "@/lib/providers/CheckoutProvider";
import { contextToRegionQuery } from "@/lib/regions";
import { translate } from "@/lib/translations";
import { useUser } from "@/lib/useUser";
import {
  CheckoutError,
  ProductBySlugDocument,
  ProductBySlugQuery,
  ProductBySlugQueryVariables,
  ProductDetailsFragment,
  ProductMediaFragment,
  useCheckoutAddProductLineMutation,
  useCreateCheckoutMutation,
} from "@/saleor/api";
import { serverApolloClient } from "@/lib/ssr/common";
import getBase64ImageUrl from "@/lib/generateBlurPlaceholder";
import { useLastViewedProduct } from "@/lib/useLastViewedProduct";

export type OptionalQuery = {
  variant?: string;
};

export type ProductMediaFragmentBlurred = ProductMediaFragment & {
  blurDataUrl: string;
};

export type ProductWithBlurredMedia = ProductDetailsFragment & {
  media: ProductMediaFragmentBlurred[];
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps = async (
  context: GetStaticPropsContext<{ channel: string; locale: string; slug: string }>
) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }

  const productSlug = context.params.slug.toString();
  const response: ApolloQueryResult<ProductBySlugQuery> = await serverApolloClient.query<
    ProductBySlugQuery,
    ProductBySlugQueryVariables
  >({
    query: ProductBySlugDocument,
    variables: {
      slug: productSlug,
      ...contextToRegionQuery(context),
    },
  });
  const updatedMedia: ProductMediaFragmentBlurred[] = [];
  if (response.data.product?.media?.length && response.data.product?.media?.length > 0) {
    const promises = response.data.product?.media?.map((m) => getBase64ImageUrl(m));
    const blurDataList = await Promise.all(promises ?? []);
    blurDataList.forEach((data, ind) => {
      if (typeof response.data.product?.media?.[ind] !== "undefined") {
        updatedMedia.push({
          ...response.data.product.media[ind],
          blurDataUrl: data,
        });
      }
    });
  }
  return {
    props: {
      product: {
        ...(response.data.product as unknown as ProductWithBlurredMedia),
        media: updatedMedia,
      },
    },
    revalidate: 60, // value in seconds, how often ISR will trigger on the server
  };
};

function ProductPage({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const paths = usePaths();
  const t = useIntl();
  const { currentChannel, formatPrice, query } = useRegions();

  const { checkoutToken, setCheckoutToken, checkout } = useCheckout();

  const [createCheckout] = useCreateCheckoutMutation();
  const { user } = useUser();

  const [, setLastViewedProduct] = useLastViewedProduct();

  useEffect(() => {
    // @ts-ignore
    setLastViewedProduct(product);
  });

  const [addProductToCheckout] = useCheckoutAddProductLineMutation();
  const [loadingAddToCheckout, setLoadingAddToCheckout] = useState(false);
  const [addToCartError, setAddToCartError] = useState("");
  const attributeOptions = useMemo(() => getAttributeOptionsForVariantSelector(product), [product]);

  if (!product?.id) {
    return <Custom404 />;
  }
  const selectedVariant = getSelectedVariant({
    product,
    router,
    attributes: attributeOptions,
  });
  const selectedVariantID = selectedVariant?.id;

  const primaryAttribute = useMemo(() => getPrimaryAttribute(attributeOptions), []);
  const selectedPrimaryAttrValue = useMemo(
    () => (primaryAttribute?.attribute?.id ? router.query[primaryAttribute?.attribute?.id] : null),
    [primaryAttribute, router.query]
  );

  const onAddToCart = async () => {
    // Clear previous error messages
    setAddToCartError("");

    // Block add to checkout button
    setLoadingAddToCheckout(true);
    const errors: CheckoutError[] = [];

    if (!selectedVariantID) {
      return;
    }

    if (checkout) {
      // If checkout is already existing, add products
      const { data: addToCartData } = await addProductToCheckout({
        variables: {
          checkoutToken,
          variantId: selectedVariantID,
          locale: query.locale,
        },
      });
      addToCartData?.checkoutLinesAdd?.errors.forEach((e) => {
        if (e) {
          errors.push(e);
        }
      });
    } else {
      // Theres no checkout, we have to create one
      const { data: createCheckoutData } = await createCheckout({
        variables: {
          email: user?.email,
          channel: currentChannel.slug,
          lines: [
            {
              quantity: 1,
              variantId: selectedVariantID,
            },
          ],
        },
      });
      createCheckoutData?.checkoutCreate?.errors.forEach((e) => {
        if (e) {
          errors.push(e);
        }
      });
      if (createCheckoutData?.checkoutCreate?.checkout?.token) {
        setCheckoutToken(createCheckoutData?.checkoutCreate?.checkout?.token);
      }
    }
    // Enable button
    setLoadingAddToCheckout(false);

    if (errors.length === 0) {
      // Product successfully added
      return;
    }

    // Display error message
    const errorMessages = errors.map((e) => e.message || "") || [];
    setAddToCartError(errorMessages.join("\n"));
  };

  const isAddToCartButtonDisabled =
    !selectedVariant || selectedVariant?.quantityAvailable === 0 || loadingAddToCheckout;

  const description = translate(product, "description");

  const price = product.pricing?.priceRange?.start?.gross;
  const shouldDisplayPrice = product.variants?.length === 1 && price;

  return (
    <>
      <ProductPageSeo product={product} />
      <main
        className={clsx(
          "grid grid-cols-1 gap-[3rem] max-h-full overflow-auto md:overflow-hidden container pt-8 px-8 md:grid-cols-3"
        )}
      >
        <div className="col-span-2">
          <ProductGallery
            product={product}
            selectedImageAttributeValue={selectedPrimaryAttrValue}
          />
        </div>
        <div className="space-y-5 mt-10 md:mt-0">
          <div>
            <h1
              className="text-4xl font-bold tracking-tight text-gray-800"
              data-testid="productName"
            >
              {translate(product, "name")}
            </h1>
            {shouldDisplayPrice && (
              <h2 className="text-xl font-bold tracking-tight text-gray-800">
                {formatPrice(price)}
              </h2>
            )}
            {!!product.category?.slug && (
              <Link
                href={paths.category._slug(product?.category?.slug).$url()}
                passHref
                legacyBehavior
              >
                <a>
                  <p className="text-md mt-2 font-medium text-gray-600 cursor-pointer">
                    {translate(product.category, "name")}
                  </p>
                </a>
              </Link>
            )}
          </div>

          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            attributeOptions={attributeOptions}
          />

          <button
            onClick={onAddToCart}
            type="submit"
            disabled={isAddToCartButtonDisabled}
            className={clsx(
              "w-full py-3 px-8 flex items-center justify-center text-base bg-action-1 text-white disabled:bg-disabled hover:bg-white border-2 border-transparent  focus:outline-none",
              !isAddToCartButtonDisabled && "hover:border-action-1 hover:text-action-1"
            )}
            data-testid="addToCartButton"
          >
            {loadingAddToCheckout
              ? t.formatMessage(messages.adding)
              : t.formatMessage(messages.addToCart)}
          </button>

          {!selectedVariant && (
            <p className="text-base text-yellow-600">
              {t.formatMessage(messages.variantNotChosen)}
            </p>
          )}

          {selectedVariant?.quantityAvailable === 0 && (
            <p className="text-base text-yellow-600" data-testid="soldOut">
              {t.formatMessage(messages.soldOut)}
            </p>
          )}

          {!!addToCartError && <p>{addToCartError}</p>}

          {description && (
            <div className="space-y-6">
              <RichText jsonStringData={description} />
            </div>
          )}

          <AttributeDetails product={product} selectedVariant={selectedVariant} />
        </div>
      </main>
    </>
  );
}

export default ProductPage;

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

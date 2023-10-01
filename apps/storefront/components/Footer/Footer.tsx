import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

import { usePaths } from "@/lib/paths";
import { useFooterMenuQuery } from "@/saleor/api";
import { usePagesMenuQuery } from "@/saleor/api";

import { Box } from "../Box";
import { ChannelDropdown } from "../regionDropdowns/ChannelDropdown";
import { LocaleDropdown } from "../regionDropdowns/LocaleDropdown";
import { useRegions } from "../RegionsProvider";
import styles from "./Footer.module.css";
import { FooterMenu } from "@/components/Footer/FooterMenu";

export type FooterProps = HTMLAttributes<HTMLElement>;

// Saleor Cloud currently doesn't support relative URLs in the footer.
// This is a workaround to make the links work.
// @todo remove this when the issue is fixed.

export function Footer({ className, ...rest }: FooterProps) {
  const paths = usePaths();
  const { query } = useRegions();

  const { data, error } = useFooterMenuQuery({ variables: { ...query } });
  const { data: dataPagesMenu, error: errorPagesMenu } = usePagesMenuQuery({
    variables: { ...query },
  });

  if (error || errorPagesMenu) {
    console.error("Footer component error", error?.message || errorPagesMenu?.message);
  }

  const menu = data?.menu?.items || [];
  const menuPages = dataPagesMenu?.menu?.items || [];

  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <Box className={styles["footer-inner"]}>
        <div className="flex mb-14 sm:mb-10 flex-col">
          <Link href={paths.$url()} passHref legacyBehavior>
            <a href="pass" className="hidden sm:inline-block">
              <div className="mt-px group block h-16 w-64 relative grayscale">
                <Image src="/sw.svg" alt="Saleor logo" layout="fill" />
              </div>
            </a>
          </Link>

          <div className="flex">
            <FooterMenu menu={menu as FooterMenu} />
            <FooterMenu menu={menuPages as FooterMenu} />
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-main-3 flex-grow">
            © Copyright 2023 - {new Date().getFullYear()} Smart Wolf
          </p>
          <div className="invisible md:visible flex gap-4">
            <ChannelDropdown horizontalAlignment="right" />
            <LocaleDropdown horizontalAlignment="right" />
          </div>
        </div>
      </Box>
    </footer>
  );
}

export default Footer;

import { createGlobalState } from "react-hooks-global-state";

const initialState = { productToScrollTo: null };
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedProduct = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return useGlobalState("productToScrollTo");
};

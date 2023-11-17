import { createContext, useContext } from "react";
import chartStore from "./chartStore";

const store = {
    chartStore: chartStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
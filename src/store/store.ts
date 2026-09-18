import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer, { type CartState } from '@/lib/store/cart-store';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const loadCartState = (): CartState | undefined => {
  if (typeof window === 'undefined') return undefined;
  try {
    const data = localStorage.getItem('cart');
    if (!data) return undefined;
    return JSON.parse(data);
  } catch {
    return undefined;
  }
};

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      cart: loadCartState(),
    },
  });

  store.subscribe(() => {
    try {
      const state = store.getState();
      localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch {
      // ignore write errors
    }
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const productsLoaded = await AsyncStorage.getItem(
        '@GoMarketPlace:products',
      );

      if (productsLoaded) {
        setProducts(JSON.parse(productsLoaded));
      }
    }

    loadProducts();
  }, []);

  const increment = useCallback(
    async id => {
      const productsUpdated = products.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }

        return product;
      });

      await AsyncStorage.setItem(
        '@GoMarketPlace:products',
        JSON.stringify(productsUpdated),
      );

      setProducts(productsUpdated);
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const productsUpdated = products.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity:
              product.quantity > 1 ? product.quantity - 1 : product.quantity,
          };
        }

        return product;
      });

      await AsyncStorage.setItem(
        '@GoMarketPlace:products',
        JSON.stringify(productsUpdated),
      );

      setProducts(productsUpdated);
    },
    [products],
  );

  const addToCart = useCallback(
    async product => {
      const productFinded = products.find(
        productSearch => productSearch.id === product.id,
      );

      if (!productFinded) {
        const newProduct = {
          ...product,
          quantity: 1,
        };
        const newProducts = [...products, newProduct];

        await AsyncStorage.setItem(
          '@GoMarketPlace:products',
          JSON.stringify(newProducts),
        );

        setProducts(newProducts);
      } else {
        increment(product.id);
      }
    },
    [products, increment],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };

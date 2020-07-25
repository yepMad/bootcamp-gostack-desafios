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
      const storagedProducts = await AsyncStorage.getItem(
        '@GoMarketplace:products',
      );

      if (storagedProducts) {
        setProducts([...JSON.parse(storagedProducts)]);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    async function storeData {
      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(products),
      );
    }

    storeData();
  }, [products])

  const addToCart = useCallback(
    async product => {
      const productsExists = products.find(item => item.id === product.id);

      if (productsExists) {
        setProducts(
          products.map(item =>
            item.id === product.id
              ? {
                  ...product,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        );
      } else {
        setProducts([...products, { ...product, quantity: 1 }]);
      }
    },
    [],
  );

  const increment = useCallback(
    async id => {
      setProducts(oldProducts =>
        oldProducts.filter(item => {
          const actualItem = item;

          if (item.id === id) {
            actualItem.quantity += 1;
            return actualItem;
          }

          return item;
        }),
      );
    },
    [],
  );

  const decrement = useCallback(
    async id => {
      setProducts(oldProducts =>
        oldProducts.filter(item => {
          const actualItem = item;

          if (item.id === id) {
            if (actualItem.quantity === 1) {
              return null;
            }

            actualItem.quantity -= 1;
            return actualItem;
          }

          return item;
        }),
      );
    },
    [],
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

// wishlistContext.tsx
import React, { createContext, useContext, useState, useEffect} from 'react';
import api from './api/axios';
import type { ReactNode } from "react";

interface WishlistContextType {
  wishlistCount: number;
  wishlistItems: number[];
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  refreshWishlist: () => Promise<void>;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);

  // Fetch wishlist on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      refreshWishlist();
    }
  }, []);

  const refreshWishlist = async () => {
    try {
      const response = await api.get('/auth/wishlist/');
      const items = response.data.map((item: any) => item.product.id);
      setWishlistItems(items);
      setWishlistCount(items.length);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlistItems([]);
      setWishlistCount(0);
    }
  };

  const addToWishlist = async (productId: number) => {
    try {
      await api.post('/auth/wishlist/', { product_id: productId });
      setWishlistItems([...wishlistItems, productId]);
      setWishlistCount(wishlistCount + 1);
    } catch (error: any) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      // Find the wishlist item ID
      const response = await api.get('/auth/wishlist/');
      const wishlistItem = response.data.find((item: any) => item.product.id === productId);
      
      if (wishlistItem) {
        await api.delete(`/auth/wishlist/${wishlistItem.id}/`);
        setWishlistItems(wishlistItems.filter(id => id !== productId));
        setWishlistCount(wishlistCount - 1);
      }
    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.includes(productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        refreshWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
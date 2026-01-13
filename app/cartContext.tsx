// app/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api/axios';
import dior from "./dior romanic.jpg";
import narciso from "./narciso romantic.jpg";
import ysl from "./ysl romantic.jpg";
import viktor from "./viktor.jpg";
import tom from "./tom romantic.jpg";
import jo from "./blush romantic.jpg";
import chan from "./chanel romantic.jpg";
import lamour from "./lamour romantic.jpg";
import jacob from "./jacob romantic.jpg";
import maison from "./replica bold.jpg";
import opium from "./opium bold.jpg";
import interlude from "./interlude.jpg";
import dior_b from "./dior bold.jpg";
import oud from "./oud.jpg";
import sha from "./sha bold.jpg";
import mill from "./millon.jpg";
import luten from "./luten bold.jpg";
import irish from "./memo.jpg";
import eau from "./chanel soft.jpg";
import glossier from "./Glossier soft.jpg";
import amazing from "./amazing soft.jpg";
import clean from "./clean.jpg";
import daisy from "./daisy.jpg";
import jasmine from "./jasmine.jpg";
import burberry from "./burberry.jpg";
import maisonf from "./maison.jpg";
import musk from "./musk.jpg";
import lazy from "./lazy.jpg";
import blanche from "./blanche.jpg";
import heretic from "./musk serene.jpg";
import malin from "./malin.jpg";
import xtra from "./xtra.jpg";
import cashmere from "./korres.jpg";
import chloe from "./chloe serene.jpg";
import missing from "./phlur.jpg";
import maisonfrancis from "./maison Francis.jpg";
import whisperChain from "./Whisper Chain Necklace.jpg";
import museHoops from "./Muse Gold Hoops.jpg";
import statementring from "./Ivory Statement Ring.jpg";
import auraWatch from "./Aura Gold Watch.jpg";
import silkBracelet from "./Silk Wrap Bracelet.jpg";
import Ring from "./ring 1.jpg";
import weddingRing from "./wedding ring.jpg";
import engagementRing from "./engagement Ring.jpg";
import squarering from "./squared gold ring.jpg";
import sapphirering from "./sapphire wedding band.jpg";
import rubyring from "./Ruby ring.jpg";
import goldring from "./gold piece.jpg";
import stackring from "./stackring.jpg";
import knotnecklace from "./knot necklace.jpg";
import layerednecklace from "./layered choker.jpg";
import chainnecklace from "./thick chain necklace.jpg";
import gold_plated from "./gold_plated necklace.jpg";
import heartdecor from "./heart decor.jpg";
import silvernecklace from "./silver necklace.jpg";
import pearl from "./pearl necklace.jpg";
import layeredpearl from "./silver layered.jpg";
import butterflybracelet from "./butterfly bracelets.jpg";
import setbracelet from "./2set bracelets.jpg";
import goldset from "./gold set bracelet.jpg";
import silverbracelet from "./personalized bracelet.jpg";
import vintage from "./vintage braclet.jpg";
import pearlbracelet from "./pearl bracelets.jpg";
import diamond from "./diamond bracelets.jpg";
import diamondgold from "./diamond gold bracelet.jpg";
import quartzwatch from "./quartz watch.jpg";
import goldwatch from "./goldchain watch.jpg";
import bronzewatch from "./stainless steel.jpg";
import squarewatch from "./square watch.jpg";
import fossilwatch from "./fossil watch.jpg";
import rhinewatch from "./rhinestone watch.jpg";
import darkwatch from "./blackchain watch.jpg";
import radowatch from "./blackleather watch.jpg";
import tripleearing from "./Triple Knot earing.jpg";
import pearlearing from "./pearl earings.jpg";
import emeraldearing from "./emerald earring.jpg";
import studearing from "./stud earing.jpg";
import diamondstud from "./diamondstud earing.jpg";
import diamondpearl from "./wedding earring.jpg";
import hoopearing from "./hoop earing.jpg";
import thickhoopearing from "./thick hoop earing.jpg";


// Product Image Mapping
export const productImageMap: { [key: number]: string } = {
  1: dior,
  2: narciso,
  3: ysl,
  4: viktor,
  5: tom,
  6: jo,
  7: chan,
  8: lamour,
  9: jacob,
  10: maison,
  11: opium,
  12: interlude,
  13: dior_b,
  14: oud,
  15: sha,
  16: mill,
  17: luten,
  18: irish,
  19: eau,
  20: glossier,
  21: amazing,
  22: clean,
  23: daisy,
  24: jasmine,
  25: burberry,
  26: maisonf,
  27: musk,
  28: lazy,
  29: blanche,
  30: heretic,
  31: malin,
  32: xtra,
  33: cashmere,
  34: chloe,
  35: missing,
  36: maisonfrancis,
  37: whisperChain,
  38: museHoops,
  39: squarering,
  40: Ring,
  41: auraWatch,
  42: silkBracelet,
  43: weddingRing,
  44: engagementRing,
  45: statementring,
  46: sapphirering,
  47: rubyring,
  48: goldring,
  49: stackring,
  50: knotnecklace,
  51: layerednecklace,
  52: chainnecklace,
  53: gold_plated,
  54: heartdecor,
  55: pearl,
  56: silvernecklace,
  57: layeredpearl,
  58: butterflybracelet,
  59: setbracelet,
  60: goldset,
  61: silverbracelet,
  62: vintage,
  63: diamond,
  64: diamondgold,
  65: quartzwatch,
  66: goldwatch,
  67: bronzewatch,
  68: squarewatch,
  69: fossilwatch,
  70: rhinewatch,
  71: darkwatch,
  72: radowatch,
  73: tripleearing,
  74: pearlearing,
  75: emeraldearing,
  76: studearing,
  77: diamondstud,
  78: diamondpearl,
  79: hoopearing,
  80: thickhoopearing,
  81: pearlbracelet,
};

// TypeScript Interfaces
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  total_price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  loading: boolean;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart/');
      
      // Map backend cart items to include frontend images
      const itemsWithImages = response.data.map((item: CartItem) => ({
        ...item,
        product: {
          ...item.product,
          image: productImageMap[item.product.id] || item.product.image || '',
        }
      }));
      
      setCartItems(itemsWithImages);
      calculateTotal(itemsWithImages);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.total_price.toString()), 0);
    setCartTotal(total);
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      setLoading(true);
      await api.post('/cart/add/', {
        product_id: productId,
        quantity: quantity,
      });
      
      await fetchCart();
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      throw error.response?.data?.error || 'Failed to add to cart';
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      setLoading(true);
      await api.patch(`/cart/${itemId}/update-quantity/`, { quantity });
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      setLoading(true);
      await api.delete(`/cart/${itemId}/`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await api.delete('/cart/clear/');
      setCartItems([]);
      setCartTotal(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      fetchCart();
    }
  }, []);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
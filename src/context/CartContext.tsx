"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
  cartItemId: string // duy nhất cho từng biến thể
  id: number
  name: string
  price: number
  quantity: number
  image: string
  color?: { id: number; name: string; hex?: string }
  capacity?: { id: number; name: string }
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (cartItemId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load từ localStorage khi khởi động
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCart(JSON.parse(stored))
  }, [])

  // Lưu vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
  setCart((prev) => {
    const cartItemId =
      item.cartItemId ||
      `${item.id}-${item.color?.id ?? "none"}-${item.capacity?.id ?? "none"}`

    const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId)
    if (existingIndex !== -1) {
      // Nếu đã có cùng biến thể thì tăng số lượng
      const updated = [...prev]
      updated[existingIndex].quantity += item.quantity
      return updated
    }

    // Nếu chưa có thì thêm mới
    return [
      ...prev,
      {
        ...item,
        cartItemId, // luôn đảm bảo có ID duy nhất
      },
    ]
  })
}


  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

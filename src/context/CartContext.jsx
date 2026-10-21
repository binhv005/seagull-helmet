import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct, getVariant } from '../data/products'

const CartContext = createContext(null)

const readStored = () => {
  try {
    const items = JSON.parse(localStorage.getItem('cart') || '[]')
    return Array.isArray(items) ? items.filter((i) => getProduct(i.id)) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStored)
  const [toast, setToast] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch {
      /* storage unavailable */
    }
  }, [items])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(false), 2200)
    return () => clearTimeout(timer)
  }, [toast])

  const value = useMemo(() => {
    const key = (i) => `${i.id}__${i.variant || ''}__${i.size || ''}`
    const add = (id, variant, size, qty = 1) => {
      const k = key({ id, variant, size })
      setItems((prev) => {
        const existing = prev.find((i) => key(i) === k)
        if (existing) return prev.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i))
        return [...prev, { id, variant, size, qty }]
      })
      setToast(true)
    }
    const update = (line, qty) => setItems((prev) => prev.map((i) => (key(i) === key(line) ? { ...i, qty: Math.max(1, qty) } : i)))
    const remove = (line) => setItems((prev) => prev.filter((i) => key(i) !== key(line)))
    const clear = () => setItems([])
    const lines = items.map((i) => {
      const product = getProduct(i.id)
      return { ...i, key: key(i), product, variantData: getVariant(product, i.variant) }
    })
    const count = items.reduce((s, i) => s + i.qty, 0)
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
    return { items: lines, add, update, remove, clear, count, subtotal, toast, isOpen, openCart, closeCart }
  }, [items, toast, isOpen, openCart, closeCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)

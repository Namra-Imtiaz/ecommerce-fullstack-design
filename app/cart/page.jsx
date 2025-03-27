"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProduct, removeFromCart, addToCart } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadCart() {
      try {
        // Get cart from cookies directly instead of using getCart()
        const response = await fetch("/api/cart")
        if (!response.ok) {
          throw new Error("Failed to fetch cart")
        }
        const cart = await response.json()

        // Fetch product details for each cart item
        const itemsWithDetails = await Promise.all(
          cart.map(async (item) => {
            const product = await getProduct(item.productId)
            return {
              ...product,
              quantity: item.quantity,
            }
          }),
        )

        setCartItems(itemsWithDetails)
      } catch (error) {
        console.error("Failed to load cart:", error)
        toast({
          title: "Error",
          description: "Failed to load cart. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [toast])

  const removeItem = async (id) => {
    try {
      await removeFromCart(id)
      setCartItems(cartItems.filter((item) => item.id !== id))
      toast({
        title: "Success",
        description: "Item removed from cart",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      })
    }
  }

  const updateQuantity = async (id, newQuantity) => {
    try {
      await addToCart(id, newQuantity)
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      })
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading cart...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-center p-4">Quantity</th>
                    <th className="text-right p-4">Price</th>
                    <th className="text-right p-4">Total</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div>
                            <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                              {item.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                          className="border rounded p-1 w-16"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-right">${item.price.toFixed(2)}</td>
                      <td className="p-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full">Proceed to Checkout</Button>

              <div className="mt-4">
                <Link href="/products" className="text-sm text-primary hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


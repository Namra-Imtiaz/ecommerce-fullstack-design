"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ChevronLeft, ShoppingCart } from "lucide-react"
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
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <ShoppingCart size={24} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="rounded-full">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="p-4 border-b bg-muted/30">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <h3 className="font-medium">Product</h3>
                  </div>
                  <div className="col-span-2 text-center">
                    <h3 className="font-medium">Quantity</h3>
                  </div>
                  <div className="col-span-2 text-right">
                    <h3 className="font-medium">Price</h3>
                  </div>
                  <div className="col-span-2 text-right">
                    <h3 className="font-medium">Total</h3>
                  </div>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="p-4 border-b">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <Link href={`/products/${item.id}`} className="font-medium hover:text-primary">
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center justify-center">
                        <button
                          className="w-8 h-8 border rounded-l-md flex items-center justify-center"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="w-10 h-8 border-t border-b text-center"
                        />
                        <button
                          className="w-8 h-8 border rounded-r-md flex items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 text-right">${item.price.toFixed(2)}</div>
                    <div className="col-span-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4">
                <Link href="/products" className="inline-flex items-center text-primary hover:underline">
                  <ChevronLeft size={16} className="mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3 font-bold flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full rounded-full">Proceed to Checkout</Button>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">We Accept</h3>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


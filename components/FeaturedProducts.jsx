"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { getProducts, addToCart } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        // Get only the first 4 products for featured section
        setProducts(data.slice(0, 4))
      } catch (error) {
        console.error("Failed to load products:", error)
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [toast])

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1)
      toast({
        title: "Success",
        description: "Product added to cart",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="py-12 text-center">Loading products...</div>
  }

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link href="/products" className="text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/products/${product.id}`} className="block relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={18} className="text-gray-600 hover:text-red-500" />
              </button>
            </Link>

            <div className="p-4">
              <Link href={`/products/${product.id}`} className="block">
                <h3 className="font-medium mb-1 group-hover:text-primary truncate">{product.name}</h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 hover:bg-primary/10"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


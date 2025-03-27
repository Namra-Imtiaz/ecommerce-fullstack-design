"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { addToCart } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

// Add a default value for products and a null check
export default function ProductGrid({ products = [], loading }) {
  const { toast } = useToast()

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
    return <div className="py-8 text-center">Loading products...</div>
  }

  // Check if products exists and has a length property
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">No products found</h2>
        <p className="mb-6">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
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
  )
}


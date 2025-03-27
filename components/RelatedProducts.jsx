"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { getProducts, addToCart } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function RelatedProducts({ category, currentProductId }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadRelatedProducts() {
      try {
        const data = await getProducts(category)
        // Filter out the current product and limit to 4 products
        const relatedProducts = data.filter((product) => product._id !== currentProductId).slice(0, 4)
        setProducts(relatedProducts)
      } catch (error) {
        console.error("Failed to load related products:", error)
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      loadRelatedProducts()
    }
  }, [category, currentProductId])

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
    return <div className="text-center py-4">Loading related products...</div>
  }

  if (products.length === 0) {
    return <div className="text-center py-4">No related products found</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="group border rounded-lg overflow-hidden">
          <Link href={`/products/${product._id}`} className="block relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="p-4">
            <Link href={`/products/${product._id}`} className="block">
              <h3 className="font-medium mb-1 group-hover:text-primary">{product.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">${product.price}</span>
              <Button size="sm" variant="ghost" className="p-2" onClick={() => handleAddToCart(product._id)}>
                <ShoppingCart size={18} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


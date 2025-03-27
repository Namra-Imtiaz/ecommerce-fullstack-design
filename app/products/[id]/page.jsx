"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import RelatedProducts from "@/components/RelatedProducts"
import { getProduct, addToCart } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(params.id)
        setProduct(data)
      } catch (error) {
        console.error("Failed to load product:", error)
        toast({
          title: "Error",
          description: "Failed to load product. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id, toast])

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity)
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
    return <div className="container mx-auto px-4 py-8 text-center">Loading product...</div>
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p>The product you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>

          <div className="my-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex gap-4 my-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                Quantity
              </label>
              <select
                id="quantity"
                className="border rounded-md px-3 py-2 w-20"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="px-8 py-2" onClick={handleAddToCart} disabled={product.stock <= 0}>
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button variant="outline" className="px-8 py-2">
              Add to Wishlist
            </Button>
          </div>

          <div className="mt-6">
            <p className="text-sm">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Availability:</span>{" "}
              {product.stock > 0 ? `${product.stock} in Stock` : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProducts category={product.category} currentProductId={product._id} />
      </div>
    </div>
  )
}


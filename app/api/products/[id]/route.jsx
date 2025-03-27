"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Check } from "lucide-react"
import RelatedProducts from "@/components/RelatedProducts"
import { getProduct, addToCart } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const { toast } = useToast()

  // Mock color and size options
  const colorOptions = ["Black", "White", "Blue", "Red"]
  const sizeOptions = ["XS", "S", "M", "L", "XL"]

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(params.id)
        setProduct(data)
        // Set default selections
        if (colorOptions.length > 0) setSelectedColor(colorOptions[0])
        if (sizeOptions.length > 0) setSelectedSize(sizeOptions[2]) // Default to M
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
      await addToCart(product.id, quantity)
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
        <div className="relative aspect-square rounded-lg overflow-hidden border">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(42 reviews)</span>
            </div>
          </div>

          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>

          <div className="space-y-4 my-4">
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                      selectedColor === color ? "border-primary" : "border-transparent hover:border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      color: ["White", "Yellow"].includes(color) ? "black" : "white",
                    }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded-md ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center w-32">
                <button
                  className="w-8 h-8 border rounded-l-md flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  className="w-16 h-8 border-t border-b text-center"
                />
                <button
                  className="w-8 h-8 border rounded-r-md flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <Button className="flex-1 rounded-full" onClick={handleAddToCart} disabled={product.stock <= 0}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button variant="outline" className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 border-t pt-6">
            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">
                  Description
                </TabsTrigger>
                <TabsTrigger value="details" className="flex-1">
                  Details
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-medium">Category</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-medium">Availability</span>
                    <span>{product.stock > 0 ? `${product.stock} in Stock` : "Out of Stock"}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-medium">Material</span>
                    <span>Premium Quality</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-medium">Shipping</span>
                    <span>Free Shipping</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <p className="text-center py-4">No reviews yet. Be the first to review this product!</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </div>
    </div>
  )
}


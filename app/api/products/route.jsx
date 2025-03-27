"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ProductGrid from "@/components/ProductGrid"
import ProductFilter from "@/components/ProductFilter"
import { getProducts } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const category = searchParams.get("category")
  const search = searchParams.get("search")

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await getProducts(category, search)
        setProducts(data)
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
  }, [category, search, toast])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {category ? `${category} Products` : search ? `Search Results: "${search}"` : "All Products"}
        </h1>
        <p className="text-muted-foreground">
          {products.length} {products.length === 1 ? "product" : "products"} found
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <ProductFilter />
        </div>

        <div className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  )
}


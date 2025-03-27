"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { getCategories } from "@/lib/api"

export default function ProductFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  })

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to load categories:", error)
      }
    }

    loadCategories()

    // Initialize filter values from URL params
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","))
    }

    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice && maxPrice) {
      setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)])
    }

    const inStock = searchParams.get("inStock")
    const outOfStock = searchParams.get("outOfStock")
    setAvailability({
      inStock: inStock === "true",
      outOfStock: outOfStock === "true",
    })
  }, [searchParams])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const handleAvailabilityChange = (key) => {
    setAvailability((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    }

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    if (availability.inStock) {
      params.set("inStock", "true")
    }

    if (availability.outOfStock) {
      params.set("outOfStock", "true")
    }

    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 200])
    setAvailability({
      inStock: false,
      outOfStock: false,
    })
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <Slider value={priceRange} max={500} step={10} onValueChange={setPriceRange} className="mb-6" />
        <div className="flex items-center justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={availability.inStock}
              onCheckedChange={() => handleAvailabilityChange("inStock")}
            />
            <Label htmlFor="in-stock">In Stock</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="out-of-stock"
              checked={availability.outOfStock}
              onCheckedChange={() => handleAvailabilityChange("outOfStock")}
            />
            <Label htmlFor="out-of-stock">Out of Stock</Label>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 space-y-2">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={resetFilters} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  )
}


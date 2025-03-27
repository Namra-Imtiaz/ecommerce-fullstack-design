"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getCategories } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function CategorySection() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to load categories:", error)
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [toast])

  if (loading) {
    return <div className="py-12 text-center">Loading categories...</div>
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`} className="group">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}


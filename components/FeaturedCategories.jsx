import Link from "next/link"
import Image from "next/image"

export default function FeaturedCategories() {
  const categories = [
    { id: "headphones", name: "headphones", image: "/placeholder.svg?height=300&width=300" },
    { id: "camera", name: "samera", image: "/placeholder.svg?height=300&width=300" },
    { id: "usb", name: "usb", image: "/placeholder.svg?height=300&width=300" },
    { id: "earpods", name: "earpods", image: "/placeholder.svg?height=300&width=300" },
  ]

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>

      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`} className="group">
            <div className="relative aspect-square rounded-lg overflow-hidden border shadow-sm">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-4">
                <h3 className="text-white text-lg font-medium">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}


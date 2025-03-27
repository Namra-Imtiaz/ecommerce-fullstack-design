import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function RecentlyViewed() {
  // This would typically come from localStorage or a user's session
  const recentProducts = [
    {
      id: "3",
      name: "Wireless Earbuds",
      price: 99.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
    },
    {
      id: "5",
      name: "Coffee Maker",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Kitchen",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {recentProducts.map((product) => (
        <div
          key={product.id}
          className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
        >
          <Link href={`/products/${product.id}`} className="block relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="p-3">
            <Link href={`/products/${product.id}`} className="block">
              <h3 className="font-medium text-sm mb-1 group-hover:text-primary truncate">{product.name}</h3>
            </Link>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">${product.price.toFixed(2)}</span>
              <Button size="sm" variant="ghost" className="p-1.5 hover:bg-primary/10">
                <ShoppingCart size={16} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


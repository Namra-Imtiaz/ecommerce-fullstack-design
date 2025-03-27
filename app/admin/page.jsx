"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProducts, deleteProduct } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (status === "authenticated") {
      if (session.user.role !== "admin") {
        toast({
          title: "Access Denied",
          description: "You do not have permission to access this page.",
          variant: "destructive",
        })
        router.push("/")
      } else {
        loadProducts()
      }
    } else if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, session, router, toast])

  const loadProducts = async () => {
    try {
      const data = await getProducts()
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

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id)
        setProducts(products.filter((product) => product._id !== id))
        toast({
          title: "Success",
          description: "Product deleted successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        })
      }
    }
  }

  if (status === "loading" || (status === "authenticated" && loading)) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
  }

  if (status === "authenticated" && session.user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-center p-4">Category</th>
              <th className="text-center p-4">Price</th>
              <th className="text-center p-4">Stock</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">{product.category}</td>
                <td className="p-4 text-center">${product.price.toFixed(2)}</td>
                <td className="p-4 text-center">{product.stock}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/products/${product._id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product._id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


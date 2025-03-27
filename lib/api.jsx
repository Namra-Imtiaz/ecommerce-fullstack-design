// Helper functions for API calls

export async function getProducts(category = null, search = null) {
  let url = "/api/products"
  const params = new URLSearchParams()

  if (category) {
    params.append("category", category)
  }

  if (search) {
    params.append("search", search)
  }

  if (params.toString()) {
    url += `?${params.toString()}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  return response.json()
}

export async function getProduct(id) {
  const response = await fetch(`/api/products/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  return response.json()
}

export async function getCategories() {
  const response = await fetch("/api/categories")

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  return response.json()
}

export async function getCart() {
  const response = await fetch("/api/cart")

  if (!response.ok) {
    throw new Error("Failed to fetch cart")
  }

  return response.json()
}

export async function addToCart(productId, quantity) {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  })

  if (!response.ok) {
    throw new Error("Failed to add to cart")
  }

  return response.json()
}

export async function removeFromCart(productId) {
  const response = await fetch(`/api/cart?productId=${productId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to remove from cart")
  }

  return response.json()
}

export async function clearCart() {
  const response = await fetch("/api/cart", {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to clear cart")
  }

  return response.json()
}

export async function createProduct(productData) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    throw new Error("Failed to create product")
  }

  return response.json()
}

export async function updateProduct(id, productData) {
  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    throw new Error("Failed to update product")
  }

  return response.json()
}

export async function deleteProduct(id) {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete product")
  }

  return response.json()
}


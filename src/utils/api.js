// E-commerce API using FakeStoreAPI
const API_BASE = "https://fakestoreapi.com";

const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Random brands for products
const brands = [
  "Nike",
  "Apple",
  "Samsung",
  "Sony",
  "Adidas",
  "Zara",
  "HP",
  "Dell",
  "Amazon Basics",
  "Premium Brand",
];

export async function fetchProducts() {
  await simulateDelay(500);

  try {
    const response = await fetch(`${API_BASE}/products`);
    const products = await response.json();

    return products.map((product) => ({
      id: product.id,
      title:
        product.title.length > 60
          ? product.title.substring(0, 60) + "..."
          : product.title,
      brand: brands[Math.floor(Math.random() * brands.length)],
      description: product.description,
      image: product.image,
      rating: Math.round((product.rating?.rate || 4.5) * 10) / 10,
      reviews: product.rating?.count || Math.floor(Math.random() * 500) + 100,
      sold: Math.floor(Math.random() * 5000) + 1000,
      price: Math.round(product.price * 10) / 10,
      originalPrice: Math.round(product.price * 1.2 * 10) / 10, // 20% higher for discount
      category: product.category
        ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
        : "General",
      tags: [product.category, "Popular", "Trending"].filter(Boolean),
      features: ["High Quality", "Fast Delivery", "Easy Returns", "Warranty"],
      stock: Math.floor(Math.random() * 100) + 10,
      shipping: "Free shipping",
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductById(id) {
  await simulateDelay(300);

  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    const product = await response.json();

    return {
      id: product.id,
      title: product.title,
      brand: brands[Math.floor(Math.random() * brands.length)],
      description: product.description,
      image: product.image,
      rating: Math.round((product.rating?.rate || 4.5) * 10) / 10,
      reviews: product.rating?.count || Math.floor(Math.random() * 500) + 100,
      sold: Math.floor(Math.random() * 5000) + 1000,
      price: Math.round(product.price * 10) / 10,
      originalPrice: Math.round(product.price * 1.2 * 10) / 10,
      category: product.category
        ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
        : "General",
      tags: [product.category, "Popular", "Trending", "Best Seller"].filter(
        Boolean
      ),
      features: [
        "Premium Quality Material",
        "30-Day Return Policy",
        "1-Year Warranty",
        "Free Shipping",
        "24/7 Customer Support",
      ],
      specifications: {
        Material: "Premium",
        Color: "Various",
        Weight: "Lightweight",
        Dimensions: "Standard Size",
      },
      stock: Math.floor(Math.random() * 100) + 10,
      shipping: "Free shipping • Delivery in 2-5 days",
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error(`Product with ID ${id} not found`);
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE}/products/categories`);
    const categories = await response.json();
    return categories.map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1));
  } catch (error) {
    return ["Electronics", "Clothing", "Jewelery", "Home"];
  }
}

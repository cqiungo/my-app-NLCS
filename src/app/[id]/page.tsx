"use client"

import { use, useEffect, useState } from "react"
import { ProductDetail } from "@/components/Product/product-detail"
import productService from "@/services/product.service"
import { Header } from '@/components/header-client';
import ProductGrid from "@/components/product-grid"
import ProductCarousel from "@/components/Product/product-carousel"
import {ProductComments} from "@/components/App/Comment"
interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)

  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if(id){
          const data = await productService.get(Number(id))
          const prod = {
            id: data.id,
            category: data.category?.name,
            categoryId: data.category?.id,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            description: data.description,
            images: data.images,
            image: data.imageUrl,
            colors:data.colors,
            capacities:data.capacities
        }
        console.log("Fetched Product:", data )
        setProduct(prod)
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Không tìm thấy sản phẩm")
      }
    }

    fetchProduct()
  }, [id])

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Đang tải sản phẩm...</p>
      </main>
    )
  }

  return (
    <>
    <Header/>
        <main className="min-h-screen bg-background">
      <ProductDetail product={product} />
      <ProductCarousel/>
      <ProductGrid/>  
    </main>
    </>
  )
}

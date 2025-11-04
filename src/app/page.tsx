"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Header } from "@/components/header-client"
import Intro from "@/components/intro"
import ProductGrid from "@/components/product-grid"
import Overlay from "@/components/Overlay"
import { CategorySidebar } from "@/components/Category/category-sidebar"

export default function Page() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header cố định trên cùng */}
      <Header />

      {/* Body chia 2 phần: sidebar + nội dung chính */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar cố định bên trái với shadow nhẹ */}
        <aside className="w-72 border-r border-gray-200 bg-white shadow-sm">
          <ScrollArea className="h-full">
            <div className="p-4">
              <CategorySidebar />
            </div>
          </ScrollArea>
        </aside>

        {/* Khu vực nội dung chính */}
        <main className="flex-1 overflow-y-auto">
          {/* Container full width */}
          <div className="w-full">
            {/* Intro section */}
            <section className="px-4 py-4">
              <Intro />
            </section>

            {/* Overlay section full width với margin nhỏ 2 bên */}
            <section className="relative w-full min-h-[500px] lg:min-h-[600px] mb-8 mx-8 rounded-2xl overflow-hidden shadow-lg">
              <Overlay />
            </section>

            {/* Product Grid full width */}
            <section className="px-8 py-8 pb-16">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Sản phẩm nổi bật
                </h2>
                <p className="text-gray-600">
                  Khám phá những sản phẩm tốt nhất dành cho bạn
                </p>
              </div>
              <ProductGrid />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
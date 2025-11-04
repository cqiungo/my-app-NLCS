"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface Brand {
  id: number
  name: string
  description: string
  image: string
}

interface BrandCardProps {
  brand: Brand
}

export function BrandCard({ brand }: BrandCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer h-64"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        <Image
          src={brand.image || "/placeholder.svg"}
          alt={brand.name}
          fill
          sizes=" 100vw "
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="text-2xl font-bold mb-2 transition-transform duration-300 group-hover:translate-y-0 translate-y-1">
            {brand.name}
          </h3>
          <p
            className={`text-sm transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            {brand.description}
          </p>
        </div>
      </div>
    </Card>
  )
}

"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

interface Category {
  id: number
  name: string
  image: string
}

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-square mb-3 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image */}
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <ChevronRight className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Category Name */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {category.name}
        </h3>
      </div>
    </motion.div>
  )
}

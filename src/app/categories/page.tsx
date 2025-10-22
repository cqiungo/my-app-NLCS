"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import CategoryCard from "@/components/Category/category-card"
import { Header } from "@/components/header-client"
const categories = [
  { id: 1, name: "Phones", image: "/modern-smartphone.png" },
  { id: 2, name: "Laptops", image: "/premium-laptop-computer.jpg" },
  { id: 3, name: "Accessories", image: "/tech-accessories.png" },
  { id: 4, name: "Smart Home", image: "/smart-home-devices.jpg" },
  { id: 5, name: "Audio", image: "/premium-headphones.png" },
  { id: 6, name: "Wearables", image: "/smartwatch-wearable.jpg" },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeNav, setActiveNav] = useState("categories")

  const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background pb-24">
        <Header></Header>
      {/* Main Content */}
      <main className="px-4 py-6 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-serif font-semibold text-foreground text-balance">Explore Our Collections</h1>
          <p className="text-muted-foreground mt-2">Discover premium tech products curated just for you</p>
        </motion.div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No categories found</p>
          </motion.div>
        )}
      </main>

      {/* Bottom Navigation */}
    </div>
  )
}

"use client"

import { Package, TrendingUp, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface Stats {
  totalProducts: number
  totalCategories: number
  totalValue: number
}

export function ProductHeader({totalProductsProp, totalCategoriesProp, totalValueProp}: {totalProductsProp?: number, totalCategoriesProp?: number, totalValueProp?: number}) {
  const [stats, setStats] = useState<Stats>({
    totalProducts: totalProductsProp ?? 0,
    totalCategories: totalCategoriesProp ?? 0,
    totalValue: totalValueProp ?? 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (totalProductsProp !== undefined && totalCategoriesProp !== undefined && totalValueProp !== undefined) {
      setStats({
        totalProducts: totalProductsProp,
        totalCategories: totalCategoriesProp,
        totalValue: totalValueProp,
        })
        setIsLoading(false)
    }
  }, [totalProductsProp, totalCategoriesProp, totalValueProp])

  const statCards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-600",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      icon: ShoppingCart,
      color: "from-purple-500/10 to-purple-500/5",
      iconColor: "text-purple-600",
    },
    {
      label: "Total Inventory Value",
      value: `$${(stats.totalValue / 1000).toFixed(1)}K`,
      icon: TrendingUp,
      color: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "text-emerald-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Product Management</h1>
        <p className="text-lg text-muted-foreground">Manage and organize your product inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`bg-gradient-to-br ${stat.color} border-0 shadow-sm hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{isLoading ? "-" : stat.value}</p>
                  </div>
                  <div className={`rounded-lg bg-white/50 p-3 ${stat.iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  )
}

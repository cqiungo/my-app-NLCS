import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Truck } from "lucide-react"

const restaurants = [
  {
    id: 1,
    name: "Pizza Hut",
    image: "/pizza-restaurant-interior.png",
    rating: 4.5,
    deliveryTime: "25-35 phút",
    deliveryFee: "15.000đ",
    cuisine: "Pizza, Ý",
    featured: true,
  },
  {
    id: 2,
    name: "Sushi Tokyo",
    image: "/sushi-restaurant-japanese-style.png",
    rating: 4.8,
    deliveryTime: "30-40 phút",
    deliveryFee: "20.000đ",
    cuisine: "Sushi, Nhật Bản",
    featured: false,
  },
  {
    id: 3,
    name: "Phở Hà Nội",
    image: "/vietnamese-pho-restaurant.png",
    rating: 4.6,
    deliveryTime: "20-30 phút",
    deliveryFee: "12.000đ",
    cuisine: "Việt Nam",
    featured: true,
  },
  {
    id: 4,
    name: "Burger King",
    image: "/modern-burger-restaurant.png",
    rating: 4.3,
    deliveryTime: "15-25 phút",
    deliveryFee: "18.000đ",
    cuisine: "Burger, Mỹ",
    featured: false,
  },
  {
    id: 5,
    name: "Bánh Mì Saigon",
    image: "/vietnamese-banh-mi-shop.png",
    rating: 4.7,
    deliveryTime: "10-20 phút",
    deliveryFee: "8.000đ",
    cuisine: "Việt Nam",
    featured: true,
  },
  {
    id: 6,
    name: "Thai Garden",
    image: "/thai-restaurant-elegant.png",
    rating: 4.4,
    deliveryTime: "25-35 phút",
    deliveryFee: "16.000đ",
    cuisine: "Thái Lan",
    featured: false,
  },
]

export default function RestaurantGrid() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Nhà hàng nổi bật</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="relative">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                {restaurant.featured && (
                  <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Nổi bật</Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg text-foreground">{restaurant.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span>{restaurant.deliveryFee}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

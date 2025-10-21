"use client"
import { Card, CardContent } from "@/components/ui/card"
import Search from "./ui/search"
import Image from "next/image"
import { CarouselSpacing } from "./carousel"
import { Star } from "lucide-react"

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  )
}

export default function Intro() {
  return (
    <div className="w-full bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Discover Amazing Possibilities
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Transform your experience with our innovative solutions. Join thousands of satisfied users who have
                already made the switch.
              </p>
            </div>

            <div className="pt-4">
              <Search />
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <Image
                src="https://i.pinimg.com/1200x/dd/65/74/dd6574574817bc11e38cd26013b06195.jpg"
                fill
                alt="Featured showcase"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Image Card */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                backgroundImage: "url('https://i.pinimg.com/1200x/e9/9f/d3/e99fd3881d16ea75b2ca0d5283536a02.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Social Proof Card */}
          <div className="flex flex-col justify-between">
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Trusted by</p>
                    <p className="text-3xl font-bold text-foreground">100K+</p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">Highly Rated</p>
                    <StarRating count={5} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Collections</h2>
            <p className="text-muted-foreground">Explore our curated selection</p>
          </div>
          <CarouselSpacing />
        </div>
      </div>
    </div>
  )
}

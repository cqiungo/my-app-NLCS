"use client"
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const banners = [
  {
    id: 1,
    image: "https://i.pinimg.com/1200x/5c/02/28/5c0228800884f7f764db6d4e8dee46c1.jpg",
    title: "Elegance",
    description: "Discover timeless beauty",
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/70/aa/a8/70aaa847ac58c3127294430abdb7b1fc.jpg",
    title: "Innovation",
    description: "Experience the future",
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/01/2c/c1/012cc1ac6bf35e514a761ff852f22d6e.jpg",
    title: "Inspiration",
    description: "Find your next idea",
  },
  {
    id: 4,
    image: "https://i.pinimg.com/736x/27/35/59/273559d18ecaa7ce046f16a1c18c9c9f.jpg",
    title: "Creativity",
    description: "Unleash your potential",
  },
  {
    id: 5,
    image: "https://i.pinimg.com/1200x/f5/e4/64/f5e4641317b1fb4f556bca72ae2de6a1.jpg",
    title: "Vision",
    description: "See what's possible",
  },
]

export function CarouselSpacing() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
            <CarouselContent className="m-0">
              {banners.map((banner, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 text-balance">{banner.title}</h3>
                      <p className="text-sm md:text-base text-white/90">{banner.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-900 border-0 shadow-lg transition-all duration-300 hover:shadow-xl h-12 w-12 rounded-full flex items-center justify-center">
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-900 border-0 shadow-lg transition-all duration-300 hover:shadow-xl h-12 w-12 rounded-full flex items-center justify-center">
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </Carousel>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                current === index
                  ? "h-3 w-8 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50"
                  : "h-3 w-3 bg-slate-300 hover:bg-slate-400",
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index}
            />
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{current + 1}</span>
          <span> / </span>
          <span>{count}</span>
        </div>
      </div>
    </div>
  )
}

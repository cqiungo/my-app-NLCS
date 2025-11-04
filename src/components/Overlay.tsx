"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Carousel component
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const slides = [
    {
      id: 1,
      title: "Camera Pro",
      description: "Chụp ảnh chuyên nghiệp với công nghệ AI tiên tiến",
      image: "https://i.pinimg.com/1200x/a1/ba/b9/a1bab9c3e46ba699080577363b3b275a.jpg",
    },
    {
      id: 2,
      title: "A18 Pro Chip",
      description: "Hiệu năng đỉnh cao cho mọi tác vụ",
      image: "https://i.pinimg.com/736x/bf/9e/a5/bf9ea5d9030722b23cb26a19817865d4.jpg",
    },
    {
      id: 3,
      title: "Màn hình OLED",
      description: "Hiển thị sống động với độ tương phản vô hạn",
      image: "https://i.pinimg.com/736x/9f/59/29/9f5929fd259d4ba646e8c35c54a50428.jpg",
    },
    {
      id: 4,
      title: "Pin lâu",
      description: "Sử dụng cả ngày với công nghệ pin mới",
      image: "https://i.pinimg.com/1200x/c6/b2/47/c6b247d80f16c63aa2f6666608c3313a.jpg",
    },
  ]

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoPlay, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  return (
    <div className="relative w-full h-full">
      {/* Slides */}
      <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image */}
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col items-center justify-center">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center text-balance">{slide.title}</h2>
              <p className="text-lg md:text-xl text-gray-100 text-center max-w-md text-balance">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-black p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-black p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              setAutoPlay(false)
            }}
            className={`rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8 h-3" : "bg-white/50 w-3 h-3 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Landing3D() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:px-16 py-20 gap-12 lg:gap-16">
        {/* Left side - Text content */}
        <div className="lg:w-1/2 z-10 text-slate-900 animate-fade-in">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Công nghệ mới nhất
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 text-balance leading-tight">
            iPhone 17 Pro Max
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-slate-600 leading-relaxed text-balance">
            Khám phá thiết kế tương lai — sang trọng, mạnh mẽ và tinh tế. iPhone 17 Pro Max – đỉnh cao công nghệ trong
            lòng bàn tay bạn.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-600/40">
              Mua ngay
            </button>
            <button className="border-2 border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 px-8 py-4 rounded-full font-semibold transition-all">
              Tìm hiểu thêm
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">📸</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Camera Pro</h3>
              <p className="text-sm text-slate-600">Chụp ảnh chuyên nghiệp</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">A18 Pro Chip</h3>
              <p className="text-sm text-slate-600">Hiệu năng đỉnh cao</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">🖥️</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Màn hình OLED</h3>
              <p className="text-sm text-slate-600">Hiển thị sống động</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">🔋</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Pin lâu</h3>
              <p className="text-sm text-slate-600">Sử dụng cả ngày</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="w-full h-[500px] lg:h-[700px]">
            <Carousel />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-slate-600 text-sm border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <p>© 2025 iPhone Carousel Experience. Khám phá các tính năng nổi bật.</p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}

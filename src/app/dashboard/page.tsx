"use client"

import { Smartphone, Zap, Shield, Headphones, Camera, Cpu } from "lucide-react"

export default function FeaturesGrid() {
  const features = [
    {
      icon: Smartphone,
      title: "Thiết Kế Hiện Đại",
      description: "Màn hình AMOLED 120Hz với độ phân giải cao",
      image: "https://i.pinimg.com/736x/e2/4d/f5/e24df5025fabbc69eb0e31b17aa97aa0.jpg",
    },
    {
      icon: Zap,
      title: "Pin Siêu Bền",
      description: "Thời lượng pin lên đến 48 giờ với sạc nhanh 65W",
      image: "https://i.pinimg.com/1200x/f5/af/e8/f5afe8320bdd07ba05c07a52cd9eb058.jpg",
    },
    {
      icon: Camera,
      title: "Camera Chuyên Nghiệp",
      description: "Hệ thống camera 200MP với AI tối ưu hóa",
      image: "https://i.pinimg.com/736x/95/a4/89/95a489c040ecef1784b599e82916e879.jpg",
    },
    {
      icon: Cpu,
      title: "Hiệu Năng Vượt Trội",
      description: "Chip xử lý mới nhất với tốc độ xử lý siêu nhanh",
      image: "https://i.pinimg.com/736x/55/48/9c/55489c8493c22295d612d46d2a26d5ba.jpg",
    },
    {
      icon: Shield,
      title: "Bảo Mật Cao Cấp",
      description: "Cảm biến vân tay siêu âm và nhận diện khuôn mặt 3D",
      image: "https://i.pinimg.com/736x/9c/43/20/9c4320831635a10ba15e3d8bbc0a2089.jpg",
    },
    {
      icon: Headphones,
      title: "Âm Thanh Sống Động",
      description: "Loa kép stereo với công nghệ Dolby Atmos",
      image: "https://i.pinimg.com/1200x/4f/4f/ae/4f4fae5a207ead0ba4492d721b4e7aab.jpg",
    },
  ]

  return (
    <>
       <section className="relative h-96 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-background overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          
          src="https://i.pinimg.com/736x/79/37/38/7937387ddc4a1e1a9dce9ef9d07a3caf.jpg"
          alt="Phone Store Hero"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Công Nghệ Điện Thoại Hàng Đầu
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl text-balance">
          Khám phá bộ sưu tập điện thoại thông minh mới nhất với công nghệ tiên tiến và thiết kế tuyệt vời
        </p>
      </div>
    </section>
      <section className="px-6 py-16 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Tính Năng Nổi Bật</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Những công nghệ tiên tiến nhất được tích hợp trong mỗi chiếc điện thoại
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-muted">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

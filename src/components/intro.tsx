"use client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Star, Smartphone, Zap, Shield, Truck, Award, Users, TrendingUp, Gift, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-blue-500 text-blue-500" />
      ))}
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="p-3 bg-blue-500 rounded-full">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function StatCard({ number, label, icon: Icon }: { number: string; label: string; icon: any }) {
  return (
    <div className="flex items-center gap-4 p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{number}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <p className="text-muted-foreground">{text}</p>
    </div>
  )
}

export default function Intro() {
  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-cyan-50">
      <div className="container mx-auto py-12 md:py-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold w-fit animate-pulse">
                🎉 Ưu đãi mới nhất - Giảm giá đến 50%
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Khám phá Điện thoại Thông minh Tuyệt vời
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Trải nghiệm công nghệ tiên tiến với giá tốt nhất. Hàng ngàn khách hàng hài lòng đã chọn chúng tôi.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">50K+</p>
                <p className="text-xs text-muted-foreground">Khách Hàng</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">4.9★</p>
                <p className="text-xs text-muted-foreground">Đánh Giá</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">500+</p>
                <p className="text-xs text-muted-foreground">Sản Phẩm</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8">
                Mua Ngay
              </Button>
              <Button size="lg" variant="outline" className="font-semibold px-8">
                Xem Thêm
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <Image
                src="https://i.pinimg.com/736x/7e/4f/97/7e4f972516921328e1b61c9be343fbc0.jpg"
                fill
                alt="Điện thoại thông minh cao cấp"
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                -50% OFF
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Expanded */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <FeatureCard
            icon={Smartphone}
            title="Công Nghệ Mới Nhất"
            description="Chip xử lý mạnh mẽ, hiệu năng vượt trội"
          />
          <FeatureCard icon={Zap} title="Pin Lâu Dài" description="Sạc nhanh, dùng cả ngày không lo hết pin" />
          <FeatureCard icon={Shield} title="Bảo Hành Chính Hãng" description="Bảo hành 12 tháng, hỗ trợ 24/7" />
          <FeatureCard icon={Truck} title="Giao Hàng Nhanh" description="Miễn phí vận chuyển, giao trong 24h" />
        </div>

        {/* Additional Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <FeatureCard icon={Gift} title="Quà Tặng Hấp Dẫn" description="Tặng phụ kiện cao cấp khi mua hàng" />
          <FeatureCard icon={Award} title="Chất Lượng Đảm Bảo" description="100% hàng chính hãng, nguyên seal" />
          <FeatureCard icon={Clock} title="Hỗ Trợ 24/7" description="Tư vấn miễn phí mọi lúc, mọi nơi" />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <StatCard number="50,000+" label="Khách Hàng Tin Tưởng" icon={Users} />
          <StatCard number="98%" label="Tỷ Lệ Hài Lòng" icon={TrendingUp} />
          <StatCard number="10,000+" label="Đánh Giá 5 Sao" icon={Award} />
        </div>

        {/* Featured Section - Extended */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Featured Image Card 1 */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundImage: "url('https://i.pinimg.com/1200x/72/7f/74/727f742390856789813622c50d6b4f0e.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Bộ Sưu Tập Mới 2024</h3>
                <p className="text-sm md:text-base opacity-90 mb-4">
                  Khám phá những mẫu điện thoại mới nhất với công nghệ hàng đầu
                </p>
                <Button className="bg-white text-black hover:bg-gray-100">Khám Phá Ngay</Button>
              </div>
            </div>
          </div>

          {/* Social Proof Card */}
          <div className="flex flex-col justify-between gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2 font-semibold">Được Tin Tưởng Bởi</p>
                    <p className="text-4xl font-bold text-blue-600">50K+</p>
                    <p className="text-sm text-muted-foreground">Khách Hàng Hài Lòng</p>
                  </div>
                  <div className="pt-4 border-t border-blue-200">
                    <p className="text-sm text-muted-foreground mb-3 font-semibold">Đánh Giá Cao</p>
                    <StarRating count={5} />
                    <p className="text-xs text-muted-foreground mt-2">4.9/5 sao từ 10K+ đánh giá</p>
                  </div>
                  <div className="pt-4 border-t border-blue-200">
                    <p className="text-sm text-muted-foreground mb-3 font-semibold">Chứng Chỉ</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Hàng Chính Hãng</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Bảo Hành</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground font-semibold">Ưu Đãi Đặc Biệt</p>
                  <p className="text-2xl font-bold text-purple-600">Giảm 50%</p>
                  <p className="text-sm text-muted-foreground">Cho đơn hàng đầu tiên</p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Nhận Ngay</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* New Featured Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div
            className="relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">iPhone Series</h3>
              <p className="text-sm opacity-90 mb-4">Trải nghiệm đỉnh cao với iPhone mới nhất</p>
              <Button className="bg-white text-black hover:bg-gray-100">Xem Ngay</Button>
            </div>
          </div>

          <div
            className="relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Samsung Galaxy</h3>
              <p className="text-sm opacity-90 mb-4">Công nghệ Android hàng đầu thế giới</p>
              <Button className="bg-white text-black hover:bg-gray-100">Khám Phá</Button>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Tại Sao Chọn Chúng Tôi?</h2>
            <p className="text-center text-muted-foreground mb-8">
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất
            </p>
            <div className="grid gap-4">
              <BenefitItem text="Sản phẩm 100% chính hãng, nguyên seal từ nhà sản xuất" />
              <BenefitItem text="Bảo hành chính hãng 12 tháng, đổi mới trong 30 ngày" />
              <BenefitItem text="Miễn phí vận chuyển toàn quốc cho đơn hàng trên 5 triệu" />
              <BenefitItem text="Tư vấn miễn phí 24/7 từ đội ngũ chuyên gia" />
              <BenefitItem text="Hỗ trợ trả góp 0% lãi suất, duyệt nhanh trong 15 phút" />
              <BenefitItem text="Tích điểm thành viên, đổi quà hấp dẫn" />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Sẵn Sàng Nâng Cấp Điện Thoại?</h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Tìm chiếc điện thoại hoàn hảo cho bạn ngay hôm nay. Nhận ưu đãi đặc biệt cho khách hàng mới lên đến 50%.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
              Khám Phá Ngay
            </Button>
            <Button
              variant="outline"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
            >
              Liên Hệ Tư Vấn
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
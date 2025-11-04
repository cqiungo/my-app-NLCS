import { BrandCard } from "./brand-card"

const brands = [
  {
    id: 1,
    name: "Apple",
    description: "Công nghệ tiên tiến với thiết kế sang trọng",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    id: 2,
    name: "Samsung",
    description: "Đổi mới công nghệ màn hình AMOLED",
    image: "https://icon2.cleanpng.com/20180324/cre/avdfqbz33.webp",
  },
  {
    id: 3,
    name: "Xiaomi",
    description: "Giá tốt với hiệu năng mạnh mẽ",
    image: "https://e7.pngegg.com/pngimages/234/461/png-clipart-xiaomi-mi-1-graphics-logo-xiaomi-logo-text-trademark-thumbnail.png",
  },
  {
    id: 4,
    name: "Google Pixel",
    description: "Camera AI và trí tuệ nhân tạo hàng đầu",
    image: "https://iconlogovector.com/uploads/images/2024/09/lg-66d8fd0551bf5-Google-Pixel.webp",
  },
  {
    id: 5,
    name: "OnePlus",
    description: "Hiệu năng cao với giá cạnh tranh",
    image: "https://logolook.net/wp-content/uploads/2022/12/OnePlus-Symbol.png",
  },
  {
    id: 6,
    name: "Oppo",
    description: "Công nghệ sạc nhanh và camera chuyên nghiệp",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/OPPO_LOGO_2019.png",
  },
  {
    id: 7,
    name: "Vivo",
    description: "Thiết kế mỏng nhẹ với pin lâu dài",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Vivo_logo_2019.svg/2560px-Vivo_logo_2019.svg.png",
  },
  {
    id: 8,
    name: "Realme",
    description: "Giá rẻ với cấu hình mạnh",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Realme_logo.png",
  },
]

export function BrandGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Danh Mục Hãng Điện Thoại</h1>
        <p className="text-gray-400 text-lg">Khám phá các hãng điện thoại hàng đầu thế giới</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </section>
  )
}

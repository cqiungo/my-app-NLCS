"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, Menu, User2, Sparkles, ShoppingCart } from "lucide-react"
import { useUser } from "@/context/UserContext"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { useCart } from "@/context/CartContext"

const navigationItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Danh mục", href: "/categories" },
  { name: "Đơn hàng", href: "/orders" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const userContext = useUser().user
  const { cart } = useCart() // ✅ sửa lỗi: phải gọi useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchValue)}`
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const cartCount = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "h-16 border-b border-border/40 bg-background/80 backdrop-blur-md shadow-sm"
          : "h-20 border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground hidden sm:inline transition-all duration-200 group-hover:text-primary">
                Smart Mobile
              </span>
            </Link>
          </div>

          {/* 🔍 Thanh tìm kiếm */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-6"
          >
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 rounded-l-md"
            />
            <Button
              type="submit"
              className="rounded-l-none bg-primary hover:bg-primary/90 text-white"
            >
              Tìm
            </Button>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* 🛒 Icon giỏ hàng */}
            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent/50 transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5 text-foreground/80" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* 👤 User menu */}
            {userContext ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 hover:bg-accent/50 transition-all duration-200"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
                      {userContext.name}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Link href="/auth/login">Đăng nhập</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-primary/30"
                >
                  Bắt đầu
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-accent/50 transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Mở menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center gap-2 p-4 border-b border-border/20 bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-lg text-foreground">
                      Smart Mobile
                    </span>
                  </div>

                  {/* 🔍 Search trong mobile */}
                  <form onSubmit={handleSearch} className="p-4 flex gap-2">
                    <Input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button type="submit" className="bg-primary text-white">
                      Tìm
                    </Button>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col flex-1 p-4 gap-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="px-3 py-2.5 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200 font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <div className="flex flex-col gap-2 p-4 border-t border-border/20">
                    {userContext ? (
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 bg-transparent"
                      >
                        <User2 className="h-4 w-4" />
                        {userContext.name}
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Link href="/auth/login">Đăng nhập</Link>
                        </Button>
                        <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground">
                          Bắt đầu
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

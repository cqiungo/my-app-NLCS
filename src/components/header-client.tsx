"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, Menu, User2, Sparkles } from "lucide-react"
import { useUser } from "@/context/UserContext"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useSession } from "next-auth/react";

const navigationItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Dịch vụ", href: "/services" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Liên hệ", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const userContext = useUser().user

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "h-16 border-b border-border/40 bg-background/80 backdrop-blur-md shadow-sm"
          : "h-20 border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground hidden sm:inline transition-all duration-200 group-hover:text-primary">
                Logo
              </span>
            </Link>
          </div>

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

          {/* Right Section - Account & CTA */}
          <div className="flex items-center gap-3">
            {userContext ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/50 transition-all duration-200">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">Tài khoản</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                  <DropdownMenuItem>Thanh toán</DropdownMenuItem>
                  <DropdownMenuItem>Đội ngũ</DropdownMenuItem>
                  <DropdownMenuItem>Đăng ký</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
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

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="hover:bg-accent/50 transition-all duration-200">
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
                    <span className="font-bold text-lg text-foreground">Logo</span>
                  </div>

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

                  {/* Mobile CTA Buttons */}
                  <div className="flex flex-col gap-2 p-4 border-t border-border/20">
                    {userContext ? (
                      <>
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                          <User2 className="h-4 w-4" />
                          Tài khoản
                        </Button>
                      </>
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

"use client"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2, Edit, Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import productService from "@/services/product.service"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"
import categoryService from "@/services/category.service"
import { ProductHeader } from "@/components/Product/ProductHeader"
import {ProductFormDialog} from "@/components/Product/AddProd"
interface Product {
  id: number
  name: string
  description: string
  imageUrl: string
  images: string[]
  category: string
  quantity: number
  price: number
  createdAt: Date
  categoryId: string | null
  colors:colorItem[],
  capacities:capacityItem[],
}
interface colorItem {
  id:number,
  name:string
}

interface capacityItem{
  id:number,
  name:string
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const token = useUser().user?.access_token
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000 })
  const [minQuantity, setMinQuantity] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalValues = products.reduce((acc, product) => acc + product.price * product.quantity, 0)


useEffect(() => {
  async function fetchCategories() {
    if (!token) return; 

    try {
      const res = await categoryService.getAll(token);
      setCategories(res.map((cat: any) => cat.name));
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn("🔒 Unauthorized, redirecting to login...");
        router.push("/auth/login");
      } else {
        console.error("❌ Fetch categories error:", error);
      }
    }
  }

  fetchCategories();
}, [token, router]);

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    async function fetchProducts() {
      try {
        setIsLoading(true)
        const res = await productService.getAll(token)
        const newProducts: Product[] = res.map((product: any) => 

          ({
          id: product.id,
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: product.quantity ?? 0,
          createdAt: product.createdAt,
          categoryId: product.category?.id ?? null,
          category: product.category.name,
          images:product.images,
          colors:product.colors,
          capacities:product.capacities
        }))
        setProducts(newProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProducts()
  }, [token, router])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())



      const matchesCategory = selectedCategory === null || product.category === selectedCategory

      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max

      const matchesQuantity = product.quantity >= minQuantity

      return matchesSearch && matchesCategory && matchesPrice && matchesQuantity
    })
  }, [products, searchTerm, selectedCategory, priceRange, minQuantity])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  
  const handleDelete = (id: number) => {
      productService.delete(id, token as string)
    .then(() => {
      router.refresh()
      console.log("Product deleted successfully")
    })
    .catch((error) => {
      console.error("Error deleting product:", error)
    })
  }

  const handleEdit = (product: Product) => {
    setIsDialogOpen(true)
    setSelectedProduct(product)
    console.log("Edit product:", product)
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setPriceRange({ min: 0, max: 1000 })
    setMinQuantity(0)
    setCurrentPage(1)
  }

  const handleFilterChange = (callback: () => void) => {
    callback()
    setCurrentPage(1)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-4 rounded-lg border border-border bg-card p-4">
        <ProductHeader totalProductsProp={products.length} totalCategoriesProp={categories.length} totalValueProp={totalValues} />
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by product name or description..."
              value={searchTerm}
              onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
              className="pl-10"
            />
          </div>
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterChange(() => setSearchTerm(""))}
              className="px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button onClick={()=>{
            setIsDialogOpen(true);
            setSelectedProduct(null);
          }} className="gap-2">
            <Plus className="h-4 w-4" />
            Thêm sản phẩm
          </Button>
        </div>
          <ProductFormDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} data={
            {
              id: selectedProduct?.id || null,
              name: selectedProduct?.name || "",
              description: selectedProduct?.description || "",
              price: selectedProduct?.price.toString() || "",
              quantity: selectedProduct?.quantity.toString() || "",
              category: selectedProduct?.category || "",
              categoryId: selectedProduct?.categoryId?.toString() || "",
              images: selectedProduct?.imageUrl ? [selectedProduct.imageUrl] : [],
              colors: selectedProduct?.colors.map((color)=>color.id) || [],
              capacities:selectedProduct?.capacities.map((capacity)=>capacity.id)
            }
            
          }/>
        {/* Filter Controls */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Category Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium">Danh mục</label>
            <select
              value={selectedCategory || ""}
              onChange={(e) => handleFilterChange(() => setSelectedCategory(e.target.value || null))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium">Giá nhỏ nhất</label>
            <Input
              type="number"
              placeholder="Min price"
              value={priceRange.min}
              onChange={(e) => handleFilterChange(() => setPriceRange({ ...priceRange, min: Number(e.target.value) }))}
              min="0"
            />
          </div>

          {/* Max Price Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium">Giá lớn nhất</label>
            <Input
              type="number"
              placeholder="Max price"
              value={priceRange.max}
              onChange={(e) => handleFilterChange(() => setPriceRange({ ...priceRange, max: Number(e.target.value) }))}
              min="0"
            />
          </div>

          {/* Min Quantity Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium">Số lượng nhỏ nhất</label>
            <Input
              type="number"
              placeholder="Min quantity"
              value={minQuantity}
              onChange={(e) => handleFilterChange(() => setMinQuantity(Number(e.target.value)))}
              min="0"
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead className="text-right">Số lượng</TableHead>
              <TableHead className="text-right">Giá</TableHead>
              <TableHead>Tạo vào ngày</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {product.description}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                  <TableCell className="text-right font-semibold">{formatPrice(product.price)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                  Không có sản phẩm nào được tìm thấy.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
          <div className="text-sm text-muted-foreground">
            Trang {currentPage} của {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Trước
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Sau
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
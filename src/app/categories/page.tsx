import {BrandGrid} from "@/components/Category/category-grid"
import { Header } from "@/components/header-client"
export default function Home() {
  return (
    <>
    <Header />
      <main className="min-h-screen bg-background">
      <BrandGrid />
    </main>
    </>
  )
}

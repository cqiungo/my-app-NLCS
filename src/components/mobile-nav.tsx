import { Home, Search, Plus, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border lg:hidden">
        <div className="max-w-2xl mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Button variant="ghost" size="icon" className="text-primary">
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Bottom padding to account for fixed nav - only on mobile */}
      <div className="h-16 lg:hidden" />
    </>
  )
}

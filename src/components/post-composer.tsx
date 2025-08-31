import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export function PostComposer() {
  return (
    <Card className="m-4 lg:m-6 p-6 border-0 shadow-sm">
      <div className="flex gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg?height=48&width=48" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input
            placeholder="What's on your mind?"
            className="border-0 bg-transparent p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0 min-h-[60px]"
          />
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-6 text-muted-foreground">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                📷 Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                🎥 Video
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                📊 Poll
              </Button>
            </div>
            <Button size="default" className="bg-primary hover:bg-primary/90 px-8">
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

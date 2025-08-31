import { Heart, MessageCircle, Repeat2, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  name: string
  username: string
  avatar: string
  verified: boolean
}

interface Post {
  id: number
  user: User
  content: string
  timestamp: string
  likes: number
  replies: number
  reposts: number
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="mx-4 lg:mx-6 mb-4 lg:mb-6 p-6 border-0 shadow-sm hover:bg-card/50 transition-all duration-200 cursor-pointer">
      <div className="flex gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {post.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{post.user.name}</span>
            {post.user.verified && <span className="text-primary">✓</span>}
            <span className="text-muted-foreground">@{post.user.username}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{post.timestamp}</span>
          </div>

          <p className="text-foreground leading-relaxed text-lg">{post.content}</p>

          <div className="flex items-center gap-8 pt-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 group transition-colors"
            >
              <Heart className="h-5 w-5 mr-2 group-hover:fill-primary transition-colors" />
              {post.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-accent hover:bg-accent/10 group transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {post.replies}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-secondary hover:bg-secondary/10 group transition-colors"
            >
              <Repeat2 className="h-5 w-5 mr-2" />
              {post.reposts}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

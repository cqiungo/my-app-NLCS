import { ScrollArea } from "@/components/ui/scroll-area"
import { PostCard } from "./post-card"
import { PostComposer } from "./post-composer"
import { MobileNav } from "./mobile-nav"

export default function ThreadsHome() {
  const posts = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        username: "sarahc",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      content:
        "Just shipped a new feature that I've been working on for weeks! The feeling of seeing users actually use something you built is unmatched 🚀",
      timestamp: "2h",
      likes: 24,
      replies: 8,
      reposts: 3,
    },
    {
      id: 2,
      user: {
        name: "Alex Rivera",
        username: "alexr",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      content:
        "Hot take: The best code is the code you don't have to write. Sometimes the most elegant solution is the simplest one.",
      timestamp: "4h",
      likes: 156,
      replies: 32,
      reposts: 18,
    },
    {
      id: 3,
      user: {
        name: "Maya Patel",
        username: "mayap",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      content:
        "Working on a new design system and I'm obsessed with how clean these components are turning out. Typography really makes all the difference ✨",
      timestamp: "6h",
      likes: 89,
      replies: 15,
      reposts: 7,
    },
    {
      id: 4,
      user: {
        name: "David Kim",
        username: "davidk",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      content:
        "Coffee shop coding session turned into a 6-hour deep dive into React patterns. Sometimes the best learning happens when you're not trying to learn 📚",
      timestamp: "8h",
      likes: 42,
      replies: 12,
      reposts: 5,
    },
    {
      id: 5,
      user: {
        name: "Emma Wilson",
        username: "emmaw",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      content:
        "Reminder: Your side project doesn't have to change the world. It just has to make you excited to work on it. Build for joy first 💫",
      timestamp: "12h",
      likes: 203,
      replies: 28,
      reposts: 45,
    },
  ]

  return (
    <div className=" absolute inset-0 w-full ">
      <main className="max-w-2xl mx-auto">
        <PostComposer />

          <div className="mx-auto bg-background rounded-md ">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
      </main>

      <MobileNav />
    </div>
  )
}

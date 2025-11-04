"use client"

import type React from "react"

import { use, useEffect, useState } from "react"
import { Star, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import commentService from "@/services/comment.service"
interface Comment {
  id: string
  productId?: string    
  content: string
  date: string
}
interface ProductPageProps {
  params: Promise<{ id: string }>
}


const mockComments: Comment[] = [

]

export function ProductComments({ params }: ProductPageProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [content, setContent] = useState("")
  const { id } = use(params)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await commentService.getByProduct(id)
        setComments(data || [])
        } catch (error) {
        console.error("Error fetching comments:", error)
        }
    }
    fetchComments()
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content) return

    const newComment: Comment = {
      id: String(comments.length + 1),
      content,
      date: "Vừa xong",
    }

    setComments([newComment, ...comments])
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Đánh giá sản phẩm</h2>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Average Rating */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">Dựa trên {comments.length} đánh giá</p>
            </div>
          </Card>

          {/* Rating Distribution */}

        </div>
      </div>

      {/* Add Comment Form */}
      <Card className="p-6 mb-8 border-2 border-blue-200">
        <h3 className="text-xl font-semibold mb-6">Chia sẻ đánh giá của bạn</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}

          {/* Rating */}

          {/* Title */}

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Nội dung đánh giá</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Gửi đánh giá
          </Button>
        </form>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-6">Tất cả đánh giá ({comments.length})</h3>
        {comments.map((comment) => (
          <Card key={comment.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* Comment Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{comment.date}</p>
                </div>
              </div>
            </div>

            {/* Rating Stars */}
            {/* Comment Title and Content */}
            <p className="text-gray-700 mb-4 leading-relaxed">{comment.content}</p>

            {/* Helpful Button */}
          </Card>
        ))}
      </div>
    </div>
  )
}

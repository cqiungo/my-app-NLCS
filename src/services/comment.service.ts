import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

class CommentService {
  async getByProduct(productId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  async addComment(productId: string, content: string) {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ product_id: productId, content }])
      .select()
    if (error) throw error
    return data[0]
  }
}

export default new CommentService()

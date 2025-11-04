"use client"
import type * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession, getSession } from "next-auth/react"
import { useUser } from "@/context/UserContext"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"

export default function SignInForm() {
  const [emailError, setEmailError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const userContext = useUser()
  const session = useSession()

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement

    let isValid = true

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true)
      setEmailErrorMessage("Nhập email hợp lệ.")
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage("")
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage("Mật khẩu ít nhất 6 ký tự.")
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage("")
    }

    return isValid
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValid = validateInputs()
    if (!isValid) return

    const user = new FormData(event.currentTarget)
    setIsLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email: user.get("email"),
      password: user.get("password"),
    })

    if (res.error) {
      setEmailError(true)
      setPasswordError(true)
      setPasswordErrorMessage("Email hoặc mật khẩu không đúng")
      setIsLoading(false)
      return
    }

    const sesion = await getSession()
    const role = sesion?.user?.role

    if (role === "ADMIN") router.push("/dashboard")
    else if (role === "USER") router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20"></div>

        <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mb-4 mx-auto">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white text-center mb-2">Đăng nhập</h1>
            <p className="text-slate-400 text-center text-sm">Chào mừng bạn quay lại</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    emailError ? "border-red-500/50" : "border-slate-600/50 hover:border-slate-500/50"
                  }`}
                />
              </div>
              {emailErrorMessage && <p className="mt-1.5 text-sm text-red-400">{emailErrorMessage}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••"
                  autoComplete="current-password"
                  required
                  className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    passwordError ? "border-red-500/50" : "border-slate-600/50 hover:border-slate-500/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {passwordErrorMessage && <p className="mt-1.5 text-sm text-red-400">{passwordErrorMessage}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  className="w-4 h-4 bg-slate-700 border border-slate-600 rounded cursor-pointer accent-blue-500"
                />
                <span className="ml-2 text-sm text-slate-400">Nhớ tôi</span>
              </label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  Đăng nhập
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-600/50"></div>
            <span className="text-xs text-slate-500">hoặc</span>
            <div className="flex-1 h-px bg-slate-600/50"></div>
          </div>

          <p className="text-center text-slate-400 text-sm">
            Chưa có tài khoản?{" "}
            <a href="/auth/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

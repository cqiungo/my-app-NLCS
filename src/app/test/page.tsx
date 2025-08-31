'use client';
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, Button } from "antd"
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react"
import { AppSidebar } from "../components/SideBar/sideBar";
import { Header } from '@/components/header-client';
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
import Image from 'next/image'

export default function ScrollAreaDemo() {
  return (
    <>
      <Image
        src="https://res.cloudinary.com/dbjroxnkb/image/upload/v1751217676/samples/breakfast.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
    />
    </>
  )
}

import Link from 'next/link';
// import the correct font export from '@/app/ui/fonts'
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { auth } from "@/auth"
import { ScrollArea } from "@/components/ui/scroll-area"
import ThreadsHome from '@/components/newsfeed';
import { Header } from '@/components/header-client';
import Intro from '@/components/intro';
export default async function Page() {
  return (
    <>
      <Header />
      <Intro/>
    </>
  );
}
import Link from 'next/link';
// import the correct font export from '@/app/ui/fonts'
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { auth } from "@/auth"
export default async function Page() {
  const session = await auth()
  return (
    <p className={` text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            {JSON.stringify(session)}
    </p>
      
  );
}
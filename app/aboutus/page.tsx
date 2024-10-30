import AniTitle from "@/components/AniTitle"
import Gravity from "@/components/Gravity"
import Image from "next/image";
import tslogo from "@/public/img/tslogo.webp"
import githublogo from "@/public/img/githublogo.webp"
import nextlogo from "@/public/img/nextlogo.webp"
import pglogo from "@/public/img/pglogo.webp"
import twlogo from "@/public/img/twlogo.webp"
import supabaselogo from "@/public/img/supabaselogo.webp"

export default async function AboutUsPage() {


    return (
        <>
            <div className="left-40 w-10 top-20 sm:top-40 absolute">
                <AniTitle />
            </div >
            <div className="absolute h-28 top-44 sm:top-72 w-3/5">
                <h2 className="text-2xl">About us...</h2>
                <p className="p-8">Thank you for visiting our final week group project, with the Tech Educators!</p>
                <h3 className="text-xl p-8">👥Credits👥</h3>
                <ul>
                    <li className="p-4">🦥 Matt</li>
                    <li>🦏 Scott</li>
                    <li className="p-4">🦇 Nitej</li>
                    <li>🐕 Joe</li>
                </ul>
            </div>
            <div className="absolute right-10 w-8 bottom-10">
                <Image className="h-auto w-100" 
                    src={tslogo}
                    alt="TypeScript logo"
                    width={50}
                    height={38}
                    priority />
            </div>
            
            <div className="absolute right-24 w-8 bottom-16">
                <Image className="h-auto w-100 rounded" 
                    src={nextlogo}
                    alt="Next.js logo"
                    width={50}
                    height={38}
                    priority />
            </div>
                
            <div className="absolute right-36 w-12 bottom-10">
                <Image className="h-auto w-100 rounded" 
                    src={pglogo}
                    alt="PostgreSQL logo"
                    width={50}
                    height={38}
                    priority />
            </div>

            <div className="absolute right-48 w-12 bottom-14">
                <Image className="h-auto w-100 rounded" 
                    src={supabaselogo}
                    alt="Supabase logo"
                    width={50}
                    height={38}
                    priority />
            </div>

            <div className="absolute right-64 w-8 bottom-10">
                <Image className="h-auto w-100 rounded" 
                    src={githublogo}
                    alt="Github logo"
                    width={50}
                    height={38}
                    priority />
            </div>

            <div className="absolute right-80 w-8 bottom-16">
                <Image className="h-auto w-100 rounded" 
                    src={twlogo}
                    alt="Tailwind logo"
                    width={50}
                    height={38}
                    priority />
            </div>

            <Gravity/>
        </>
    );
}
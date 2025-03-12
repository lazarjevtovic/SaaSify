'use client'

import Link from "@node_modules/next/link"
import Image from "@node_modules/next/image"
import {useState, useEffect} from "react"
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState([]);
    const [dropdown, setDropdown] = useState(true);

    useEffect(()=>{
        const getAndSetProviders = async()=>{
            const p = await getProviders();
            console.log("Providers", p);
            setProviders(p);
        }
        getAndSetProviders();
    }, [])

  return (
    <nav className="flex justify-between px-7 py-4 mb-6 sm:mb-12">
        <Link href="/">
            <p className="logo">SaaSify.</p>
        </Link>

        {/*Desktop navigation*/}
        <div className="sm:block hidden">
            {session?
            (<div className="flex gap-2.5">
                <Link href="/share-idea" className="button-full">Share idea</Link>
                <button className="button-outline" onClick={signOut}>Sign Out</button>
                <Link href="/profile">
                    <Image className="rounded-full" src={session?.user.image} alt="User profile image" width={42} height={42}/>
                </Link>
                
            </div>
            ):
            (Object.values(providers).map(provider=>(<button key={provider.id} className="button-full" onClick={()=>{signIn(provider.id)}}>Sign In</button>)))}
        </div>

        {/*Mobile navigation*/}
        <div className="sm:hidden block relative">
            {session?(
                <><Link href="#"><Image className="rounded-full w-9"
                src={session?.user.image} alt="User profile image"
                width={42} height={42}
                onClick={()=>{setDropdown((prev)=>!prev)}}/></Link>
                {dropdown && (<div className="absolute top-12 right-0 bg-white rounded-[10px] flex flex-col gap-4 p-2.5">
                    <Link href="/profile" className="text-center" onClick={()=>{setDropdown(false)}}>My Profile</Link>
                    <Link href="/share-idea" className="text-center" onClick={()=>{setDropdown(false)}}>Share idea</Link>
                    <button className="button-outline" onClick={()=>{setDropdown(false); signOut();}}>Sign Out</button>
                    </div>)}
            </>):(Object.values(providers).map(provider=>(<button key={provider.id} className="button-full" onClick={()=>{signIn(provider.id)}}>Sign In</button>)))}
        </div>
    </nav>
  )
}

export default Nav
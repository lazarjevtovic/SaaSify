'use client';

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useParams } from "@node_modules/next/navigation";
import { useRouter } from "@node_modules/next/navigation";

const page = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const {id} = useParams();
  const [user, setUser] = useState(null)
  useEffect(()=>{
    if(session && session?.user.id === id){
        router.push('/profile')
    }
  }, [session])
  useEffect(()=>{
      const getAndSetUser = async()=>{
          const response = await fetch(`/api/user/${id}`, {
              method: 'GET'
          })
          if(response.ok){
              const data = await response.json()
              console.log(data);
              setUser(data);
          }
      }
      if(id) getAndSetUser();
  },[])
  return (
    <section>
        {user?<Profile user={user}/>:<p>Loading</p>}
    </section>
  )
}

export default page
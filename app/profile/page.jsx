'use client';

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

const page = () => {
  const {data: session} = useSession();
  const [user, setUser] = useState(null)



  useEffect(()=>{
      const getAndSetUser = async()=>{
          const response = await fetch(`/api/user/${session?.user.id}`, {
              method: 'GET'
          })
          if(response.ok){
              const data = await response.json()
              console.log(data);
              setUser(data);
          }
      }
      if(session?.user.id) getAndSetUser();
  },[session?.user.id])
  return (
    <section>
        {user?<Profile user={user}/>:<p>Loading</p>}
    </section>
  )
}

export default page
import { useEffect, useState } from "react"
import Image from "@node_modules/next/image"
import Link from "@node_modules/next/link"
import PostCard from "./PostCard"

const Profile = ({user}) => {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        console.log(user)
        const getAndSetPosts = async()=>{
            const response = await fetch(`/api/user/${user._id}/posts`);
            if(response.ok){
                const data = await response.json();
                setPosts(data);
            }
        }
        getAndSetPosts();
    }, [])


    const handleDelete = async(post)=>{
        const confirmed = confirm("Are you sure you want to delete this post?")
        if(confirmed){
          const response = await fetch(`/api/post/${post._id}`,{
            method: 'DELETE'
          })
          if(response.ok){
            setPosts(oldPosts=>oldPosts.filter(p=>p._id!==post._id))
          }
          
        }
      }

  return (
    <div className="flex flex-col items-center">
        <div className="flex gap-4 justify-center sm:gap-5 items-center w-[500px] mb-16">
            <Image className="rounded-full" src={user.image} width={48} height={48} alt={`${user.username}'s Profile Picture`}/>
            <div>
                <h1 className=" !text-xl sm:!text-3xl !mb-0">{`${user.username}'s Profile`}</h1>
                <Link href={`mailto:${user.email}`}>{user.email}</Link>
            </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 mx-auto">
            {posts.map(post=>(<PostCard handleDelete={()=>handleDelete(post)} key={post._id} post={post}/>))}
        </div>
    </div>
  )
}

export default Profile
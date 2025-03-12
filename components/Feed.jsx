'use client'
import { useState, useEffect } from "react"
import PostCard from "./PostCard";
import Search from "@components/Search"

const Feed = () => {
    const [searched, setSearched] = useState("")
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    useEffect(()=>{
        const getAndSetPosts = async()=>{
            const p = await fetch('/api/post', {
                method: 'GET'
            })
            if(p.ok){
                console.log(p);
                const data = await p.json();
                
                console.log(data);
                setPosts(data);
                setAllPosts(data);
            }
        }
        getAndSetPosts();
    }, []);
    useEffect(()=>{
        setPosts(allPosts.filter(post=>post.creator.username.startsWith(searched) || 
    post.industry.startsWith(searched) || post.text.includes(searched)))
    }, [searched])
  return (
    <>
     <Search searched={searched} setSearched={setSearched}/>
     <div className="grid lg:grid-cols-2 gap-8 mx-auto">
        {posts.map(post=>(<PostCard handleDelete={()=>{}} key={post._id} post={post}/>))}
    </div>
    </>

  )
}

export default Feed
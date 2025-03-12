import Image from "@node_modules/next/image"
import Link from "@node_modules/next/link"
import { useSession } from "next-auth/react"
import { usePathname } from "@node_modules/next/navigation"

const PostCard = ({post, handleDelete}) => {
  const {data: session} = useSession();
  const pathName = usePathname();
  return (
    <div className='w-[400px]  shadow-md rounded-[10px] overflow-clip pb-4 flex flex-col justify-between'>
        <div>
            <div className='bg-main-2 flex justify-end px-4 py-3'>
                <p className='text-white'>{post.industry}</p>
            </div>
            <p className="ml-4 my-6 text-black/60 text-[14px]">{post.text}</p>
        </div>
        <div className="flex justify-between mx-4">
          <div className="flex items-center gap-2">
            <Link  href={`/profile/${post.creator._id}`}>
              <Image src={post.creator.image} alt="Profile image" width={30} height={30} className="rounded-full"/>
            </Link>
            <Link  href={`/profile/${post.creator._id}`}>
              <p className="font-semibold">{post.creator.username}</p>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {session?.user.id===post.creator._id && pathName==='/profile'?(<>
            <Link href={`/edit-post/${post._id}`}>Edit</Link>
            <button className="cursor-pointer" onClick={handleDelete}>Delete</button>
            </>):(<></>)}
            
          </div>
        </div>
        
    </div>
  )
}

export default PostCard
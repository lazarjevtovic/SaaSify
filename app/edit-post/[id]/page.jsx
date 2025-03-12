'use client'

import Form from '@components/Form';
import { useState, useEffect } from 'react';
import { useRouter } from '@node_modules/next/navigation';
import { useSession } from 'next-auth/react';
import { useParams } from '@node_modules/next/navigation';

const EditPost = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({text: '', industry: ''});
  const {data: session} = useSession();
  const router = useRouter();

    const {id} = useParams();

    useEffect(()=>{
        const getAndSetPost = async()=>{
            const response = await fetch(`/api/post/${id}`)
            if(response.ok){
                const data = await response.json();
                setPost(data);
            }
        }
        if(id) getAndSetPost();
    },[id])

  const handleEdit = async(e)=>{
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/post/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({
          text: post.text,
          industry: post.industry
        })
      });
      if(response.ok) router.push('/');

    } catch (error) {
      console.log(error);
    }
    finally{
      setSubmitting(false);
    }
  }

  return (
    <section>
      <Form type={"Edit"} post={post} setPost={setPost} submitting={submitting} handleSubmit={handleEdit}/>
    </section>
  )
}

export default EditPost
'use client'

import Form from '@components/Form';
import { useState } from 'react';
import { useRouter } from '@node_modules/next/navigation';
import { useSession } from 'next-auth/react';

const ShareIdea = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({text: '', industry: ''});
  const {data: session} = useSession();
  const router = useRouter();

  const handleCreate = async(e)=>{
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/post/new',{
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
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
      <Form type={"Create"} post={post} setPost={setPost} submitting={submitting} handleSubmit={handleCreate}/>
    </section>
  )
}

export default ShareIdea
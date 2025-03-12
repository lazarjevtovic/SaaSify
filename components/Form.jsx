'use client'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <div className="mx-4">
        <h1 className='text-main-2'>{`${type} Post`}</h1>
        <p className='subtitle'>{`${type} and share creative ideas`}</p>
        <form onSubmit={handleSubmit} className='flex flex-col max-w-[400px] sm:max-w-[650px] mx-auto' action="">
            <label className='font-semibold text-xl mb-2'>Your SaaS Idea</label>
            <textarea value={post.text} onChange={(e)=>{setPost({...post, text:e.target.value})}}
            required className='input h-64 mb-6' type="text" placeholder='Enter your idea here...' />
            <label className='font-semibold text-xl mb-2'>Industry</label>
            <input value={post.industry} onChange={(e)=>{setPost({...post, industry: e.target.value})}} required className='input' type="text" placeholder='e.g. FinTech, HealtTech, etc.' />
            <button type='submit' className='button-full w-28 mx-auto mt-8' disabled={submitting}>{submitting? `${type}...`:type}</button>
        </form>
    </div>
  )
}

export default Form
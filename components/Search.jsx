import React from 'react'

const Search = ({searched, setSearched}) => {
  return (
    <input type="text"
    className='bg-main-1 text-white placeholder:text-white/0.6 text-[15px] sm:text-xl py-2 px-4
    rounded-[10px] w-[400px] sm:w-[600px] mb-16 focus:outline-0'
    placeholder='Search for an industry, username or text'
    value={searched}
    onChange={(e)=>{setSearched(e.target.value)}}/>
  )
}

export default Search
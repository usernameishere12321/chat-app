import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';


const Searchinput = () => {
  const [search,setSearch] = useState("")
  const { searchConversations,setSearchConversations } = useConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    const filteredConversations = searchConversations.filter((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    setSearchConversations(filteredConversations);
    setSearch("");
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text"placeholder='Search...' className='input input-bordered rounded-full'
        value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'><IoSearchSharp className='w-6 h-6 outline-none'/></button>
    </form>
  )
}

export default Searchinput;
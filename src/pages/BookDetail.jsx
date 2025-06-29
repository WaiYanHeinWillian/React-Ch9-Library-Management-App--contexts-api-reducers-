import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import bookImg from "../assets/logo.jpg"
import useTheme from '../hooks/useTheme';
import useFirestore from '../hooks/useFirestore';

export default function BookDetail() {

    let {id}=useParams();

    // let {data : book , loading , error}=useFetch(`http://localhost:3000/books/${id}`)

    let {getDocument} = useFirestore();
    let {error,data:book,loading} = getDocument("books",id);

    let {isDark}=useTheme();

    

  return (
    <>
        {error && <p>{error}</p>}
        {loading && <p>Loading ...</p>}

        {book && (
            <>
                <div className={`grid grid-cols-2 ${isDark ? 'text-white' : ''}`}>
                <div>
                    <img src={bookImg} className='w-[80%]'></img>
                </div>
                <div className='space-y-4'>
                    <h1 className='text-3xl font-bold'>{book.title}</h1>
                    <div className='space-x-3'>
                        {book.categories.map(category=>(
                            <span className='bg-blue-500 text-white rounded-full text-sm px-2 py-1' key={category}>{category}</span>
                        ))}
                    </div>
                    <p>
                        {book.description}
                    </p>
                </div>
            </div>
            <div>
                <h3 className='font-bold text-xl text-indigo-600 my-3 text-center'>My Notes</h3>
                <textarea className='p-3 shadow-md border-2 bg-gray-50 w-full' cols="30" rows="5"></textarea>
                <button className='text-white bg-indigo-600 px-3 py-2 rounded-lg my-3 flex items-center gap-1'>
                                            
                      <span className='hidden md:block'>Add Note</span>
                </button>


                <div className='border-2 shadow-md p-3 my-3'>
                    <div className='flex space-x-3'>
                        <img src='https://w0.peakpx.com/wallpaper/461/37/HD-wallpaper-gaara-naruto-black-red-hair-anime-boy-angry-boy-anime-dark-scary-scarf-thumbnail.jpg' className='w-12 h-12 rounded-full'/>
                        <div>
                            <h3>Wai Yan Hein</h3>
                            <div className='text-gray-500'>20.6.2003</div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla rerum unde eos quasi? Dolores suscipit corporis error saepe minima optio beatae tenetur iure tempora libero, hic nesciunt nihil commodi neque.
                    </div>
                </div>
            </div>
            </>
        )}
    </>
  )
}

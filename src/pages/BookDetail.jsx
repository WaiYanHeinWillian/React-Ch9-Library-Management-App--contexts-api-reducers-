import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import bookImg from "../assets/logo.jpg"
import useTheme from '../hooks/useTheme';
import useFirestore from '../hooks/useFirestore';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

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
                    <img src={book.cover} className='w-[80%]'></img>
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
                    <NoteForm/>
                    <NoteList/>
                
            </div>
            </>
        )}
    </>
  )
}

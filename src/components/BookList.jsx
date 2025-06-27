import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.jpg"
import useFetch from "../hooks/useFetch"
import { Link, useLocation } from 'react-router-dom'
import useTheme from '../hooks/useTheme';
import trash from '../assets/trash.svg'
import pencil from '../assets/pencil.svg'
import useFirestore from '../hooks/useFirestore';

export default function BookList() {

    let location=useLocation();
    let params=new URLSearchParams(location.search);  
    let search=params.get('search');

    // let {data:books ,loading ,error}=useFetch(`http://localhost:3000/books${search ? `?q=${search}` : ''}`)

    let {getCollection,deleteDocument}=useFirestore();
     let {error,data:books,loading} = getCollection("books");

    let deleteBook=async(e,id)=>{
      e.preventDefault();

      //delete firestore doc
      await deleteDocument("books",id)

      //delete frontend data
      // setBooks(prev=>prev.filter(b=>b.id!==id));
    }

    

    if(error){
        return <p>{error}</p>
    }

    let {isDark}=useTheme();

  return (
    <div>

        {loading && <p>Loading ...</p>}

        {/* book list */}
        {!!books && (     //books == true
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
            {books.map((b)=>(
            <Link to={`/books/${b.id}`} key={b.id}>
                  <div className={`p-4 border border-1 min-h-[420px] ${isDark ? 'text-white bg-gray-900  border-indigo-600 ' : ''}`} >
                  <img src={logo}></img>
                    <div className="text-center space-y-2 mt-3">
                  <h1>{b.title}</h1>
                  <p>{b.description}</p>

                  {/* genres */}
                  <div className="flex flex-wrap justify-between items-center">
                    <div>
                      {b.categories.map(c=>(
                      <span key={c} className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500">{c}</span>
                      ))}
                    </div>
                    <div className='flex space-x-5 items-center'>
                      <Link to={`/edit/${b.id}`}>
                        <img src={pencil}></img>
                      </Link>
                      <img src={trash} onClick={(e)=>{deleteBook(e,b.id)}}></img>
                    </div>
                  </div>
                    </div>
                </div>
            </Link>
            ))}
            </div>
        )}
        {books && !books.length && <p className='text-center text-xl text-gray-500'>No Search Results Found!</p>}
    </div>
  )
}

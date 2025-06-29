import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';


export default function NoteForm() {

    let {id}=useParams();
    let [body,setBody]=useState('')

    let {addCollection} = useFirestore();

    let addNote=async(e)=>{
        e.preventDefault();
        
        let data={
            body,
            bookUid:id
        }
       await addCollection("notes",data)
       setBody("");
        
    }

  return (
                <form onSubmit={addNote}>
                    <textarea value={body} onChange={e=>setBody(e.target.value)} className='p-3 shadow-md border-2 bg-gray-50 w-full' cols="30" rows="5"></textarea>
                    <button className='text-white bg-indigo-600 px-3 py-2 rounded-lg my-3 flex items-center gap-1'>
                      <span>Add Note</span>
                    </button>
                </form>
  )
}



import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';


export default function NoteForm({type="create",setEditnote,editNote}) {

    let {id}=useParams();
    let [body,setBody]=useState('')

    useEffect(()=>{
      if(type=="update"){
        setBody(editNote.body)
      }
    },[type])

    let {addCollection,updateDocument} = useFirestore();

    let submit=async(e)=>{
        e.preventDefault();
        
        if(type=="create"){
          let data={
            body,
            bookUid:id
          }
          await addCollection("notes",data)
        }else{
          editNote.body=body;
          await updateDocument("notes",editNote.id,editNote,false);
          setEditnote(null);
        }
        
       setBody("");
        
    }

  return (
                <form onSubmit={submit}>
                    <textarea value={body} onChange={e=>setBody(e.target.value)} className='p-3 shadow-md border-2 bg-gray-50 w-full' cols="30" rows="5"></textarea>
                    
                    <div className='flex space-x-3'>
                      <button className='text-white bg-indigo-600 px-3 py-2 rounded-lg my-3 flex items-center gap-1'>
                      <span>{type=="create" ? "Add" : "Update"} Note</span>
                      </button>
                      {type=="update" && <button onClick={()=>setEditnote(null)} className='text-indigo-600 border-2 border-indigo-600 px-3 py-2 rounded-lg my-3 flex items-center gap-1'>
                        Cancel
                      </button>}
                    </div>

                </form>
  )
}



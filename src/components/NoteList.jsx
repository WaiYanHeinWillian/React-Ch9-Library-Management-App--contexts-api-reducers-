import React, { useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import trashIcon from "../assets/trash.svg";
import pencilIcon from "../assets/pencil.svg";
import NoteForm from "../components/NoteForm"

export default function NoteList() {

    let {id} = useParams();
    let {getCollection,deleteDocument} = useFirestore();
    let {error,data:notes,loading} = getCollection("notes",["bookUid","==",id]);

    let [editNote,setEditnote] = useState(null);

    let deleteNote = async(id)=>{
        await deleteDocument("notes",id)
    }

  return (
    !!notes.length && (
        notes.map(note=>(
            <div key={note.id} className='border-2 shadow-md p-3 my-3'>
                    <div className='flex space-x-3 justify-between'>
                        <div>
                            <img src='https://w0.peakpx.com/wallpaper/461/37/HD-wallpaper-gaara-naruto-black-red-hair-anime-boy-angry-boy-anime-dark-scary-scarf-thumbnail.jpg' className='w-12 h-12 rounded-full'/>
                            <div>
                                <h3>Wai Yan Hein</h3>
                                <div className='text-gray-500'>{moment(note?.date?.seconds*1000).fromNow()}</div>
                            </div>
                        </div>
                        <div>
                            <img onClick={()=>setEditnote(note)} className='cursor-pointer' src={pencilIcon}/>
                            <img onClick={()=>deleteNote(note.id)} className='cursor-pointer' src={trashIcon}/>
                        </div>
                    </div>
                    <div className='mt-3'>
                        {editNote?.id!=note.id && note.body}
                        {editNote?.id==note.id && <NoteForm type="update" setEditnote={setEditnote} editNote={editNote}/>}
                    </div>
            </div>
        ))
        
    )
        

  )
}

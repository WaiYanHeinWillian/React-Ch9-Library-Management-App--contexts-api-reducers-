import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';

export default function useFirestore() {

  let getCollection = (colName,_q)=>{

        let qRef=useRef(_q).current
        
        let [error,setError]=useState('');
        let [data,setData]=useState([]);
        let [loading,setLoading]=useState(false);

        useEffect(function(){
        setLoading(true);
        let ref=collection(db,colName);
        let queries=[];
        if(qRef){
            queries.push(where(...qRef))
        }
        queries.push(orderBy('date','desc'));
        let q =query(ref,...queries)
        onSnapshot(q,docs=>{
            if(docs.empty){
            setError("No Documents Found!");
            setLoading(false);
            setData([]);
            }else{
            let collectionDatas=[];
            docs.forEach(doc=>{
                let document={id : doc.id , ...doc.data()};
                collectionDatas.push(document);
            })
            setData(collectionDatas)
            setLoading(false)
            setError('');
            }
        })
        },[qRef])

        return {error,data,loading}
  }

  let getDocument = (colName,id)=>{

    let [error,setError]=useState('');
    let [data,setData]=useState(null);
    let [loading,setLoading]=useState(false);

    useEffect(()=>{
            setLoading(true)
            let ref=doc(db,colName,id);
            // getDoc(ref).then();
            onSnapshot(ref,doc=>{
                if(doc.exists()){
                    let document={id:doc.id,...doc.data()}
                    setData(document)
                    setLoading(false)
                    setError('')
                }else{
                    setError("no Document found")
                    setLoading(false)
                }
            })
        },[id])

        return {error,data,loading};
  }

  let addCollection = async(colName,data)=>{
        data.date = serverTimestamp();
        let ref=collection(db,colName);
        return addDoc(ref,data);
  }

  let deleteDocument = async(colName,id)=>{
        let ref=doc(db,colName,id);
        return deleteDoc(ref);
  }

  let updateDocument = async(colName,id,data,updateDate=true)=>{
        
        if(updateDate){
            data.date = serverTimestamp();
        }
        
        let ref=doc(db,colName,id);
        return updateDoc(ref,data);
  }

  return{getCollection,addCollection,deleteDocument,updateDocument,getDocument}

}

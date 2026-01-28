import { createContext } from "react";

export const ContactContext = createContext({
    loading : false , 
    setLoading : ()=>{} ,
    setContact : ()=>{} ,
    contacts : [] ,
    setFilteredContacts : () =>{} ,
    filteredContact : [] ,
    groups : [] ,
    deletContact : ()=>{} ,
    updateContact : ()=>{} ,
    creatContact : ()=>{} ,
    contactSearch : ()=>{} , 
});
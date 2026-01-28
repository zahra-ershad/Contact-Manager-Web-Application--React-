// import Navbar from './Components/Navbar';
// import Contacts from './Components/Contacts/Contacts';

import {Route , Routes , useNavigate , Navigate} from 'react-router';
import {useEffect,useState} from 'react';
import {useImmer} from 'use-immer';
import _ from 'lodash';



import{
  AddContact,
  Contacts,
  Contact,
  EditContact,
  ViewContact,
  Navbar
} from './Components';
import { ContactContext } from './context/contactContext';
import { contactSchema } from './Validations/contactValidation';


import './App.css';
import {getAllContacts,GetAllGroups ,createContact ,deletContact } from '../src/services/contactService';
import { confirmAlert } from 'react-confirm-alert';





const App =() => {

  const[loading,setLoading] = useImmer(false);
  const [query , setQuery] = useImmer([]);
  const [contact , setContact] = useState({
    fullName: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "" 
  });
  const [contacts , setContacts] = useImmer([]);
  const [filteredContact , setFilteredContact] = useImmer([]);
  const [groups,setGroups] = useImmer([]);
  //const [errors , setError] = useState([]);

  const navigate= useNavigate();

  useEffect(()=>{

    console.log('useEffect 😎');


    const fetchData = async ()=>{
      try{
        setLoading(true);

        const {data:contactsData} = await getAllContacts();
        const {data : groupsData} = await GetAllGroups();

        setContacts(contactsData);
        setFilteredContact(contactsData);
        setGroups(groupsData);

        setLoading(false);
      
      }
      catch(e){
        alert("Error!");
        console.log(e.message);
        setLoading(false);
      }

    }

    fetchData();
  },[]);



  


  const confirmDelet = ({contactId, contactFullName}) => {
    confirmAlert({
      customUI:({onClose})=>{
        return (
          <div className="confirm-alert-overlay">
            <div className="confirm-alert-container">
              <h4 className="confirm-alert-title">
                حذف مخاطب
              </h4>
              <h6 className="confirm-alert-message">
                آیا از حذف 
                <span> {contactFullName} </span>
                اطمینان دارید؟
              </h6>
              <div className="confirm-alert-actions">
                <button
                  className="confirm-alert-btn confirm-alert-delete-btn"
                  onClick={()=>{
                    removeContact(contactId);
                    onClose();
                  }}
                >
                  بله 
                </button>
                <button 
                  className="confirm-alert-btn confirm-alert-cancel-btn"
                  onClick={onClose}
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        )
      }
    });
}


  const removeContact = async(contactId) =>{
    const contactBackUp = [...contacts];
    try{
      // const updatedContact = contacts.filter(c =>c.id !== contactId);
      

      // setContacts(updatedContact);
      // setFilteredContact(updatedContact);

      setContacts((draft)=> draft.filter((c)=> c.id !== contactId));
      setFilteredContact((draft) => draft.filter((c)=> c.id !== contactId));

      // Sending delete request to server
      const { status } = await deletContact(contactId);

      if (status !== 200) {
        setContacts(contactBackUp);
        setFilteredContact(contactBackUp);
      }
    }
    catch(e){
      console.log(e.message);

      setContacts(contactBackUp);
      setFilteredContact(contactBackUp);
    }
  }
  




  const createContactForm= async (value) =>{
    try{
    const {status , data} = await createContact(value);


      setLoading(draft => !draft);
      if (status === 201){
       

        setFilteredContact((draft) =>  {draft.push(data)});
        setContacts((draft)=>   {draft.push(data)});

        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
        // setError([]);
        console.log(status.message);
        
      }
  }
  catch(e){
    console.log(e.inner);
   // setError(e.inner);
  }
}


  const onChangeContact = (event) =>{
    setContact({
    ...contact ,
    [event.target.name]: event.target.value});
  };





  // این روشی که متد سرچ⬇️ رو انجام دادیم مختص زمانیکه دیتابیس خیلی بزرگه
  //  و احتمال هنگ بعلت سرچ میتونه پیش بیاد 
  // با دیبانس کردن و تاخیر دادن به فانکشن ما صبر میکنیم دیتا خاص باشه
  //  و فقط یدونه باشه تا با داده تکراری هنگ پیش نیاد
  //  که اینجا با تایم اوت انجام دادیم میتونیم ا خودش مستقیما یا یوزافکت کمک بگیریم


  //let timeOut;
  const searchContacts = _.debounce(query =>{

      //clearTimeout(timeOut);

      if(!query) return setFilteredContact([...contacts]);
      

      console.log(query);


      //timeOut=setTimeout(() =>{

      //   setFilteredContact( contacts.filter((contact)=>{
      //     return contact.fullName
      //     .toLowerCase()
      //     .includes(query.toLowerCase());
      // }));

      setFilteredContact((draft) => draft.filter((c) =>
       {return  c.fullName.toLowerCase().includes(query.toLowerCase())

        })
      );

     // },1000);

    

  },1000);

  return (
    <ContactContext.Provider
        value={{
          loading,
          setLoading ,
          contact ,
          filteredContact ,
          setContact ,
          contacts ,
          groups ,
          // errors ,
          setContacts: setContacts,
          onChangeContact ,
          deletContact: confirmDelet,
          creatContact : createContactForm ,
          contactSearch: searchContacts ,
          setFilteredContacts: setFilteredContact
        }}>
          <div className="App">
        <Navbar />
          <Routes>
            <Route path='/' element={<Navigate to='/contacts'/>} />
            <Route path='/contacts'  element={ <Contacts/>} />
            <Route path='/contacts/add/' element={<AddContact />} />
            <Route path='/contacts/edit/:contactId'  element={<EditContact/>} />
            <Route path='/contacts/:contactId' element={<ViewContact />} />
          </Routes>
      </div>
    </ContactContext.Provider>
   
  );
};

export default App;
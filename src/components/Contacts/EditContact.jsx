import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect} from "react";
import {useImmer} from 'use-immer';
import { useContext } from "react";
import {Formik , Field , Form, ErrorMessage} from 'formik';


import { getContact, updateContact  } from '../../services/contactService';
import { ContactContext } from "../../context/contactContext";
import Spinner from '../Spinner';
import '../../App.css';
import {contactSchema} from '../../Validations/contactValidation';


const EditContact = () => {
    const {loading , setLoading ,groups , contacts , setContacts , setFilteredContacts} = useContext(ContactContext);
    const navigate = useNavigate();
    const { contactId } = useParams();


    const[contact,setContact] = useImmer({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data: contactData } = await getContact(contactId);
              
                setLoading(false);
                setContact(contactData);
            } catch (e) {
                console.log(e.message);
                setLoading(false);
            }
        }
        fetchData();
    }, [contactId]);

   
    const submitForm = async (values) => {
        try {
            setLoading(true);
           
            const { data , status } = await updateContact(values, contactId);  // ✅ از state.contact استفاده کن

            setLoading(false);
            setContact(values);
            if (status === 200) {
                setLoading(false);
        
                // const allContacts = [...contacts];
                // const contactIndex = allContacts.findIndex(
                //   (c) => c.id === parseInt(contactId)
                // );
                // allContacts[contactIndex] = { ...data };
        
                // setContacts(allContacts);
                setContacts((draft) =>{
                    const contactIndex= draft.findIndex(
                        (c) => c.id == parseInt(contactId)
                    )
                    draft[contactIndex] = {...data }
                });

                setFilteredContacts((draft) =>{
                    const contactIndex = draft.findIndex(
                        (c) => c.id == contactId
                    )
                    draft[contactIndex] = {...data}
                })
                // setFilteredContacts(allContacts);
        
                navigate("/contacts");
              }
        } catch (e) {
            console.log(e.message);
            setLoading(false);
           
        }
    };


    return (
        <>
            <section style={{ backgroundColor: '#282A36', padding: '0.5rem 0' }}>
                <div className="container">
                    <p style={{ 
                        color: '#F8F8F2', 
                        fontSize: '1.2rem', 
                        margin: 0,
                        fontWeight: '600',
                        textAlign: 'center'
                    }}>
                        ویرایش اطلاعات مخاطب
                    </p>
                </div>
            </section>

            <hr style={{ borderColor: '#6272A4', margin: 0 }} />
            
            {loading ? (
                <Spinner />
            ) : (
                <div className="edit-contact-page">
                    <div className="edit-contact-container">
                        <div className="edit-contact-content">
                            <div className="edit-contact-image-col">
                                <div className="edit-contact-image-container">
                                    <img 
                                        src={contact.photo || '/default-avatar.png'} 
                                        alt={contact.fullName} 
                                        className="edit-contact-image"
                                    />
                                </div>
                            </div>
                            
                            <div className="edit-contact-form-col">
                                <Formik

                                initialValues={contact}
                                validationSchema ={contactSchema}

                                onSubmit ={ (values) =>{
                                submitForm(values)
                                }}
                                >

                                <Form className="contact-form">
                                    <div className="form-group">
                                    <Field 
                                        type="text" 
                                        name="fullName"
                                        placeholder="نام و نام خانوداگی" 
                                        className="form-input"
                                        
                                    />
                                    </div>

                                <ErrorMessage name="fullName"
                                    render={(msg) =>
                                    (<p className="errMsg" >{msg}</p>)
                                    } />
                                    
                                    <div className="form-group">
                                    <Field 
                                        type="text" 
                                        name="photo"
                                        className="form-input"
                                        placeholder="آدرس عکس"
                                        
                                    />
                                    </div>
                                <ErrorMessage name="photo" render={(msg) =>(
                                    <p className="errMsg"> {msg} </p>
                                )} />
                                    
                                    <div className="form-group">
                                    <Field 
                                        type="number" 
                                        name="mobile"
                                        placeholder="شماره موبایل" 
                                        className="form-input"
                                    />
                                    </div>

                                <ErrorMessage name='mobile'
                                    render={(msg) =>(
                                    <p className="errMsg"> {msg} </p>
                                )} />
                                    
                                    <div className="form-group">
                                    <Field 
                                        type="email" 
                                        name="email" 
                                        placeholder="آدرس ایمیل" 
                                        className="form-input"
                                    />
                                    </div>
                                <ErrorMessage name="email" render={(msg) =>(
                                    <p className="errMsg"> {msg} </p>
                                )} />
                                    
                                    <div className="form-group">
                                    <Field 
                                        type="text" 
                                        name="job" 
                                        placeholder="شغل" 
                                        className="form-input"
                                        
                                    />
                                    </div>
                                <ErrorMessage name="job" render={(msg) =>(
                                    <p className="errMsg"> {msg} </p>
                                )} />

                                    <div className="form-group">
                                    <Field 
                                    as="select"
                                    name="group"
                                    className="form-select">
                                        {
                                            groups.length > 0 && groups.map(group =>(
                                                <option value={group.id} key={group.id}>
                                                    {group.name }
                                                </option>
                                            ))
                                        }
                                    </Field>
                                    </div>
                                    <ErrorMessage name="group" render={(msg) =>(
                                    <p className="errMsg"> {msg} </p>
                                )} />
                                
                                    <div className="form-actions">
                                    <input 
                                        type="submit" 
                                        value="ویرایش مخاطب" 
                                        className="submit-btn"
                                    />
                                    <Link to={'/contacts'} className="back-btn">
                                        بازگشت به لیست
                                    </Link>
                                    </div>
                                </Form>
                                
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditContact;
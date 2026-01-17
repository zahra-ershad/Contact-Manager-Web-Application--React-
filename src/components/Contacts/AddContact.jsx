import { Link } from "react-router-dom";
import { useContext } from "react";
import {Formik , Field , Form, ErrorMessage} from 'formik';
import Spinner from '../Spinner';
import Register from '../../assets/register.gif';
import {} from '../../helpers/colors';
import { ContactContext } from "../../context/contactContext";
import {contactSchema} from '../../Validations/contactValidation';

import '../../App.css';

import { values } from "lodash";


const AddContact = () => {
      const {loading ,
            groups ,
            creatContact,
            errors
          } = useContext(ContactContext);


         

           

         


    return (
      <>
        {loading ? (
          
              <Spinner />
           
        ) : (
          <div className="add-contact-container">
            <div className="form-content">
              
              <div className="spinner-side">
                <img src={Register} className="regGif" alt="Register form" />
              </div>
              
             
              <div className="form-side">
                <div className="container">
                  <div className="form-header">
                    <p className="h4 fw-bold text-center">
                      ایجاد مخاطب جدید
                    </p>
                  </div>
                  
                  <hr className="divider" />
                  
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                     <Formik

                      initialValues={{
                        fullName:'' ,
                        photo:'' ,
                        mobile:'' ,
                        email: '',
                        job:'' ,
                        group:'' ,
                      } }
                      validationSchema ={contactSchema}
          
                      onSubmit ={ (values) =>{
                        creatContact(values)
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
                              value="ایجاد مخاطب" 
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
                  <br />
                  
              <br />
                </div>
              </div>
             
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default AddContact;
import { Link } from "react-router-dom";
import { useContext } from "react";
import {Formik} from 'formik';
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
                        creatContact={values}
                      }}
                     >
                      {
                        (formik)=> (
                          <form className="contact-form" onSubmit={formik.handleSubmit}>
                          <div className="form-group">
                            <input 
                              type="text" 
                              id="fullName"
                              {...formik.getFieldProps("fullname")}
                              placeholder="نام و نام خانوداگی" 
                              className="form-input"
                               
                            />
                          </div>
                          {
                            (formik.touched.fullName&& formik.errors.fullName ) ?
  
                                    <p className="errMsg">{formik.errors.fullName}</p> 
                                    : null
                          }
                          
                          <div className="form-group">
                            <input 
                              type="text" 
                              id="photo"
                              {...formik.getFieldProps('photo')} 
                              className="form-input"
                              placeholder="آدرس عکس"
                               
                            />
                          </div>
                          {
                            (formik.errors.photo && formik.touched.photo) ?
                            
                                    <p className="errMsg">{formik.errors.photo}</p> 
                                    : null
                          }
                          
                          <div className="form-group">
                            <input 
                              type="number" 
                              id="mobile"
                              {...formik.getFieldProps('mobile')}
                              placeholder="شماره موبایل" 
                              className="form-input"
                               
                            />
                          </div>
                          {
                            (formik.errors.mobile && formik.touched.mobile) ?
                            
                                    <p className="errMsg">{formik.errors.mobile}</p> 
                                    : null
                          }
                          
                          <div className="form-group">
                            <input 
                              type="email" 
                              id="email" 
                             {...formik.getFieldProps('email')}
                              placeholder="آدرس ایمیل" 
                              className="form-input"
                               
                            />
                          </div>
                          {
                            (formik.errors.email && formik.touched.email) ?
                            
                                    <p className="errMsg">{formik.errors.email}</p> 
                                    : null
                          }
                          
                          <div className="form-group">
                            <input 
                              type="text" 
                              id="job" 
                              {...formik.getFieldProps('job')}
                              placeholder="شغل" 
                              className="form-input"
                               
                            />
                          </div>
                          {
                            (formik.errors.job && formik.touched.job) ?
                            
                                    <p className="errMsg">{formik.errors.job}</p> 
                                    : null
                          }
                          
                          <div className="form-group">
                            <select 
                            id="group"
                            {...formik.getFieldProps('group')}
                            className="form-select">
                              {
                                  groups.length > 0 && groups.map(group =>(
                                      <option value={group.id} key={group.id}>
                                          {group.name }
                                      </option>
                                  ))
                              }
                            </select>
                          </div>
                          {
                            (formik.errors.group && formik.touched.group) ?
                            
                                    <p className="errMsg">{formik.errors.group}</p> 
                                    : null
                          }
                          
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
                        </form>
                        )
                      }

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
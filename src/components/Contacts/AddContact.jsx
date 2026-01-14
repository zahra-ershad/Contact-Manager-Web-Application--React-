import { Link } from "react-router-dom";
import { useContext } from "react";
import {useFormik} from 'formik';
import Spinner from '../Spinner';
import Register from '../../assets/register.gif';
import {} from '../../helpers/colors';
import { ContactContext } from "../../context/contactContext";
import {contactSchema} from '../../Validations/contactValidation';

import '../../App.css';

import { values } from "lodash";


const AddContact = () => {
      const {loading ,
            contact ,
            onChangeContact ,
            groups ,
            creatContact,
            // errors
          } = useContext(ContactContext);


          const formik = useFormik({

            initialValues:{
              fullName:'' ,
              photo:'' ,
              mobile:'' ,
              email: '',
              job:'' ,
              group:'' ,
            } ,
            validationSchema : contactSchema ,

            onSubmit : (values) =>{
              console.log(values);
              creatContact(values);
            }

          });


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
                      <form className="contact-form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <input 
                            type="text" 
                            id="fullName"
                            name="fullName" 
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            placeholder="نام و نام خانوداگی" 
                            className="form-input"
                             
                          />
                        </div>
                        {
                          (formik.errors.fullName && formik.touched.fullName) ?

                                  <p className="errMsg">{formik.errors.fullName}</p> 
                                  : null
                        }
                        
                        <div className="form-group">
                          <input 
                            type="text" 
                            name="photo"
                            id="photo"
                            value={formik.values.photo}
                            onChange={formik.handleChange} 
                            placeholder="آدرس عکس" 
                            className="form-input"
                             
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
                            name="mobile"
                            id="mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange} 
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
                            name="email" 
                            id="email" 
                            value={formik.values.email}
                            onChange={formik.handleChange}
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
                            name="job"
                            id="job" 
                            value={formik.values.job}
                            onChange={formik.handleChange}
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
                          name="group"
                          id="group"
                          value={formik.values.group}
                          onChange={formik.handleChange}
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
                    </div>
                  </div>
                  <br />
                  {
                // !errors ? null :
                // errors.map((error, index)=>(
                //     <p className="errMsg" key={index}>
                //       {error.message}
                //     </p>
                // ))
              }
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
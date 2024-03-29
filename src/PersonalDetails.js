import React from 'react';
import { useState } from "react";
import axios from 'axios';

import "./PersonalDetails.css";


function PersonalDetails(){
    const [prefix, setPrefix] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [middle_name, setMiddle_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [preferred_name, setPreferred_name] = useState('');
    const [address1, setAddress1] = useState('');
    const [city1, setCity1] = useState('');
    const [state1, setState1] = useState('');
    const [country1, setCountry1] = useState('');
    const [postal_code1, setPostalCode1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city2, setCity2] = useState('');
    const [state2, setState2] = useState('');
    const [country2, setCountry2] = useState('');
    const [postal_code2, setPostalCode2] = useState('');
    const [email, setEmail] = useState('');
    const [alternate_email, setAlternateEmail] = useState('');
    const [skype_id, setSkypeId] = useState('');
    const [home_phone, setHomePhone] = useState('');
    const [mobile_phone, setMobilePhone] = useState('');
    const [alternative_phone, setAlternativePhone] = useState('');
    const [gender, setGender] = useState('');
    const [native_language, setNativeLanguage] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [birth_country, setBirthCountry] = useState('');
    const [birth_city, setBirthCity] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const [, setPersonals] = useState('');
    

  

  
    const submitThis = async (event) => {
      event.preventDefault();
      const info = {first_name: first_name,  last_name: last_name, prefix: prefix, preferred_name: preferred_name, middle_name: middle_name,email: email,
      address1:address1,alternate_email: alternate_email,skype_id: skype_id,alternative_phone: alternative_phone,
      gender: gender,native_language: native_language,birth_country: birth_country,home_phone:home_phone,
      city1:city1,state1:state1,country1:country1,postal_code1:postal_code1,address2:address2,city2:city2,
      state2:state2,country2:country2,postal_code2:postal_code2,mobile_phone:mobile_phone,birth_date:birth_date,birth_city:birth_city,citizenship:citizenship};
      console.log(info);  
      try {
        const response = await axios.post('/personal_details', info);
        setPersonals(response.data.personals);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
      }
    
       
    
   
    return( 
        <>
       

    <h3>Personal Details</h3>

    <div style={{overflowY:'scroll',height:'700px'}} id='inputDiv'>
            <h4 className='sectionTitle'>Name Information</h4>
              <div className="account-details">
                <div><label>Prefix</label>
                <select name="Prefix" id="Prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)}>
                  <option value=""> -- None -- </option>
                  <option value="Mr">Mr.</option>
                  <option value="Ms">Ms.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Dr">Dr.</option>
                </select>
                </div>
                <div></div>
                <div><label >First Name </label><input type="text" value={first_name} name="FirstName" onChange={(e) => setFirst_name(e.target.value)}></input></div>
                <div><label>Middle Name </label><input type="text" value={middle_name} name="MiddleName" onChange={(e) => setMiddle_name(e.target.value)}></input></div>
                <div><label className='required-field'>Last Name </label><input type="text" value={last_name} name="LastName" required onChange={(e) => setLast_name(e.target.value)}></input></div>
                <div><label>Preferred Name </label><input type="text" value={preferred_name} name="PrefferedName" onChange={(e) => setPreferred_name(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Permanent Address</h4>
              <div className="account-details">
                <div><label>Address </label><textarea  value={address1} name="perAddress" rows="4" cols="50" onChange={(e) => setAddress1(e.target.value)}></textarea ></div>
                <div><label>City </label><input value={city1} type="text" name="perCity" onChange={(e) => setCity1(e.target.value)}></input></div>
                <div><label>State </label><input value={state1} type="text" name="perState" onChange={(e) => setState1(e.target.value)}></input></div>
                <div><label>Country </label><input value={country1} type="text" name="perCountry" onChange={(e) => setCountry1(e.target.value)}></input></div>
                <div><label>Postal Code </label><input value={postal_code1} type="text" name="PerPostalCode" onChange={(e) => setPostalCode1(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Mailing Address</h4>
              <div className="account-details">
                <div><label>Same as permanent address </label><input type="checkbox" name="name" ></input></div>
                <div></div>
                <div><label>Address </label><textarea  value={address2} name="perAddress" rows="4" cols="50" onChange={(e) => setAddress2(e.target.value)}></textarea ></div>
                <div><label>City </label><input value={city2} type="text" name="perCity" onChange={(e) => setCity2(e.target.value)}></input></div>
                <div><label>State </label><input value={state2} type="text" name="perState" onChange={(e) => setState2(e.target.value)}></input></div>
                <div><label>Country </label><input value={country2} type="text" name="perCountry" onChange={(e) => setCountry2(e.target.value)}></input></div>
                <div><label>Postal Code </label><input value={postal_code2} type="text" name="PerPostalCode" onChange={(e) => setPostalCode2(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Email Address</h4>
              <div className="account-details">
                <div><label className='required-field'>Email </label><input value={email} type="text" name="Email" onChange={(e) => setEmail(e.target.value)}></input></div>
                <div><label>Alternative Email </label><input value={alternate_email} type="text" name="altEmail" onChange={(e) => setAlternateEmail(e.target.value)}></input></div>
              </div>
          
            <h4 className='sectionTitle'>Skype ID</h4>
              <div className="account-details">
                <div><label>Skype Id </label><input value={skype_id} type="text" name="skypeId" onChange={(e) => setSkypeId(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Telephone Numbers</h4>
              <div className="account-details">
                <div><label>Home Phone </label><input value={home_phone} type="text" name="homePhone" onChange={(e) => setHomePhone(e.target.value)}></input></div>
                <div><label>Mobile Phone </label><input  value={mobile_phone} type="text" name="mobilePhone" onChange={(e) => setMobilePhone(e.target.value)}></input></div>
                <div><label>Alternative Phone </label><input value={alternative_phone} type="text" name="altPhone" onChange={(e) => setAlternativePhone(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Biographical Information</h4>
              <div className="account-details">
                <div><label>Gender </label><select value={gender} name="gender" id="gender" onChange={(e) => setGender(e.target.value)}>
                <option value=""> -- None -- </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select></div>
                <div><label>Native Language </label><input value={native_language} type="text" name="nativeLang" onChange={(e) => setNativeLanguage(e.target.value)}></input></div>
                <div><label>Birth Date </label><input value={birth_date} type="date" name="birthDate" onChange={(e) => setBirthDate(e.target.value)}></input></div>
                <div><label>Birth Country </label><input value={birth_country} type="text" name="birthCountry" onChange={(e) => setBirthCountry(e.target.value)}></input></div>
                <div><label>Birth City </label><input value={birth_city} type="text" name="birthCity" onChange={(e) => setBirthCity(e.target.value)}></input></div>
                <div><label>Citizenship </label><input value={citizenship} type="text" name="citizenship" onChange={(e) => setCitizenship(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Select Languages You Know</h4>
            </div>
            <div className='contentdiv'>
              <button className='buttonStyle' onClick={submitThis}><i className='fas fa-pen' ></i>Update</button>
              <button type='submit' className='buttonStyle' style={{marginLeft:'10px'}}>Continue</button>
          </div>
          
            </>
    )
}


export default PersonalDetails;
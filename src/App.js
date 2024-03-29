import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import HomePage from './HomePage';

function Login({ setLoginPage, setCurrentPage,cmpLogo }) {

    const pythonDomain = 'http://localhost:5000/';

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassWord] = useState('');
  
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
  
    const onLoginClick = () => {
      console.log('UserName: ', userName, ' PassWord: ', password);
      if (userName === '' || password === '') {
        userName === '' ? setUserNameError(true) : setUserNameError(false);
        password === '' ? setPasswordError(true) : setPasswordError(false);
      } else {
        setUserNameError(false);
        setPasswordError(false);
        axios.post(`${pythonDomain}login`, { userName, password })
          .then(response => {
            console.log('Login Success Response:: ', response.data)
            if (response.data === 'invalid Username') {
              setUserNameError(true);
            } else if (response.data === 'invalid Password') {
              setPasswordError(true);
            } else {
              localStorage.setItem('email', userName);
              navigate('/homePage');
            }
          })
          .catch(error => {
            console.error(' Error fetching data:', error);
          });
      }
    };
  
    return (
      <div id="loginPage" className="loginPage">
        <div className="container">
        {(window.location.pathname === '/' || window.location.pathname === '/signup' || window.location.pathname === '/reset-password') && (
          <div className="cmpLogo">
            <img src={`data:image/gif;base64,${cmpLogo}`} alt="Company Logo"></img>
          </div>
        )}
         <h3>Login</h3>
        <label className='required-field'>Username</label>
        <input type="text" placeholder="Enter Username" name="uname" required onChange={(e) => setUserName(e.target.value)}></input>
        {userNameError && <div className='invalidError'>Invalid Username.</div>}
  
        <label className='required-field'>Password</label>
        <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => setPassWord(e.target.value)}></input>
        {passwordError && <div className='invalidError'>Invalid Password.</div>}
  
        <button className='loginbutton' type="" onClick={onLoginClick}>Login</button>
  
        <div className="forgot-links">
            <Link className="right-link" to="/reset-password">Forgot Your Password</Link>
        </div>
        <div className='signUpDiv'>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      </div>
       
    );
}

function Signup({ setLoginPage, setCurrentPage,cmpLogo }) {

    const pythonDomain = 'http://localhost:5000/';

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setnewPassword] = useState('');

    const [userNameError, setUserNameError] = useState(false);
    const [signupPasswordError, setsignupPasswordError] = useState('');
    const [confirmNewPassword, setconfirmNewPassword] = useState('');
    const [signupError, setsignupError] = useState(false);
    
    const [signupErrorMsg, setsignupErrorMsg] = useState('');
    const onContinue = () =>{
        console.log('email: ',email, ' newPassword: ',newPassword, ' confirmNewPassword: ',confirmNewPassword);
        if(email !== '' && newPassword !== '' && confirmNewPassword !==''){
            var minNumberofChars = 8;
            var maxNumberofChars = 16;
            var regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if(newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars){
                console.log('8')
                setsignupPasswordError('Password must be 8-16 characters long')
            }
            else if(regularExpression.test(newPassword)) {
                setsignupPasswordError("password should contain atleast one number and one special character");
            }else if(newPassword === confirmNewPassword){
                axios.post(`${pythonDomain}register`, { email, newPassword, confirmNewPassword })
                .then(response => {
                    console.log('Sign Up Success Response:: ',response.data)
                    if(response.data ==='Registration successful.'){
                      navigate('/');
                    }
                    else{
                        console.log(response.data);
                        setsignupError(true);
                        setsignupErrorMsg(response.data);
                    }
                }) 
                .catch(error => { 
                    console.error(' Error fetching data:', error); 
                });
            }else{
                setsignupPasswordError('Passwords didnt match.');
            }
        }
        else{
            console.log('Null',newPassword); 
            email === '' ? setUserNameError(true) : setUserNameError(false);
        }
    }
    const onCancel = () =>{
        navigate('/');
        setUserNameError(false)
        setsignupErrorMsg('')
        setsignupPasswordError('')
    }

  return(
    <div id='signupPage'  className='signupPage'>
      <div className="container">
        {(window.location.pathname === '/' || window.location.pathname === '/signup' || window.location.pathname === '/reset-password') && (
          <div className="cmpLogo">
            <img src={`data:image/gif;base64,${cmpLogo}`} alt="Company Logo"></img>
          </div>
        )}
          <h3>Set Your Password</h3>
          {signupError && <div className='invalidError'>{signupErrorMsg}</div>}
          <label className='required-field'>Enter your Email</label>
          <input type="text" placeholder="Enter Username" name="uname" required onChange={(e) => setEmail(e.target.value)}></input>
          {userNameError && <div className='invalidError'>Invalid Username.</div>}

          <label className='required-field'>New Password</label>
          <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => setnewPassword(e.target.value)}></input>

          <label className='required-field'>Confirm New Password</label>
          <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => setconfirmNewPassword(e.target.value)}></input>
          <div className='invalidError'>{signupPasswordError}</div>

          <div className='signupbttdiv'>
              <button className='signUpButton' type="" onClick={onCancel}>Cancel</button>
              <button className='signUpButton' type="" onClick={onContinue}>Save</button>
          </div>
        </div>
      </div>
        
  )
}

function ResetPassword({ setLoginPage, setCurrentPage,cmpLogo }) {
    
    const pythonDomain = 'http://localhost:5000/';

    const navigate = useNavigate();
    const [RPUsername, setRPUsername] = useState('');
    const [userNameError, setUserNameError] = useState(false);

    const onRPContinue = () =>{
        console.log(RPUsername);
        if(RPUsername !==''){
            axios.post(`${pythonDomain}reset_password`, {RPUsername})
            .then(response => {
                if (response.data === 'Email sent successfully')
                {
                  alert('Email sent Successfully');
                    navigate('/set-password');
                }
                else if(response.data === 'You need to register first')
                {
                  alert('You need to register first');
                   navigate('/signup'); 
                }  
                else {
                  setUserNameError(true)
                }  
            }) 
            .catch(error => { 
                console.error(' Error fetching data:', error); 
            });
        }else{
            setUserNameError(true)
        }
    }

    const onFPCancel = () =>{
        navigate('/');
        setUserNameError(false)
    }
    return(
        <div id='resetPassword' className='resetPassword'>
          <div className="container">
        {(window.location.pathname === '/' || window.location.pathname === '/signup' || window.location.pathname === '/reset-password') && (
          <div className="cmpLogo">
            <img src={`data:image/gif;base64,${cmpLogo}`} alt="Company Logo"></img>
          </div>
        )}
        <h3>Reset Your Password</h3>
            <label className='required-field'>Enter your Email</label>
            <input type="text" placeholder="Enter Username" name="uname" required onChange={(e) => setRPUsername(e.target.value)}></input>
            {userNameError && <div className='invalidError'>Invalid Username.</div>}

            <div className='signupbttdiv'>
                <button className='signUpButton' type="" onClick={onFPCancel}>Cancel</button>
                <button className='signUpButton' type="" onClick={onRPContinue}>Continue</button>
            </div>
        </div>
      </div>
            
    )
  }

  function SetPassword({ setLoginPage, setCurrentPage }) {

    const pythonDomain = 'http://localhost:5000/';

    const navigate = useNavigate();
    const [NPtoken, setNPtoken] = useState('');
    const [NPnewPassword, setNPnewPassword] = useState('');
    const [NPConfirmpassword, setNPConfirmpassword] = useState('');

    const [signupPasswordError, setsignupPasswordError] = useState('');

    const onNPClick = () =>{
        console.log(NPtoken,NPnewPassword,NPConfirmpassword);
        if(NPtoken !=='' && NPnewPassword !=='' && NPConfirmpassword!==''){
            var minNumberofChars = 8;
            var maxNumberofChars = 16;
            var regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if(NPnewPassword.length < minNumberofChars || NPnewPassword.length > maxNumberofChars){
                setsignupPasswordError('Password must be 8-16 characters long')
            }
            else if(regularExpression.test(NPnewPassword)) {
                setsignupPasswordError("password should contain atleast one number and one special character");
            }else if(NPnewPassword === NPConfirmpassword){
                axios.post(`${pythonDomain}new_password`,{NPtoken, NPnewPassword})
                .then(response => {
                    if(response.data === 'Password changed successfully')
                    {
                        setCurrentPage('login');
                        navigate('/');
                    }
                    else if(response.data === 'You need to register first')
                    {
                        console.log('Password Change Response: ',response.data)
                    }
                    else
                    {
                        console.log('Password Change Response: ',response.data)
                    }    
                }) 
                .catch(error => { 
                    console.error(' Error fetching data:', error);
                });
         }

         else{
            setsignupPasswordError('Passwords didnt match');
         }
        }
        else{
        }
    }

    const onNPCancel = () =>{
        navigate('/');
    }

    return(
        <div id='setPassword' className='setPassword'>
          <div className="container">
          <h3>Set Your Password</h3>
            <label className='required-field'>Enter Token</label>
            <input type="text" placeholder="Enter token" name="psw" required onChange={(e) => setNPtoken(e.target.value)}></input>

            <label className='required-field'>New Password</label>
            <input type="password" placeholder="Enter New Password" name="psw" required onChange={(e) => setNPnewPassword(e.target.value)}></input>

            <label className='required-field'>Confirm New Password</label>
            <input type="password" placeholder="Enter New Password again" name="psw" required onChange={(e) => setNPConfirmpassword(e.target.value)}></input>
            <div className='invalidError'>{signupPasswordError}</div>

            <div className='signupbttdiv'>
                <button className='signUpButton' type="" onClick={onNPCancel}>Cancel</button>
                <button className='signUpButton' type="" onClick={onNPClick}>Save</button>
            </div>
        </div>
          </div>
            
    )
  }
   
function Authentication() {
  const [cmpLogo, setcmpLogo] = useState('');
  const [currentPage, setCurrentPage] = useState('login');
  const [loginPage, setLoginPage] = useState(true);

  const pythonDomain = 'http://localhost:5000/';

  useEffect(() => {
      axios.post(`${pythonDomain}CompanyLogo`)
      .then((response) => {
        setcmpLogo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Router>
        <Routes>
          <Route path="/signup" element={<Signup setLoginPage={setLoginPage} setCurrentPage={setCurrentPage} cmpLogo={cmpLogo}/>} />
          <Route path="/reset-password" element={<ResetPassword setLoginPage={setLoginPage} setCurrentPage={setCurrentPage} cmpLogo={cmpLogo}/>} />
          <Route path="/set-password" element={<SetPassword setLoginPage={setLoginPage} setCurrentPage={setCurrentPage} cmpLogo={cmpLogo}/>} />
          <Route path="/" element={<Login setLoginPage={setLoginPage} setCurrentPage={setCurrentPage} cmpLogo={cmpLogo}/>} />
          <Route path="/homePage/*" element={<HomePage setLoginPage={setLoginPage} setCurrentPage={setCurrentPage} cmpLogo={cmpLogo}/>} />
        </Routes>
      
    </Router>
  );
}

export default Authentication;

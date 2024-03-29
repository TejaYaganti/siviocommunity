import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';

import { FadeLoader  } from 'react-spinners';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './ApplicationTab.css';
import PersonalDetails from './PersonalDetails';
import FamilyDetails from './FamilyDetails';
import EmploymentDetails from './EmploymentDetails';
import EducationDetails from './EducationDetails';
import Awards from './Awards';
import Extracurriculars from './Extracurriculars';
import TestScores from './TestScores';
import Recommendations from './Recommendations';
import Resume from './Resume';
import Declaration from './Declaration';

import NewApplication from './NewApplication';

// ------------------------------------------------JS Starts here---------------------------------------------------
function ApplicationTab() {

    // ------------------------------------------------Variable Declaration Starts here---------------------------------------------------

    const pythonDomain = 'http://localhost:5000/';

    const [applicationsList, setapplicationsList] = useState([]);
    const [campusList, setCampusList] = useState([]);
    const [continueDec, setcontinueDec] = useState(false);                                                       
    const [modalOpen, setModalOpen] = useState(false);
    const [createApplication, setcreateApplication] = useState(false);
    const [viewApplicationModal, setviewApplicationModal] = useState(false);
    const [campusEnable, setcampusEnable] = useState(false);
    const [applicationNum, setapplicationNum] = useState('');
    const [applicationNumber, setapplicationNumber] = useState('');
    const [communityStatus, setcommunityStatus] = useState('');
    const [semister, setsemister] = useState('');
    const [submittedDate, setsubmittedDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [declarationId, setdeclarationId] = useState('');

        useEffect(() => {
        axios.post(`${pythonDomain}Applications`) 
        .then(response => {
            setapplicationsList(response.data);
            console.log('Applications:: ',response.data)
            if(response.data !== undefined){
                setLoading(false);
           }
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
        }, []);

        // ------------------------------------------------Application continue button ---------------------------------------------------
        const aplliContinue = (applicationNum, declarationId)=> {
            console.log('apppp')
            setapplicationNum(applicationNum)
            setdeclarationId(declarationId)
            setcontinueDec(true)
            if (document.getElementById('ApplicationTable')) {
                if (document.getElementById('ApplicationTable').style.display === 'none') {
                    document.getElementById('ApplicationTable').style.display = 'block';
                    document.getElementById('editApplication').style.display = 'none';
                }
                else {
                    document.getElementById('ApplicationTable').style.display = 'none';
                    document.getElementById('editApplication').style.display = 'block';
                }
            }
            document.getElementById("defaultOpen").click();
        }

        // ------------------------------------------------Application View button ---------------------------------------------------
        const viewApplication = (status, applicationNo,submitDate) =>{
            setviewApplicationModal(true);
            setapplicationNumber(applicationNo);
            setcommunityStatus(status)
            setsubmittedDate(submitDate)
          
        }

        const onModalClose = () =>{
            setviewApplicationModal(false);
        }

        // ------------------------------------------------Application Tab button ---------------------------------------------------
        const appTabClick = (evt, name)=>{
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("vtabcontent");
              for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
              }
              tablinks = document.getElementsByClassName("vtablinks");
              for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
              }
              document.getElementById(name).style.display = "block";
              evt.currentTarget.className += ' active'; 
        }
        const backtoAppliactions = ()=>{
            if (document.getElementById('editApplication')) {
                if (document.getElementById('editApplication').style.display === 'none') {
                    document.getElementById('editApplication').style.display = 'block';
                    document.getElementById('ApplicationTable').style.display = 'none';
                }
                else {
                    document.getElementById('editApplication').style.display = 'none';
                    document.getElementById('ApplicationTable').style.display = 'block';
                }
            }
        }
        // ------------------------------------------------New Application button ---------------------------------------------------
        const newApplication = () => {
            setcreateApplication(true);
            setcampusEnable(true)
            axios.post(`${pythonDomain}campus`)
            .then(response => {
                setCampusList(response.data);
                setcampusEnable(false)
            }) 
            .catch(error => { 
                console.error('Error fetching data:', error); 
            });
            setModalOpen(true);
        };

        // ------------------------------------------------close Modal ---------------------------------------------------
        const closeModal = () => {
            setModalOpen(false);
        };

        // ------------------------------------------------Refresh Applications after saving the Application---------------------------------------------------
        const RefreshData = () => {
            toast.success('Application Successfully Created', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            console.log('Refresh');
            axios.post(`${pythonDomain}Applications`) 
                .then(response => {
                    setapplicationsList(response.data);
                    console.log('Updated Data: ', response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

// ------------------------------------------------HTML Starts here---------------------------------------------------      
    return(
        <>
           <div className="grid-container">
                <div className="grid-item">

                </div>
                <div className="grid-item">
                <ToastContainer/>
                {loading && (
                                    <div className="spinner-container">
                                        <FadeLoader  color={'#000000'} loading={loading} size={100} />
                                    </div>
                                )}
                    <div style={{fontSize:'20px',fontWeight:'500'}}>Applications</div>
                    <div className='ApplicationTable' id='ApplicationTable'>
                        <table style={{width:'100%',paddingTop:'10px'}}>
                            <thead>
                                <tr>
                                    <th style={{width:'20%',textAlign:'left'}}>Name</th>
                                    <th style={{width:'30%',textAlign:'left'}}>Course Name</th>
                                    <th style={{width:'30%',textAlign:'left'}}>Status</th>
                                    <th style={{width:'20%',textAlign:'left'}}></th>
                                </tr>
                            </thead>
                            <tbody>  
                            {applicationsList.map((contact) => (
                                <tr key={contact.appId}>
                                    <td>{contact.applicationNumber}</td>
                                    <td>{contact.courseName}</td>
                                    <td>{contact.communityStatus}</td>
                                    <td>{contact.communityStatus === 'Accepted' || contact.communityStatus === 'Review In-Progress' || contact.communityStatus === 'Submitted' ? (
                                        <button type='submit' className='buttonStyle' onClick={(event)=> viewApplication(contact.communityStatus,contact.applicationNumber,contact.submittedDate)} style={{ marginLeft: '10px' }}>
                                            <FontAwesomeIcon icon={faEye} /> View
                                        </button>
                                        ) : (
                                        <button type='submit' className='buttonStyle'  onClick={() => aplliContinue(contact.applicationNumber, contact.appId)} style={{ marginLeft: '10px' }}>
                                            Continue <FontAwesomeIcon icon={faAnglesRight} />
                                        </button>
                                        )}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <button style={{marginTop:'10px'}} type='submit' className='buttonStyle' onClick={newApplication}><FontAwesomeIcon className='plusIcon' icon={faPlus} />   Add New</button>

                        {createApplication && (
                            <NewApplication isOpen={modalOpen} campusList={campusList} onClose={closeModal} onApplicationSave={RefreshData} campusEnable={campusEnable}>
                            </NewApplication>
                        )}
                        {viewApplicationModal && (
                            <div className="modal-overlay">
                                <div className="modal">
                                    <div className="modal-header">
                                        <button className="close-button" onClick={onModalClose}>
                                            &times;
                                        </button>
                                        <h3>Application Details</h3>
                                    </div>
                                    <div className="modal-body">
                                    <div className="account-details">
                                        <div className="custom-select">
                                            <label htmlFor="ApplicationNo">Application No</label>
                                            <div><output>{applicationNumber}</output></div>
                                            
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="CommunityStatus">Community Status</label>
                                            <div><output>{communityStatus}</output></div>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="Semester">Semester</label>
                                            <div><output>{semister}</output></div>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Submitted Date</label>
                                            <div><output>{submittedDate}</output></div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div id='editApplication'>
                        <div className="vtab">
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "AppHome")} id="defaultOpen">Home</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Personal")}>Personal</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "FamilyDetails")}>Family Details</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Employment")}>Employment</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Education")}>Education</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Awards")}>Awards</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Extracurriculars")}>Extracurriculars</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "TestScores")}>Test Scores</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Recommendations")}>Recommendations</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Resume")}>Resume</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Declaration")}>Declaration</button>
                        </div>
                        <div><button className='buttonStyle' style={{float:'right'}} onClick={backtoAppliactions}><FontAwesomeIcon icon={faArrowLeft} /> Back to Applications</button></div>
                        <div id="AppHome" className="vtabcontent">
                            <div style={{fontSize:'1.125rem',marginTop:'200px'}}>
                                Welcome to our portal! Please take the next step by clicking the "Continue" button to provide the remaining details and complete your application. We are excited to review your finished application as you get one step closer to realizing your aspirations."
                            </div>
                        </div>
                        <div id="Personal" className="vtabcontent">
                            <PersonalDetails></PersonalDetails>
                        </div>
                        <div id="FamilyDetails" className="vtabcontent">
                            <FamilyDetails/>
                        </div>
                        <div id="Employment" className="vtabcontent">
                            <EmploymentDetails/>
                        </div>
                        <div id="Education" className="vtabcontent">
                            <EducationDetails/>
                        </div>
                        <div id="Awards" className="vtabcontent">
                            <Awards/>
                        </div>
                        <div id="Extracurriculars" className="vtabcontent">
                            <Extracurriculars/>
                        </div>
                        <div id="TestScores" className="vtabcontent">
                            <TestScores/>
                        </div>
                        <div id="Recommendations" className="vtabcontent">
                            <Recommendations/>
                        </div>
                        <div id="Resume" className="vtabcontent">
                            <Resume/>
                        </div> 
                        {continueDec&& (<div id="Declaration" className="vtabcontent">
                            <Declaration appnum = {applicationNum} decId = {declarationId} />
                        </div>)}
                        
                    </div>
                </div>
                <div className="grid-item">

                </div>
            </div>
        </>
    );
}

export default ApplicationTab;
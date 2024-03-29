import React, { useState } from 'react';
import './NewApplication.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FadeLoader  } from 'react-spinners';

// ------------------------------------------------JS Starts here---------------------------------------------------

const NewApplication = ({ isOpen, onClose, children,campusList,onApplicationSave,campusEnable }) => {

// ------------------------------------------------Variable Declaration Starts here---------------------------------------------------

    const pythonDomain = 'http://localhost:5000/';

    const [selectedCampus, setSelectedCampus] = useState('');
    const [selectedIntake, setSelectedIntake] = useState('');
    const [selectedCourseType, setSelectedCourseType] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const [intakeList, setintakeList] = useState([]);
    const [courseTypeList, setcourseTypeList] = useState([]);
    const [courseList, setcourseList] = useState([]);

    const [campusError, setcampusError] = useState(false);
    const [intakeError, setintakeError] = useState(false);
    const [courseTypeError, setcourseTypeError] = useState(false);
    const [courseError, setcourseError] = useState(false);

    const [loading, setLoading] = useState(false);
   
    const [intakeEnable, setintakeEnable] = useState(false);
    const [couseTypeEnable, setcouseTypeEnable] = useState(false);
    const [courseEnable, setcourseEnable] = useState(false);

// ------------------------------------------------campus Details ---------------------------------------------------    
    const uniqueCampusList = Array.from(new Set(campusList.map(campus => campus.campusId)))
    .map(id => ({
        value: id,
        label: campusList.find(campus => campus.campusId === id).campusName,
    }));

    const campusOptions = [
        { value: '', label: 'Choose one' },
        ...uniqueCampusList,
    ];
    
    const handleCampusChange = (event) => {
        const selectedCampus = event.target.value;
        console.log('selectedValue ', selectedCampus); 
        if(!selectedCampus){
            setcampusError(true);
        }else{
            setcampusError(false);
        }
        setSelectedCampus(selectedCampus);
        setLoading(true);
        setintakeEnable(true);
        axios.post(`${pythonDomain}intake`, { selectedCampus })
            .then(response => {
                setintakeList(response.data);
                setLoading(false);
                setintakeEnable(false);
                console.log('intakeList:: ',JSON.stringify(response.data))
            }) 
            .catch(error => { 
                console.error('Error fetching data:', error); 
            });
    };  

// ------------------------------------------------Intake Details --------------------------------------------------- 
    const uniqueIntakeList = Array.from(new Set(intakeList.map(intake => intake.intakeName)))
    .map(name => ({
        value: name,
        label: name,
    }));

    const intakeOptions = [
        { value: '', label: 'Choose one' },
        ...uniqueIntakeList,
    ];

    const handleIntakeChange = (event) => {

        const selectedValue = event.target.value;
        setSelectedIntake(event.target.value);
        if(!selectedValue){
            setintakeError(true);
        }else{
            setintakeError(false);
        }
        setLoading(true);
        setcouseTypeEnable(true);
        console.log('Selected intake:', selectedValue);
        axios.post(`${pythonDomain}courseType`, { selectedCampus,selectedValue })
        .then(response => {
            setcourseTypeList(response.data);
            console.log('courseTypeList:: ',JSON.stringify(response.data))
            setLoading(false);
            setcouseTypeEnable(false);
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
    };

// ------------------------------------------------Course Type Details --------------------------------------------------- 
    const uniqueCourseTypeList = Array.from(new Set(courseTypeList.map(courseType => courseType.ctName)))
    .map(name => ({
        value: name,
        label: name,
    }));

    const courseTypeOptions = [
        { value: '', label: 'Choose one' },
        ...uniqueCourseTypeList,
    ];
    
    const handleCourseTypeChange = (event) => {
        setSelectedCourseType(event.target.value);
        const selectedValue = event.target.value;
        if(!selectedValue){
            setcourseTypeError(true);
        }else{
            setcourseTypeError(false);
        }
        setLoading(true);
        setcourseEnable(true);
        axios.post(`${pythonDomain}course`, { selectedCampus,selectedIntake,selectedValue })
        .then(response => {
            setcourseList(response.data);
            setLoading(false);
            setcourseEnable(false);
            console.log('courseList:: ',JSON.stringify(response.data))
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
    };

// ------------------------------------------------Course Details ---------------------------------------------------  
    const uniqueCourseList = Array.from(new Set(courseList.map(course => course.courseId)))
    .map(id => ({
        value: id,
        label: courseList.find(course => course.courseId === id).courseName,
    }));
    
    const courseOptions = [
    { value: '', label: 'Choose one' },
    ...uniqueCourseList,
    ];

    const handleCourseChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCourse(event.target.value);
        if(!selectedValue){
            setcourseError(true);
        }else{
            setcourseError(false);
        }
    };

// ------------------------------------------------Save Button ---------------------------------------------------
    const onSave = () =>{
       
        var campus = selectedCampus;
        var intake = selectedIntake;
        var courseType = selectedCourseType;
        var course = selectedCourse;
        console.log('campus: ',campus,' intake: ',intake,' courseType',courseType,' course: ',course)

        if(!campus){
            setcampusError(true);
        }else if(!intake){
            setintakeError(true);
        }else if(!courseType){
            setcourseTypeError(true);
        }else if(!course){
            setcourseError(true);
        }else{
            const token = localStorage.getItem('email');
            axios.post(`${pythonDomain}newAppliaction`, { campus,intake,courseType,course, token })
                .then(response => {
                    if(response.data ==='Success'){
                        onClose1();
                        onApplicationSave(); 
                    }else{
                        toast.error(response.data, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                    }
                }) 
                .catch(error => { 
                    console.error('Error fetching data:', error); 
                });
        }
    }

// ------------------------------------------------cancel Button ---------------------------------------------------  
    const onClose1 = () =>{
        setSelectedCampus('');
        setSelectedIntake('');
        setSelectedCourseType('');
        setSelectedCourse('');
        onClose();
        setcampusError(false);
        setintakeError(false);
        setcourseTypeError(false);
        setcourseError(false);
    }


  if (!isOpen) return null;

// ------------------------------------------------HTML Starts here---------------------------------------------------

  return (
    <div className='newApp'>
        <div className="modal-overlay">
                <ToastContainer/>
            <div className="modal">
                <div className="modal-header">
                    <button className="close-button" onClick={onClose1}>
                        &times;
                    </button>
                    <h3>New Application</h3>
                </div>
                <div className="modal-body">
                    {loading && (
                        <div className="spinner-container">
                            <FadeLoader  color={'#000000'} loading={loading} size={100} />
                        </div>
                    )}
                    {children}
                    <div className="account-details">
                                    {/* ----------------------------------- Campus Picklist Field ---------------------------------*/}
                        <div className="custom-select">
                            <label htmlFor="campus">Campus</label>
                            <select id="campus" value={selectedCampus} onChange={handleCampusChange} required disabled={campusEnable}>
                                {campusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))}
                            </select>
                            {campusError && <div style={{ color: 'red', fontSize:'12px' }}>Complete this field.</div>}
                        </div>
                                    {/* ----------------------------------- Intake Picklist Field ---------------------------------*/}
                        <div className="custom-select">
                            <label htmlFor="Intake">Intake</label>
                            <select id="Intake" value={selectedIntake} onChange={handleIntakeChange} required disabled={intakeEnable}>
                                {intakeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))}
                            </select>
                            {intakeError && <div style={{ color: 'red', fontSize:'12px' }}>Complete this field.</div>}
                        </div>
                                    {/* ----------------------------------- Course Type Picklist Field ---------------------------------*/}
                        <div className="custom-select">
                            <label htmlFor="CourseType">Course Type</label>
                            <select id="CourseType" value={selectedCourseType} onChange={handleCourseTypeChange} required disabled={couseTypeEnable}>
                                {courseTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))}
                            </select>
                            {courseTypeError && <div style={{ color: 'red', fontSize:'12px' }}>Complete this field.</div>}
                        </div>
                                    {/* ----------------------------------- Course Picklist Field ---------------------------------*/}
                        <div className="custom-select">
                            <label htmlFor="Course">Course</label>
                            <select id="Course" value={selectedCourse} onChange={handleCourseChange} required disabled={courseEnable}>
                                {courseOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))}
                            </select>
                            {courseError && <div style={{ color: 'red', fontSize:'12px' }}>Complete this field.</div>}
                        </div>
                    </div>
                </div>
                                    {/* ----------------------------------- Buttons ---------------------------------*/}
                <div className="modal-footer">
                    <button className="buttonStyle" style={{ marginRight: '10px' }} onClick={onClose1}>Cancel</button>
                    <button className="buttonStyle" onClick={onSave}>Save</button>
                </div>
            </div>
            </div>
    </div>
    
  );
};

export default NewApplication;
import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import './EducationDetails.css';
import { FadeLoader  } from 'react-spinners';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


  
function EducationDetails(){
   

    const pythonDomain = 'http://localhost:5000/';

    const [educationList, seteducationList] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [countryOptions, setcountryOptions] = useState(useState(new Map()));
    const [LevelofStudyOptions, setLevelofStudyOptions] = useState(useState(new Map())); 
    const [DegreeClassOptions, setDegreeClassOptions] = useState(useState(new Map()));
    const [FieldofStudyOptions, setFieldofStudyOptions] = useState(useState(new Map()));

    const[schoolCollege,setSchoolCollege] = useState('');
    const[country,setCountry] = useState('');
    const[StartDate,setStartDate] = useState(''); 
    const[EndDate,setEndDate] = useState('');
    const[LevelofStudy,setLevelofStudy] = useState('');
    const[DegreeClass,setDegreeClass] = useState('');
    const[FieldofStudy,setFieldofStudy] = useState('');
    const[BoardUniversity,setBoardUniversity] = useState('');
    const[Specialization,setSpecialization] = useState('');
    const[YearofPassing,setYearofPassing] = useState('');
    const[CourseDuration,setCourseDuration] = useState('');
    const[MarksGPA,setMarksGPA] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        // if(educationList === undefined){
            axios.post(`${pythonDomain}educationDetails`)
            .then(response => {
                seteducationList(response.data);
                console.log('EducationDetails:: ',response.data)
            }) 
            .catch(error => { 
                console.error('EducationDetails Error fetching data:', error); 
            });
        //}
    }, []);

    
    const addNewFamily = () =>{

        setLoading(true)
        axios.post(`${pythonDomain}educationPickLists`)
        .then(response => {
            const noneOption = { id: null, name: '--None--' };
            const countryOptions = [noneOption, ...Object.entries(response.data.countryPickList).map(([key, value]) => ({ id: key, name: value }))];
            const LevelofStudyOptions = [noneOption, ...Object.entries(response.data.LevelofStudyPickiList).map(([key, value]) => ({ id: key, name: value }))];
            const DegreeClassOptions = [noneOption, ...Object.entries(response.data.DegreeClassPickList).map(([key, value]) => ({ id: key, name: value }))];
            const FieldofStudyOptions = [noneOption, ...Object.entries(response.data.FieldofStudyPickList).map(([key, value]) => ({ id: key, name: value }))];              
            setcountryOptions(countryOptions);
            setLevelofStudyOptions(LevelofStudyOptions);
            setDegreeClassOptions(DegreeClassOptions);
            setFieldofStudyOptions(FieldofStudyOptions);
            
            if(countryOptions !== undefined && LevelofStudyOptions !==undefined && DegreeClassOptions !== undefined && FieldofStudyOptions !== undefined){
                setLoading(false)
                setModal(true)
            }
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
    }
    
    
    const updateFamily = () =>{
        
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          if (file.size <= 3 * 1024 * 1024) { 
            setSelectedFile(file);
            setErrorMessage('');
          } else {
            setSelectedFile(null);
            setErrorMessage('File size exceeds 3MB limit.');
          }
        }
      };

      const handleUpload = () => {
        if (selectedFile) {
          console.log('File uploaded:', selectedFile);
        } else {
          setErrorMessage('Please select a valid file.');
        }
      };
    const deleteFamily = () =>{

    }
    const onSave =() =>{

        const educationRecordData = {schoolCollege:schoolCollege,country:country,StartDate:StartDate,EndDate:EndDate,
        LevelofStudy:LevelofStudy,DegreeClass:DegreeClass,FieldofStudy:FieldofStudy,BoardUniversity:BoardUniversity,Specialization:Specialization,
        YearofPassing:YearofPassing,CourseDuration:CourseDuration,MarksGPA:MarksGPA}

        console.log('educationRecordData:: ',JSON.stringify(educationRecordData))   
        
        axios.post(`${pythonDomain}newEducationRecord?educationRecord=${JSON.stringify(educationRecordData)}`)
        .then(response => {
            console.log('educationData:: ',response.data)
            if(response.data === 'Success'){
                toast.success(response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                setModal(false);
                setSchoolCollege('');
                setCountry('');
                setStartDate('');
                setEndDate('');
                setLevelofStudy('');
                setDegreeClass('');
                setFieldofStudy('');
                setBoardUniversity('');
                setSpecialization('');
                setYearofPassing('');
                setCourseDuration('');
                setMarksGPA('');
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
            console.error('EducationData Error fetching data:', error); 
        }); 

    }
    const onModalClose =() =>{
        setModal(false);
        setSchoolCollege('');
        setCountry('');
        setStartDate('');
        setEndDate('');
        setLevelofStudy('');
        setDegreeClass('');
        setFieldofStudy('');
        setBoardUniversity('');
        setSpecialization('');
        setYearofPassing('');
        setCourseDuration('');
        setMarksGPA('');
    }

       
           

    return (
        <div>
            <div className='PageTitle'>Education Details</div>
            {loading && (
                        <div className="spinner-container">
                            <FadeLoader  color={'#000000'} loading={loading} size={100} />
                        </div>
                    )}
            
            <div className='FamilyTable'>
                <table style={{width:'100%',paddingTop:'10px'}}>
                <thead>
                 <tr>
                    <th style={{ width: '25%', textAlign: 'left' }}>Qualification</th>
                    <th style={{ width: '25%', textAlign: 'left' }}>Board/University</th>
                    <th style={{ width: '25%', textAlign: 'left' }}>GPA</th>
                    <th style={{ width: '25%', textAlign: 'left' }}>Marks(%)</th>
                    <th style={{ width: '25%', textAlign: 'left'}}>Transcript</th>
                    <th style={{ width: '25%', textAlign: 'left'}}>Degree Certificate</th>
                    <th style={{ width: '25%', textAlign: 'left' }}></th>
                </tr>
                </thead>

                    <tbody>  
                    {educationList.map((edu) => (
                            <tr key={edu.Id}>
                                <td>{edu.DegreeClass}</td>
                                <td>{edu.BoardUniversity}</td>
                                <td>{edu.MarksGPA}</td>
                                <td>{edu.endDate}</td>
                                <td>
                                    <div style={{ marginRight: '10px' }}>
                                    <input type="file" onChange={handleFileChange} />
                                    <button onClick={handleUpload}>
                                        Attach
                                    </button>
                                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                    </div>
                                    <button type='submit' className='buttonStyle' onClick={updateFamily} style={{ marginRight: '10px' }}>
                                        Update
                                    </button>
                                    <button type='submit' className='buttonStyle' onClick={deleteFamily} style={{ backgroundColor:'#ba0517' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modal && (
                <div className='newFamily'>
                    <div className="modal-overlay">
                    <ToastContainer/>
                        <div className="modal">
                            <div className="modal-header">
                                <button className="close-button" onClick={onModalClose}>
                                    &times;        
                                </button>
                                <h3>Education Details</h3>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="account-details">
                                        <div className="custom-select">
                                            <label htmlFor="ApplicationNo">School/College</label>
                                            <input type="text" name="School/College" value={schoolCollege}  onChange={(e) => setSchoolCollege(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Country</label>
                                            <select className='input-name' name="country" value={country}  onChange={(e) => setCountry(e.target.value)}>
                                            {countryOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Start Date</label>
                                            <input type="date" name="StartDate" value={StartDate}  onChange={(e) => setStartDate(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">End Date</label>
                                            <input type="date" name="EndDate" value={EndDate}  onChange={(e) => setEndDate(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Level of Study</label>
                                            <select className='input-name' name="LevelofStudy" value={LevelofStudy}  onChange={(e) => setLevelofStudy(e.target.value)}>
                                            {LevelofStudyOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Degree / Class</label>
                                            <select className='input-name' name="Degree/Class" value={DegreeClass}  onChange={(e) => setDegreeClass(e.target.value)}>
                                            {DegreeClassOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Field of Study</label>
                                            <select className='input-name' name="FieldofStudy" value={FieldofStudy}  onChange={(e) => setFieldofStudy(e.target.value)}>
                                            {FieldofStudyOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Board / University</label>
                                            <input type="text" name="Board/University" value={BoardUniversity}  required onChange={(e) => setBoardUniversity(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Specialization</label>
                                            <input type="text" name="Specialization" value={Specialization}  onChange={(e) => setSpecialization(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Year of Passing</label>
                                            <input type="text" name="YearofPassing" value={YearofPassing} required  onChange={(e) => setYearofPassing(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Course Duration(in Years)</label>
                                            <input type="text" name="CourseDuration(inYears)" value={CourseDuration}  onChange={(e) => setCourseDuration(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Marks / GPA</label>
                                            <select className='input-name' name="Marks/GPA" required value={MarksGPA}  onChange={(e) => setMarksGPA(e.target.value)}>
                                            <option>--None--</option>
                                            <option>Marks</option>
                                            <option>GPA</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="buttonStyle" style={{ marginRight: '10px' }} onClick={onModalClose}>Cancel</button>
                                <button className="buttonStyle" onClick={onSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                <div className='buttonsDiv'><button type='submit' onClick={addNewFamily} className='buttonStyle'><i className="fa fa-plus"></i>Add New</button></div>
                <div className='continueButton'><button type='submit' className='buttonStyle'>Continue</button></div>
            </div>
       
    );
}


export default EducationDetails;
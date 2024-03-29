import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TestScores() {
    const pythonDomain = 'http://localhost:5000/';

    const [testsList, setExtraList] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [typeOptions, setTypeOptions] = useState([]);

    const [id, setExtraId] = useState();
    const [orderOfImportance, setOrderofImportance] = useState();
    const [types, setType] = useState();
    const [name, setOrganizationName] = useState();
    const [participationStartDate, setParticipationStartDate] = useState();
    const [participationEndDate, setParticipationEndDate] = useState();
    const [role, setRole] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        const token = localStorage.getItem('email');
        axios.post(`${pythonDomain}testDetails`, { email: token })
            .then(response => {
                setExtraList(response.data);
            })
            .catch(error => {
                console.error('Error fetching record details:', error);
            });
    }, []);

    const addNewAward = () => {
        setLoading(true)
        axios.post(`${pythonDomain}extraPickLists`)
        .then(response => {
            console.log('typeOptions22:: ',JSON.stringify(response.data.typePickList))
            const noneOption = { id: null, name: '--None--' };
            const typeOptions = [noneOption, ...Object.entries(response.data.typePickList).map(([key, value]) => ({ id: key, name: value }))];
            setTypeOptions(typeOptions);
            setLoading(false);
            if(typeOptions !== undefined){
                setLoading(false)
                setModal(true)
            }
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
    }

    const updateAwards = (extId) => {
        setLoading(true);
        setModal(true);
        axios.post(`${pythonDomain}updateExtraRecord?extraRecordId=${extId}`)
        .then(response => {
            console.log('Extracurricular Details:: ',response.data.extraRecord.Id)
            let extRec = response.data.extraRecord;
                setExtraId(extRec.Id);
                setOrderofImportance(extRec.Order_of_Importance__c	);
                setType(extRec.Type__c);
                setParticipationStartDate(extRec.Participation_Start_Date__c);
                setParticipationEndDate(extRec.Participation_End_Date__c);
                setOrganizationName(extRec.Organization_Name__c);
                setRole(extRec.Role__c);
                setDescription(extRec.Description__c);
                const noneOption = { id: null, name: '--None--' };
                const typeOptions = [noneOption, ...Object.entries(response.data.typePickList).map(([key, value]) => ({ id: key, name: value }))];
                setTypeOptions(typeOptions);

                setLoading(false);
        }) 
        .catch(error => { 
            console.error('AwardDetails Error fetching data:', error); 
        });
    }

    const deleteAwards = (extId) => {
        setLoading(true);
        axios.post(`${pythonDomain}deleteExtraRecord?extraRecordId=${extId}`)
            .then(response => {
                if (response.data === 'Extracurricular Record Successfully Deleted') {
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
                    axios.post(`${pythonDomain}extraDetails`)
                        .then(response => {
                            setExtraList(response.data);
                            console.log('Extracurricular Details:: ',response.data)
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Error fetching Extracurricular details:', error);
                        });
                } else {
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
                console.error('Error deleting record:', error);
            })
          
    }

    const onSave = () => {
        const extraRecordData =
            { id: id, orderOfImportance: orderOfImportance, types: types, name: name, role: role, participationStartDate:participationStartDate, participationEndDate:participationEndDate ,description: description } 
       
        console.log('extraRecordData:: ',JSON.stringify(extraRecordData))
        axios.post(`${pythonDomain}newExtraRecord?extraRecord=${JSON.stringify(extraRecordData)}`)
            .then(response => {
                if (response.data === 'Success') {
                    toast.success(response.data);
                    axios.post(`${pythonDomain}extraDetails`)
                        .then(response => {
                            setExtraList(response.data);
                            setModal(false);
                            setOrderofImportance('');
                            setType('');
                            setOrganizationName('');
                            setRole('');
                            setParticipationStartDate('');
                            setParticipationEndDate('');
                            setDescription('');
                        })
                        .catch(error => {
                            console.error('Error fetching award details:', error);
                        });
                } else {
                    toast.error(response.data);
                }
            })
            .catch(error => {
                console.error('Error saving award:', error);
            });
    }

    const onModalClose = () => {
        setModal(false);
        setOrderofImportance('');
        setType('');
        setParticipationStartDate('');
        setParticipationEndDate('');
        setRole('');
        setOrganizationName('');
        setDescription('');
    }

    return (
        <div>
            <div className='PageTitle'>Test Scores</div>
            {loading && (
                <div className="spinner-container">
                    <FadeLoader color={'#000000'} loading={loading} size={100} />
                </div>
            )}

            <div className='FamilyTable'>
                <table style={{ width: '800px', paddingTop: '10px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '25%', textAlign: 'left' }}>Exam</th>
                            <th style={{ width: '25%', textAlign: 'left' }}>Total Score</th>
                            <th style={{ width: '25%', textAlign: 'left' }}>Qualified Date</th>
                            <th style={{ width: '25%', textAlign: 'left' }}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {testsList.map((ext) => (
                            <tr key={ext.Id}>
                                <td>{ext.Exam__c}</td>
                                <td>{ext.Score__c}</td>
                                <td>{ext.Qualified_date__c}</td>
                                <td>
                                <div style={{display : 'flex'}}>
                                    <button type='button' className='buttonStyle' onClick={() => updateAwards(ext.Id)} style={{ marginRight: '10px' }}>
                                        <FontAwesomeIcon icon={faPencil} /> Update
                                    </button>
                                    <button type='button' className='buttonStyle' onClick={() => deleteAwards(ext.Id)} style={{ backgroundColor: '#ba0517' }}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modal && (
                <div className='newFamily'>
                    <div className="modal-overlay">
                        <ToastContainer />
                        <div className="modal">
                            <div className="modal-header">
                                <button className="close-button" onClick={onModalClose}>&times;</button>
                                <h3>New Extracurricular Activity</h3>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="account-details">
                                        <div className="custom-select">
                                            <label htmlFor="ApplicationNo">Order of Importance</label>
                                            <input type="number" required name="OrderofImportance" value={orderOfImportance} onChange={(e) => setOrderofImportance(e.target.value)} />
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Type</label>
                                            <select className='input-name' name="type" value={types} required onChange={(e) => setType(e.target.value)}>
                                                {typeOptions.map(option => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Participation Start Date</label>
                                            <input type="date" required name="Participation Start Date" value={participationStartDate} onChange={(e) => setParticipationStartDate(e.target.value)} />
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Participation End Date</label>
                                            <input type="date" required name="Participation End Date" value={participationEndDate} onChange={(e) => setParticipationEndDate(e.target.value)} />
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Organization Name</label>
                                            <input type="text" required name="Organization Name" value={name} onChange={(e) => setOrganizationName(e.target.value)} />
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Role</label>
                                            <input type="text" required name="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Description</label>
                                            <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
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
            <div className='buttonsDiv'><button type='button' onClick={addNewAward} className='buttonStyle'><FontAwesomeIcon className='plusIcon' icon={faPlus} /> Add New</button></div>
            <div className='continueButton'><button type='button' className='buttonStyle'>Continue</button></div>
        </div>
    );
}


export default TestScores
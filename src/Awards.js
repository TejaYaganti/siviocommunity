import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Awards() {
    const pythonDomain = 'http://localhost:5000/';

    const [awardsList, setAwardsList] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [typeOptions, setTypeOptions] = useState([]);

    const [id, setAwardId] = useState();
    const [title, setTitle] = useState();
    const [types, setType] = useState();
    const [datee, setDate] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        axios.post(`${pythonDomain}awardDetails`)
            .then(response => {
                setAwardsList(response.data);
            })
            .catch(error => {
                console.error('Error fetching award details:', error);
            });
    }, []);

    const addNewAward = () => {
        setLoading(true)
        axios.post(`${pythonDomain}awardsPickLists`)
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

    const updateAwards = (awsId) => {
        setLoading(true);
        setModal(true);
        axios.post(`${pythonDomain}updateAwardRecord?awardRecordId=${awsId}`)
        .then(response => {
            console.log('AwardDetails:: ',response.data.awardRecord.Id)
            let awsRec = response.data.awardRecord;
                setAwardId(awsRec.Id);
                setTitle(awsRec.Title__c);
                setType(awsRec.Type__c);
                setDate(awsRec.Date__c);
                setDescription(awsRec.Description__c);
                const noneOption = { id: null, name: '--None--' };
                const typeOptions = [noneOption, ...Object.entries(response.data.typePickList).map(([key, value]) => ({ id: key, name: value }))];
                setTypeOptions(typeOptions);

                setLoading(false);
        }) 
        .catch(error => { 
            console.error('AwardDetails Error fetching data:', error); 
        });
    }

    const deleteAwards = (awsId) => {
        setLoading(true);
        axios.post(`${pythonDomain}deleteAwardRecord?awardRecordId=${awsId}`)
            .then(response => {
                if (response.data === 'Awards Record Successfully Deleted') {
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
                    axios.post(`${pythonDomain}awardDetails`)
                        .then(response => {
                            setAwardsList(response.data);
                            console.log('FamilyDetails:: ',response.data)
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Error fetching award details:', error);
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
                console.error('Error deleting award:', error);
            })
          
    }

    const onSave = () => {
        const awardsRecordData =
            { id: id, title: title, types: types, datee: datee, description: description } 
            const token = localStorage.getItem('email');
        console.log('awardsRecordData:: ',JSON.stringify(awardsRecordData))
        axios.post(`${pythonDomain}newAwardRecord?awardRecord=${JSON.stringify(awardsRecordData)}`, { email: token })
            .then(response => {
                if (response.data === 'Success') {
                    toast.success(response.data);
                    axios.post(`${pythonDomain}awardDetails`)
                        .then(response => {
                            setAwardsList(response.data);
                            setModal(false);
                            setTitle('');
                            setType('');
                            setDate('');
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
        setTitle('');
        setType('');
        setDate('');
        setDescription('');
    }

    return (
        <div>
            <div className='PageTitle'>Awards</div>
            {loading && (
                <div className="spinner-container">
                    <FadeLoader color={'#000000'} loading={loading} size={100} />
                </div>
            )}

            <div className='FamilyTable'>
                <table style={{ width: '100%', paddingTop: '10px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '25%', textAlign: 'left' }}>Title</th>
                            <th style={{ width: '25%', textAlign: 'left' }}>Type</th>
                            <th style={{ width: '25%', textAlign: 'left' }}>Date</th>
                            <th style={{ width: '25%', textAlign: 'left' }}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {awardsList.map((aws) => (
                            <tr key={aws.Id}>
                                <td>{aws.Title__c}</td>
                                <td>{aws.Type__c}</td>
                                <td>{aws.Date__c}</td>
                                <td>
                                <div style={{display:'flex', width:'125%'}}>
                                    <button type='button' className='buttonStyle' onClick={() => updateAwards(aws.Id)} style={{ marginRight: '10px' }}>
                                        <FontAwesomeIcon icon={faPencil} /> Update
                                    </button>
                                    <button type='button' className='buttonStyle' onClick={() => deleteAwards(aws.Id)} style={{ backgroundColor: '#ba0517' }}>
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
                                <h3>New Award</h3>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="account-details">
                                        <div className="custom-select">
                                            <label htmlFor="ApplicationNo">Title</label>
                                            <input type="text" required name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                                            <label htmlFor="SubmittedDate">Date</label>
                                            <input type="date" required name="date" value={datee} onChange={(e) => setDate(e.target.value)} />
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

export default Awards;

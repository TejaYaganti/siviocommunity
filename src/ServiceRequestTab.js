import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ServiceRequestTab.css';
function ServiceRequestTab() {

    const pythonDomain = 'http://localhost:5000/';

    const [serviceList, setServiceList] = useState([]);
    const [viewmodal, setViewModal] = useState(false);
    const [newmodal, setNewModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [id, setServiceId] = useState();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [status, setStatus] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();


    useEffect(() => {
        axios.post(`${pythonDomain}serviceRequests`)
            .then(response => {
                setServiceList(response.data);
            })
            .catch(error => {
                console.error('Error fetching record details:', error);
            });
    }, []);

    const addNewRequest = () => {
        setLoading(true)
        axios.post(`${pythonDomain}serviceLists`)
            setLoading(false);
            setNewModal(true);   
        };
    


    const viewRequests = (reqId) => {
        setLoading(true);
        setViewModal(true);
        axios.post(`${pythonDomain}updateServiceRecord?serviceRecordId=${reqId}`)
        .then(response => {
            console.log('Service Request Details:: ',response.data.requestRecord.Id)
            let reqRec = response.data.requestRecord;
                setServiceId(reqRec.Id);
                setName(reqRec.Name);
                setStatus(reqRec.Request_Status__c);
                setTitle(reqRec.Request_Title__c);
                setDescription(reqRec.Description__c);
                setLoading(false);
        }) 
        .catch(error => { 
            console.error('AwardDetails Error fetching data:', error); 
        });
    }

    const onSave = () => {
        const RequestRecordData =
            {name:name, status:status, title: title, description: description } 
        const token = localStorage.getItem('email');
        console.log('RequestRecordData:: ',JSON.stringify(RequestRecordData))
        axios.post(`${pythonDomain}newServiceRecord?requestRecord=${JSON.stringify(RequestRecordData)}`, { email: token })
            .then(response => {
                if (response.data === 'Success') {
                    toast.success(response.data);
                    axios.post(`${pythonDomain}serviceRequests`)
                        .then(response => {
                            setServiceList(response.data);
                            setNewModal(false);
                            setName('');
                            setTitle('');
                            setStatus('');
                            setDescription('');
                        })
                        .catch(error => {
                            console.error('Error fetching award details:', error);
                        });
                } else {
                    toast.error(response.data);
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.error('Error saving award:', error);
            });
    }

    const onViewModalClose = () => {
        setViewModal(false)
        setName('');
        setTitle('');
        setStatus('');
        setDescription('');
    }
    const onNewModalClose = () => {
        setNewModal(false)
        setName('');
        setTitle('');
        setStatus('');
        setDescription('');
    }

  return (
    <div>
    <center>
    <div className='ServiceBox'>
    
    <div className='PageTitle'>Service Request List</div>
    {loading && (
                <div className="spinner-container">
                    <FadeLoader color={'#000000'} loading={loading} size={100} />
                </div>
            )}
    <div className='FamilyTable' style={{width:'900px'}}>
    <table>
        <thead>
            <tr>
                <th style={{ width: '20%', textAlign: 'left' }}>Name</th>
                <th style={{ width: '25%', textAlign: 'left' }}>Request Open Date Time</th>
                <th style={{ width: '20%', textAlign: 'left' }}>Request Status</th>
                <th style={{ width: '20%', textAlign: 'left' }}>Action</th>
            </tr>
        </thead>
        <tbody>
       
        {serviceList.map((ser) => (
                            <tr key={ser.Id}>
                                <td>{ser.Name}</td>
                                <td>{ser.Request_Open_Date_Time__c}</td>
                                <td>{ser.Request_Status__c}</td>
                                <td>
            <div>
                <button type='button' className='buttonStyle' onClick={() => viewRequests(ser.Id)} style={{ marginRight: '10px' }}>
                     View
                </button>
                </div>
            </td>
            </tr>
            ))}
            
        </tbody>
        
    </table>
    </div>
    
    </div>
    </center>
    {viewmodal && (
        <div className='newFamily'>
            <div className="modal-overlay">
            <ToastContainer />
                <div className="modal">
                    <div className="modal-header">
                        <button className="close-button" onClick={onViewModalClose}>&times;</button>
                        <h3>Service Request Details</h3>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="account-details">
                                <div className="custom-select">
                                    <label htmlFor="Number">Request Id <br/>  {name}</label> 
                                </div>
                                
                                <div className="custom-select">
                                    <label htmlFor="Status">Status <br/>  {status} </label>
                                </div>
                                <div className="custom-select">
                                    <label htmlFor="Query">Query <textarea type="text"  name="Query" value={title} onChange={(e) => setTitle(e.target.value)}/></label>
                                </div>
                                <div className="custom-select">
                                    <label htmlFor="Description">Description<textarea style={{overflow:'scroll'}} type="text"  name="Description" value={description} onChange={(e) => setDescription(e.target.value)}/></label>  
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="buttonStyle" style={{ marginRight: '10px' }} onClick={onViewModalClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )}


    {newmodal && (
        <div className='newFamily'>
            <div className="modal-overlay">
            <ToastContainer />
                <div className="modal">
                    <div className="modal-header">
                        <button className="close-button" onClick={onNewModalClose}>&times;</button>
                        <h3>New Request</h3>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="account-details">
                                <div className="custom-select">
                                    <label htmlFor="Subject">Subject<input type="text"  name="Subject" value={title} onChange={(e) => setTitle(e.target.value)}/></label>   
                                </div>
                                
                                <div className="custom-select">
                                    <label htmlFor="Description">Description<textarea type="text"  name="Description" value={description} onChange={(e) => setDescription(e.target.value)}/></label>      
                                </div>
                                <div className="custom-select">
                                    <label htmlFor="Attachreceipt">Attach receipt<input type="file"  name="Attachreceipt" value={file} onChange={(e) => setFile(e.target.value)}/></label>  
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="buttonStyle" style={{ marginRight: '10px' }} onClick={onNewModalClose}>Close</button>
                        <button className="buttonStyle"  onClick={onSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )}




    <center><div className='buttonsDiv'><button type='button' className='buttonStyle' onClick={addNewRequest}>New Request</button></div></center>
    </div>
  )
    }


export default ServiceRequestTab
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Declaration.css';
import { FadeLoader  } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Declaration({appnum,decId}) {
    const pythonDomain = 'http://localhost:5000/';
    const [msgs, setmsgs] = useState();
    const [submittedDate, setsubmittedDate] = useState();
    const [signatureDec, setsignatureDec] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (decId) {
            console.log("decId", decId); 
            axios.post(`${pythonDomain}declarationMsgs?declarationId=${decId}`)
            .then(response => {
                setmsgs(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching record details:', error);
            });
        }
    }, [decId]); 
    
    

    const onSubmit = () => {
        const declarationRecordData =
            { id: appnum, submittedDate: submittedDate, signatureDec: signatureDec} 
        console.log('declarationRecordData:: ',JSON.stringify(declarationRecordData))
        axios.post(`${pythonDomain}newDeclarationRecord?applicationRecord=${JSON.stringify(declarationRecordData)}`)
            .then(response => {
                if (response.data === 'Success') {
                    toast.success(response.data);
                } else {
                    toast.error(response.data);
                }
            })
            .catch(error => {
                console.error('Error saving award:', error);
            });
    }

  return (
    <div className='Page'>
     <ToastContainer />
     {loading && (
         <div className="spinner-container">
         <FadeLoader  color={'#000000'} loading={loading} size={100} />
          </div>
                    )}
       <p>Messages: {msgs}</p>
        <div className='Title'><h3>Declaration</h3></div> 
        <p></p>
        <div className='Application'>
            <label htmlFor="Application">Application No: {appnum} </label>
        </div>
        <p></p>
        <div className='Text'>
        <p>I certify that all statements, including dates and titles of employment, made in this application for admission to the Global University are correct, and my responses are my own.</p>
        <p></p>
        <p>I authorize Global University to verify any and all information contained herein, including but not limited to dates and terms of employment, academic work and awards, letters of recommendation, and extracurricular activities. By signing below, I acknowledge that providing false or misleading information is grounds for denying admissions or for rescinding an offer of admissions already made. I realize that all documents submitted in support of this application become the property of Global University. I authorize the school to release information from this application and supporting documents to organizations sponsoring fellowships at the school, to permit by being considered for financial support.</p>
        <p></p>
        <p>I understand that upon application my contact information may be shared with select current students or alumni for the purposes of connecting to the Global University network and associated events.In place of your signature, please type your full legal name:</p>
        <p></p>
        <div>
            <label>Signature</label>
            <input type="text" required  name="Telephone" value={signatureDec} onChange={(e) => setsignatureDec(e.target.value)}></input>   
        </div>
        <div>
            <label htmlFor="SubmittedDate">Date</label>
            <input type="date" name="Telephone" value={submittedDate} onChange={(e) => setsubmittedDate(e.target.value)}></input>
        </div>
        <p></p>
        <p></p>
        <div ><button className='Buttonssty' type='submit' onClick={onSubmit}>Submit</button></div>
        </div>

    </div>
    
    
  )
}

export default Declaration

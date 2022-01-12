import { useRef } from "react"
import Reimbursement from "../models/reimbursements";

export default function ReimbursementForm(props: {updateReimbursementTable: Function}) {

    const files = [];
    const amountInput = useRef(null);
    const reasonInput = useRef(null);
    const filesUploaded = useRef(null);
    
    function readFileUploads(event) {
        console.log(event.target.files);
        const fileUploads = event.target.files;
        for (const file of fileUploads) {
            files.push(file);
        }

        console.log(files);
    }

    async function sendReimbursement() {
        
        const reimbursement: Reimbursement = {
            amount: amountInput.current?.valueAsNumber,
            comment: reasonInput.current?.value,
            receipts: files
        }

        const response = await fetch("http://localhost:4444/reimbursements", {
            method: "POST",
            body: JSON.stringify(reimbursement),
            headers: {"Content-Type": "application/json"}
        });

        if (response.status !== 201) {
            const message = response.body;
            console.log(message);
            alert(`ERROR: ${response}`);
        }
        else {
            alert("Reimbursement was successfully submitted.");
            props.updateReimbursementTable(reimbursement);
        }
    }

    return(
        <>
            <h2><u>Submit a Reimbursement Request</u></h2>

            <label htmlFor="reimbursementAmount">Indicate <b>the total reimbursement amount</b> for all receipts to be attached to this request:</label>
            <br /><br />
            <input ref={amountInput} type="number" placeholder="Enter total amount" />
            <br /><br /><br />

            <label htmlFor="reimbursementReason">Provide a succinct explanation for the reimbursement:</label
            ><br /><br />
            <textarea ref={reasonInput} cols={50} rows={3} placeholder="Enter reason for reimbursement" />
            <br /><br /><br />
            
            <label htmlFor="myReceipt">Supply the necessary receipt copies to attach onto this request:</label>
            <br /><br />
            <input id="fileSelector" ref={filesUploaded} type="file" multiple={true} onChange={readFileUploads}/>
            <br /><br /><br />
            
            <label htmlFor="myReceipt">Review the information you provided above and click the following button to submit this request:</label>
            <br /><br />
            <button onClick={sendReimbursement}>Submit Request</button>
        </>
    )
}
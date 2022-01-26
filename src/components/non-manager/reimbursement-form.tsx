import { useRef } from "react"
import { useSelector } from "react-redux";
import Reimbursement from "../../DTOs/reimbursement";
import { UserState } from "../../sessionStore";

export default function ReimbursementForm(props: {updateReimbursementTable: Function}) {

    const user = useSelector((state: UserState) => state);
    const files = [];
    const amountInput = useRef(null);
    const reasonInput = useRef(null);
    const filesUploaded = useRef(null);
    
    function readFileUploads(event) {
        files.splice(0);
        console.log(event.target.files);
        const fileUploads = event.target.files;
        for (const file of fileUploads) {
            files.push(file);
        }

        console.log(files);
    }

    async function sendReimbursement() {
        
        const reimbursement: Reimbursement = {
            employeeId: user.employeeId,
            lastName: user.lastName,
            firstName: user.firstName,
            description: reasonInput.current?.value,
            receipts: files,
            amount: amountInput.current?.valueAsNumber
        };

        const response = await fetch("http://localhost:4444/reimbursements",
            {
                method: "POST",
                body: JSON.stringify(reimbursement),
                headers: { "Content-Type": "application/json" }
            }
        );

        if (response.status !== 201) {
            alert(`ERROR: ${await response.text()}`);
        }
        else {
            alert("Reimbursement was successfully submitted.");
            resetForm();
            props.updateReimbursementTable(await response.json());
        }
    }

    function resetForm() {
        amountInput.current.value = null;
        reasonInput.current.value = null;
        filesUploaded.current.value = null;
    }

    return(
        <>
            <h2><u>Submit a Reimbursement Request</u></h2>
            
            <label><b>Reimbursement Description</b></label><br /><br />
            <textarea ref={reasonInput} cols={75} rows={5} placeholder="Provide a brief explanation of the need for this request"/>
            <br /><br /><br />
            
            <label><b>Attach Receipts</b> (uploading multiple receipts to this request is allowed)</label>
            <br /><br />
            <input id="fileSelector" ref={filesUploaded} type="file" multiple={true} onChange={readFileUploads}/>
            <br /><br /><br />

            <label><b>Total Reimbursement Amount</b> (the total amount of all receipts to be attached to this request)</label>
            <br /><br />
            <label>$ </label><input ref={amountInput} type="number" min={0.00} placeholder="0.00" />
            <br /><br /><br />

            <label htmlFor="myReceipt"><b>REVIEW</b> the information you provided above <b>BEFORE</b> submitting this request</label>            <br /><br />
            <button onClick={sendReimbursement}>Submit Request</button>
            <br /><br />
        </>
    )
}
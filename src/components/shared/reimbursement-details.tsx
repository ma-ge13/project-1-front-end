import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Reimbursement from "../../DTOs/reimbursement";
import { UserState } from "../../sessionStore";

export default function ReimbursementDetails() {

    const isManager = useSelector((state: UserState) => state.isManager);
    const { reimbursementId } = useParams();
    const [reimbursement, setReimbursement] = useState<Reimbursement>();
    const navigateTo = useNavigate();
    const commentInput = useRef(null);

    function createDownloadLink(receipt: string): JSX.Element {
        const arr = receipt.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        const blob = new Blob([u8arr], { type: mime });
        const url = window.URL.createObjectURL(blob);

        return <a href={url} download={`File.${blob.type.substring(blob.type.indexOf("/") + 1)}`}>Download</a>
    }

    const receiptURLs = [];
    if (!_.isEmpty(reimbursement)) {
        for (const receipt of reimbursement.receipts) {
            receiptURLs.push(createDownloadLink(receipt).props.download);
        }
    }
    console.log("Receipt URL array: ", receiptURLs[0], _.isEmpty(receiptURLs));
  
    async function approveReimbursement() {
      const updateReimbursement: Reimbursement = { ...reimbursement };
      
      commentInput && (updateReimbursement.comment = commentInput.current.value);
      updateReimbursement.status = "Approved";

      const response = await fetch("https://ponzi-bank.azurewebsites.net/reimbursements/update",
          {
              method: "PUT",
              body: JSON.stringify(updateReimbursement),
              headers: { "Content-Type": "application/json" }
          }
        )
        if (response.status === 200) {
            alert("Reimbursement status was successfully updated to 'Approved'.");
            navigateTo("/manager");
        }
    }

    async function denyReimbursement() {
        const updateReimbursement: Reimbursement = { ...reimbursement };
        
        commentInput && (updateReimbursement.comment = commentInput.current.value);
        updateReimbursement.status = "Denied";

        const response = await fetch("https://ponzi-bank.azurewebsites.net/reimbursements/update",
        {
            method: "PUT",
            body: JSON.stringify(updateReimbursement),
            headers: { "Content-Type": "application/json" },
        }
        );

        if(response.status === 200) {
            alert("Reimbursement status was successfully updated to 'Denied'.");
            navigateTo("/manager");
        }
    }
    
    function returnToReimbursements() {
        isManager ? navigateTo("/manager") : navigateTo("/non-manager");
    }

    useEffect(() => {
        (async () => {
            const response = await fetch(`https://ponzi-bank.azurewebsites.net/reimbursements/${reimbursementId}`);

            setReimbursement(await response.json());
        })();
    }, [reimbursementId]);

    return (
        <>
            {reimbursement ? (
                <>
                    <button onClick={returnToReimbursements}>
                        Return to Reimbursement Records
                    </button>
                    
                    <br /><br />
                    
                    <table style={{ borderSpacing: "25px" }}>
                        <tbody>
                            <tr>
                                <td>
                                    Date Submitted: 
                                </td>
                                
                                <td>
                                    {new Date(reimbursement.submittalTime).toLocaleString()}
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    Amount Requested: 
                                </td>
                                
                                <td>
                                    {
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        }).format(reimbursement.amount)
                                    }
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    Description: 
                                </td>
                                
                                <td>
                                    {reimbursement.description}
                                </td>
                            </tr>
                            
                            {!_.isEmpty(receiptURLs) &&
                                (
                                    <tr>
                                        <td>
                                            Receipts:
                                        </td>

                                        <td>
                                            {receiptURLs[0]}
                                        </td>
                                    </tr>
                                )
                            }
                            
                            <tr>
                                <td>
                                    Request Status: 
                                </td>
                                
                                <td>
                                    {reimbursement.status}
                                </td>
                            </tr>

                            {reimbursement.comment && (
                                <tr>
                                    <td>
                                        Comment: 
                                    </td>

                                    <td>
                                        {reimbursement.comment}
                                    </td>
                                </tr>
                            )}
                            
                            {reimbursement.resolutionTime && (
                                <tr>
                                    <td>
                                        Date Concluded: 
                                    </td>
                                
                                    <td>
                                        {new Date(reimbursement.resolutionTime).toLocaleString()}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {isManager &&
                        <>
                            <h3><b><u>Comments</u></b></h3>
                            <br />
                                <textarea ref={commentInput} cols={75} rows={5} placeholder="Provide the reason(s) for updating this reimbursement request" />
                            
                            <table style={{ borderSpacing: "50px" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: "center" }}>
                                            <button onClick={approveReimbursement}>Approve</button>
                                        </td>
                                    
                                        <td style={{ textAlign: "center" }}>
                                            <button onClick={denyReimbursement}>Deny</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    }
                </>
            ) :
                
                null
        }
      </>
    );
}
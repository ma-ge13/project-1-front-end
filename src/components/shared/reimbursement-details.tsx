import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Reimbursement from "../../DTOs/reimbursement";
import { UserState } from "../../sessionStore";
import ReceiptsList from "../shared/reimbursement-receipts-list";

export default function ReimbursementDetails() {

    const isManager = useSelector((state: UserState) => state.isManager);
    const { reimbursementId } = useParams();
    const [reimbursement, setReimbursement] = useState<Reimbursement>();
    const navigateTo = useNavigate();
    // reimbursement.receipts.forEach(r => <ReceiptsList receipt={r} />);
    
  
  async function approveReimbursement() {
      const updateReimbursement: Reimbursement = { ...reimbursement };
      
      updateReimbursement.status = "Approved";

      const response = await fetch("http://localhost:4444/reimbursements/update",
          {
              method: "PUT",
              body: JSON.stringify(updateReimbursement),
              headers: { "Content-Type": "application/json" }
          }
      )

    if(response.status === 200) {
        alert("Reimbursement status was successfully updated to 'Approve'.");
        navigateTo("/manager");
      };
  }

  async function denyReimbursement() {
    const updateReimbursement: Reimbursement = { ...reimbursement };
    
    updateReimbursement.status = "Denied";

    const response = await fetch("http://localhost:4444/reimbursements/update",
      {
        method: "PUT",
        body: JSON.stringify(updateReimbursement),
        headers: { "Content-Type": "application/json" },
      }
    );

    if(response.status === 200) {
        alert("Reimbursement status was successfully updated to 'Deny'.");
        navigateTo("/manager");
    }
  }
    
    function returnToReimbursements() {
        isManager ? navigateTo("/manager") : navigateTo("/non-manager");
    }

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:4444/reimbursements/${reimbursementId}`);

            setReimbursement(await response.json());
        })();
    }, []);

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
                            
                            {/* <tr>
                                            <td>Receipts: </td>
                                            <td>{reimbursement.receipts}</td>
                                        </tr> */}
                            
                            <tr>
                                <td>
                                    Request Status: 
                                </td>
                                
                                <td>
                                    {reimbursement.status}
                                </td>
                            </tr>
                            
                            {reimbursement.resolutionTime && (
                                <tr>
                                    <td>
                                        Request Resolved: 
                                    </td>
                                
                                <td>
                                    {new Date(reimbursement.resolutionTime).toLocaleString()}
                                </td>
                            </tr>
                            )}

                            {isManager &&
                                <tr>
                                    <td style={{ textAlign: "center" }}>
                                        <button onClick={approveReimbursement}>Approve</button>
                                    </td>
                                
                                    <td style={{ textAlign: "center" }}>
                                        <button onClick={denyReimbursement}>Deny</button>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </>
            ) :
                
                null
        }
      </>
    );
}
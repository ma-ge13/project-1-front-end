import Reimbursement from "../../DTOs/reimbursements";
import ReceiptsList from "./reimbursement-receipts-list";

export default function ReimbursementRecordsRow(props: {reimbursement: Reimbursement, isManager: boolean, updateFunction?: Function}) {
    
    const reimbursementReceiptsList = props.reimbursement.receipts.map(r => <ReceiptsList key={Math.random()} receipt={r} />)
    
    async function approveReimbursement() {
        const reimbursement: Reimbursement = { ...props.reimbursement };
        
        reimbursement.status = "Approved";

        const response = await fetch("http://localhost:4444/reimbursements/update",
            {
                method: "PUT",
                body: JSON.stringify(reimbursement),
                headers: { "Content-Type": "application/json" }
            }
        )

      if(response.status === 200) {
          alert("Reimbursement status was successfully updated to 'Approve'.");
          props.updateFunction();
      }
    }

    async function denyReimbursement() {
      const reimbursement: Reimbursement = { ...props.reimbursement };
      
      reimbursement.status = "Denied";

      const response = await fetch("http://localhost:4444/reimbursements/update",
        {
          method: "PUT",
          body: JSON.stringify(reimbursement),
          headers: { "Content-Type": "application/json" },
        }
      );

      if(response.status === 200) {
          alert("Reimbursement status was successfully updated to 'Deny'.");
          props.updateFunction();
      }
    }

    return (
        <tr>
            <td style={{ textAlign: "center" }}>
                {
                    (
                        new Date(props.reimbursement.submittalTime!)
                    ).toLocaleString()
                }
            </td>
            
            {props.isManager &&
                <td style={{ textAlign: "center" }}>
                    <ul>
                        {reimbursementReceiptsList}
                    </ul>
                </td>}

            <td style={{ textAlign: "center" }}>
                {
                    (
                        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
                    ).format(props.reimbursement.amount)
                }
            </td>

            <td style={{ textAlign: "center" }}>
                {
                    props.reimbursement.description
                }
            </td>

            {props.isManager ?
                <td style={{ textAlign: "center" }}>
                    <button onClick={approveReimbursement}>Approve</button>
                </td> :

                <td>
                {
                    props.reimbursement.status
                }
                </td>
            }

            {props.isManager ?
                <td style={{ textAlign: "center" }}>
                    <button onClick={denyReimbursement}>Deny</button>
                </td> :

                <td style={{ textAlign: "center" }}>
                    <button>Details</button>
                </td>
            }
        </tr>
    )
}
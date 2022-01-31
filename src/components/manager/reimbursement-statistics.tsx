import { useNavigate } from "react-router-dom"

export default function ReimbursementStatistics() {

    // const [approvedReimbursements, updateApprovedReimbursements] = useState<Reimbursement[]>([]);
    const navigateTo = useNavigate();

    function returnToPendingReimbursements() {
        navigateTo("/manager");
    }

    return (
        <>
            <button onClick={returnToPendingReimbursements}>
                Return to Pending Reimbursements
            </button>
            <br /><br />

            <h2><u>Reimbursement Statistics</u></h2>
            <br />

            
                    <p>The average amount reimbursed is $517.10.</p>
                    <br />
                    
                    <p>The greatest amount reimbursed was to Mary A. Richman for $349.82.</p>
                    <br />
                    
                    <p>The least amount reimbursed was to Mary A. Richman for 167.28.</p>
                    <br />
                
        </>
    )
}
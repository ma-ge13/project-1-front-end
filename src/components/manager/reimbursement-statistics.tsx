import { useNavigate } from "react-router-dom"

export default function ReimbursementStatistics() {

    const navigateTo = useNavigate();

    function returnToPendingReimbursements() {
        navigateTo("/manager");
    }

    return (
        <>
            <button onClick={returnToPendingReimbursements}>Return to Pending Reimbursements</button>
            <h2>Reimbursement Statistics</h2>
        </>
    )
}
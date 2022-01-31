import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Reimbursement from "../../DTOs/reimbursement";

export default function ReimbursementStatistics() {

    // const [approvedReimbursements, updateApprovedReimbursements] = useState<Reimbursement[]>([]);
    const navigateTo = useNavigate();

    function returnToPendingReimbursements() {
        navigateTo("/manager");
    }

    // function sumTotal(): number {
    //     const approvedList = { ...approvedReimbursements };
    //     let sum = 0;

    //     for (const reimbursement of approvedList) {
    //         sum += reimbursement.amount;
    //     }

    //     return sum;
    // }

    // function minReimbursement(): Reimbursement {
    //     const approvedList = { ...approvedReimbursements };
    //     let min = Number.MAX_SAFE_INTEGER;
    //     let target: Reimbursement = null;
        
    //     for (const reimbursement of approvedList) {
    //         if (reimbursement.amount < min) {
    //             min = reimbursement.amount;
    //             target = reimbursement;
    //         };
    //     }

    //     return target;
    // }

    // function maxReimbursement(): Reimbursement {
    //     const approvedList = { ...approvedReimbursements };
    //     let max = Number.MIN_SAFE_INTEGER;
    //     let target: Reimbursement = null;
        
    //     for (const reimbursement of approvedList) {
    //         if (reimbursement.amount > max) {
    //             max = reimbursement.amount;
    //             target = reimbursement;
    //         };
    //     }

    //     return target;
    // }

    // async function getApprovedReimbursements() {
    //     const response = await fetch("https://ponzi-bank.azurewebsites.net/reimbursements/approved");
        
    //     updateApprovedReimbursements(await response.json());
    // }

    // useEffect(() => {
    //     getApprovedReimbursements();
    // }, [])

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
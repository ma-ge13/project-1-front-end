import { useEffect, useState } from "react";
import Reimbursement from "../../DTOs/reimbursement";
import PendingReimbursementsTable from "./pending-reimbursements-table";

export default function ManagerReimbursementContainer() {

    const [pendingList, updatePendingList] = useState([]);
    
    async function retrievePendingReimbursements() {
        const response = await fetch("http://localhost:4444/reimbursements/pending");

        updatePendingList(await response.json());
    }

    useEffect(() => {
        retrievePendingReimbursements();
    }, []);

    return (
      <>
        <PendingReimbursementsTable
          reimbursements={pendingList}
          updateFunction={retrievePendingReimbursements}
        />
      </>
    );
}
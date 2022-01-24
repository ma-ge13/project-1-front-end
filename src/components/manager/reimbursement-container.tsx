import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PendingReimbursementsTable from "./pending-reimbursements-table";

export default function ManagerReimbursementContainer() {

  const [pendingList, updatePendingList] = useState([]);
  const navigateTo = useNavigate();

  function displayReimbursementStatistics() {
    navigateTo("statistics");
  }
  
  async function retrievePendingReimbursements() {
      const response = await fetch("http://localhost:4444/reimbursements/pending");

      updatePendingList(await response.json());
  }

  useEffect(() => {
      retrievePendingReimbursements();
  }, []);

  return (
    <>
      <button onClick={displayReimbursementStatistics}>
        Reimbursement Statistics
      </button>

      <br /><br />
      
      <PendingReimbursementsTable
        reimbursements={pendingList}
        updateFunction={retrievePendingReimbursements}
      />
    </>
  );
}
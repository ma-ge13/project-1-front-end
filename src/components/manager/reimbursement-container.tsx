import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PendingReimbursementsTable from "./pending-reimbursements-table";

export default function ManagerReimbursementContainer() {

  const [pendingList, updatePendingList] = useState([]);
  const navigateTo = useNavigate();

  function displayReimbursementStatistics() {
    navigateTo("statistics");
  }

  function endSession() {
    sessionStorage.clear();
    navigateTo("/");
  }
  
  async function retrievePendingReimbursements() {
      const response = await fetch("https://ponzi-bank.azurewebsites.net/reimbursements/pending");

      updatePendingList(await response.json());
  }

  useEffect(() => {
      retrievePendingReimbursements();
  }, []);

  return (
    <>
      <table style={{ borderSpacing: "25px" }}>
        <tbody>
          <tr>
            <td>
              <button onClick={displayReimbursementStatistics}>
                Reimbursement Statistics
              </button>
            </td>

            <td>
              <button onClick={endSession}>
                Logout
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <PendingReimbursementsTable
        reimbursements={pendingList}
        updateFunction={retrievePendingReimbursements}
      />
    </>
  );
}
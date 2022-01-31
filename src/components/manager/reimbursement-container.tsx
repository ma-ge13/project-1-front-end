import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../sessionStore";
import PendingReimbursementsTable from "./pending-reimbursements-table";

export default function ManagerReimbursementContainer() {

  const [pendingList, updatePendingList] = useState([]);
  const user = useSelector((state: UserState) => state);
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
      <h3 style={{textAlign: "center"}}>Welcome, {user.firstName}</h3>
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
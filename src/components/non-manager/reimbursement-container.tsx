import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Reimbursement from "../../DTOs/reimbursement";
import ReimbursementForm from "./reimbursement-form";
import ReimbursementRecordsTable from "./reimbursement-records-table";

export default function NonManagerReimbursementContainer() {

  const [reimbursementRecords, setReimbursementRecords] = useState<Reimbursement[]>([]);
  const navigateTo = useNavigate();

  function endSession() {
    sessionStorage.clear();
    navigateTo("/");
  }
  
  async function retrieveAllReimbursementRecords() {
    const response = await fetch("https://ponzi-bank.azurewebsites.net/reimbursements");
    
    setReimbursementRecords(await response.json());
  }

  useEffect(() => {
    retrieveAllReimbursementRecords();
  }, []);

    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>
                <button onClick={endSession}>Logout</button>
              </td>
            </tr>
          </tbody>
        </table>
        <ReimbursementRecordsTable records={reimbursementRecords} />
        <br />
        <hr />
        <ReimbursementForm
          updateReimbursementTable={retrieveAllReimbursementRecords}
        />
      </>
    );
}
import { useEffect, useState } from "react";
import Reimbursement from "../../DTOs/reimbursements";
import ReimbursementForm from "./reimbursement-form";
import ReimbursementRecordsTable from "./reimbursement-records-table";

export default function NonManagerReimbursementContainer() {

  const [reimbursementRecords, setReimbursementRecords] = useState<Reimbursement[]>([]);
  
  async function retrieveAllReimbursementRecords() {
    const response = await fetch("http://localhost:4444/reimbursements");
    
    setReimbursementRecords(await response.json());
  }

  useEffect(() => {
    retrieveAllReimbursementRecords();
  }, []);

    return (
      <>
        <ReimbursementRecordsTable records={reimbursementRecords} />
        <br />
        <hr />
        <ReimbursementForm updateReimbursementTable={retrieveAllReimbursementRecords}/>
      </>
    );
}
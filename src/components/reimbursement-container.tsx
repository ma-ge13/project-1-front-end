import { useEffect, useState } from "react";
import Reimbursement from "../models/reimbursements";
import ReimbursementForm from "./reimbursement-form";
import ReimbursementRecordsTable from "./reimbursement-table";

export default function ReimbursementContainer() {

    const [reimbursementRecords, setReimbursementRecords] = useState<Reimbursement[]>([]);
  
  async function retrieveReimbursementRecords() {
    const response = await fetch("http://localhost:4444/reimbursements");
    const records: Reimbursement[] = await response.json();
    
    setReimbursementRecords(records);
  }

  useEffect(() => {
    retrieveReimbursementRecords();
  }, []);

    return (
      <>
        <ReimbursementRecordsTable records={reimbursementRecords} />
        <br />
        <hr />
        <ReimbursementForm updateReimbursementTable={retrieveReimbursementRecords}/>
      </>
    );
}
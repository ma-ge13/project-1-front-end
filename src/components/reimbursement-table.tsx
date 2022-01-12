import Reimbursement from "../models/reimbursements";
import ReimbursementRecordsRow from "./reimbursement-row";

export default function ReimbursementRecordsTable(props: {records: Reimbursement[]}) {
    
    const recordsTableRow = props.records.map((r) => (
      <ReimbursementRecordsRow
        key={r.id}
        submittalTime={r.submittalTime}
        amount={r.amount}
        comment={r.comment}
        receipts={r.receipts}
        status={r.status}
        resolutionTime={r.resolutionTime}
      />
    ));

    return(
        <>
        <h2><u>Reimbursement Records</u></h2>
            <table style={{borderSpacing: "15px"}}>
                <thead>
                    <tr>
                        <th>Submittal Date</th>
                        <th>Reimbursement Amount</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsTableRow}
                </tbody>
            </table>
        </>
    )
}
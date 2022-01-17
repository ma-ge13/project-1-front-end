import _ from "lodash";
import Reimbursement from "../../DTOs/reimbursements";
import ReimbursementRecordsRow from "../shared/reimbursement-table-row";

export default function ReimbursementRecordsTable(props: {records: Reimbursement[]}) {
    
    const recordsTableRow = props.records.map(r => <ReimbursementRecordsRow key={r.id} reimbursement={r} isManager={false}/>);

    return (
        <>
            <h2><u>Reimbursement Records</u></h2>
            
            {_.isEmpty(props.records) ?
                <h3 style={{ textAlign: "center" }}>No reimbursement records found.</h3> :
                (
                    <table style={{ borderSpacing: "15px" }}>
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
                )
            }
        </>
    );
}
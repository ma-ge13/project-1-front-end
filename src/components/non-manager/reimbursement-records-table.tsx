import _ from "lodash";
import Reimbursement from "../../DTOs/reimbursement";
import ReimbursementRecordsRow from "../shared/reimbursement-table-row";

export default function ReimbursementRecordsTable(props: {records: Reimbursement[]}) {
    
    const recordsTableRow = props.records.map(r => <ReimbursementRecordsRow key={r.id} reimbursement={r}/>);

    return (
        <>
            <h2><u>Reimbursement Records</u></h2>
            
            {_.isEmpty(props.records) ?
                <h3 style={{ textAlign: "center" }}>No reimbursement records found.</h3> :
                (
                    <table style={{ borderSpacing: "20px" }}>
                        <thead>
                            <tr>
                                <th><u>Submittal Date</u></th>
                                <th><u>Amount Request</u></th>
                                <th><u>Status</u></th>
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
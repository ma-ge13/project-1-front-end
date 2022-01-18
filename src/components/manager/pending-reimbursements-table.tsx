import _ from "lodash"
import Reimbursement from "../../DTOs/reimbursement"
import ReimbursementRecordsRow from "../shared/reimbursement-table-row"

export default function PendingReimbursementsTable(props: {reimbursements: Reimbursement[], updateFunction: Function}) {

    const pendingReimbursementsRow = props.reimbursements.map(r => <ReimbursementRecordsRow key={r.id} reimbursement={r} isManager={true} updateFunction={props.updateFunction}/>);

    return (
        <>
            <h2><u>Pending Reimbursements</u></h2>

            {_.isEmpty(pendingReimbursementsRow) ? <h3 style={{ textAlign: "center" }}>No pending reimbursement requests.</h3> :
                (
                    <table style={{ borderSpacing: "15px" }}>
                        <thead>
                            <tr style={{textAlign: "center"}}>
                                <th>Submittal Date</th>
                                <th>Receipts</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingReimbursementsRow}
                        </tbody>
                    </table>
                )
            }
        </>
    )
}
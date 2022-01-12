import Reimbursement from "../models/reimbursements";

export default function ReimbursementRecordsRow(props: Reimbursement) {
    const formatUS = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    console.log(props.submittalTime);

    return(
        <>
            <tr>
                <td style={{textAlign: "center"}}>{(new Date(props.submittalTime!)).toLocaleString()}</td>
                <td style={{textAlign: "center"}}>{formatUS.format(props.amount)}</td>
                <td style={{textAlign: "center"}}>{props.comment}</td>
                <td style={{textAlign: "center"}}>{props.status}</td>
                <td style={{textAlign: "center"}}><button>Details</button></td>
            </tr>
        </>
    )
}
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Reimbursement from "../../DTOs/reimbursement";
import { UserState } from "../../sessionStore";
import ReceiptsList from "./reimbursement-receipts-list";

export default function ReimbursementRecordsRow(props: { reimbursement: Reimbursement, updateFunction?: Function }) {
      
  const isManager = useSelector((state: UserState) => state.isManager);  
  const reimbursementReceiptsList = props.reimbursement.receipts.map(r => <ReceiptsList key={Math.random()} receipt={r} />);
  const navigateTo = useNavigate();

  function displayReimbursementDetails() {
      navigateTo(`${props.reimbursement.id}`);
  }

  return (
    <tr>
      <td>
        {new Date(props.reimbursement.submittalTime!).toLocaleString()}
      </td>
      
      {isManager &&
        <td>
          {props.reimbursement.lastName}, {props.reimbursement.firstName}
        </td>
      }

      <td>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(props.reimbursement.amount)}
      </td>

      {!isManager &&
        <td>{props.reimbursement.status}</td>
      }

      <td style={{ textAlign: "center" }}>
        <button onClick={displayReimbursementDetails}>Details</button>
      </td>
    </tr>
  );
}
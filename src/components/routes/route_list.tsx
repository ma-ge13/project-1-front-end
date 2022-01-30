import EmployeeLogin from "../login/employee-login";
import ManagerReimbursementContainer from "../../components/manager/reimbursement-container";
import NonManagerReimbursementContainer from "../../components/non-manager/reimbursement-container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReimbursementDetails from "../../components/shared/reimbursement-details";
import ReimbursementStatistics from "../../components/manager/reimbursement-statistics";
import { Provider } from "react-redux";
import { sessionStore } from "../../sessionStore";
import ProtectedRoutes from "./route_protection";

export default function RouteList() {

    return (
        <BrowserRouter>
            <Provider store={sessionStore}>
                <Routes>
                    <Route path="/" element={<EmployeeLogin />} />

                    <Route element={<ProtectedRoutes />}>
                        <Route path="non-manager">
                            <Route path="" element={<NonManagerReimbursementContainer />} />
                            <Route path=":reimbursementId" element={<ReimbursementDetails />} />
                        </Route>

                        <Route path="manager">
                            <Route path="" element={<ManagerReimbursementContainer />} />
                            <Route path=":reimbursementId" element={<ReimbursementDetails />} />
                            <Route path="statistics" element={<ReimbursementStatistics />} />
                        </Route>
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
    );
}
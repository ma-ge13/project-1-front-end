import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { UserState } from "../../sessionStore"

export default function ProtectedRoutes() {
    const user = useSelector((state: UserState) => state);

    return (
        <>
            {user.employeeId ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}
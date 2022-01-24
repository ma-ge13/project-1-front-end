import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../../sessionStore";

export default function LoginCredentials() {

    const dispatch = useDispatch();
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);
    const navigateTo = useNavigate();

    function enterKey(event) {
        if (event.key == "Enter") {
            authenticate();
        }
    }

    async function authenticate() {
        if (!usernameInput.current.value || !passwordInput.current.value) {
            return alert("Enter a username and password.");
        }

        const response = await fetch(`http://localhost:4444/employee/?username=${usernameInput.current.value}&password=${passwordInput.current.value}`);

        if (response.status !== 200) {
            alert(`ERROR: ${await response.text()}`);
        }
        else {
            const { username, employeeId, firstName, lastName, isManager } = await response.json();
            console.log(typeof isManager, isManager);
            
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("employeeId", employeeId);
            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            sessionStorage.setItem("isManager", isManager);

            dispatch(actions.updateUser());
            
            isManager ? navigateTo("manager") : navigateTo("non-manager");
        }
    }

    return (
        <>
            <br /><br /><br /><br />
            
            <table style={{borderSpacing: "25px", marginLeft: "auto", marginRight: "auto"}}>
                <tbody>
                    <tr>
                        <td>
                            <label>Username: </label>
                            <input ref={usernameInput} type="text" onKeyPress={enterKey}/>
                        </td>
                        <td>
                            <label>Password: </label>
                            <input ref={passwordInput} type="password" onKeyPress={enterKey}/>
                        </td>
                        <td>
                            <button onClick={authenticate}>Login</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
import { useRef } from "react";

export default function LoginCredentials() {

    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    function enterKey(event) {
        if (event.keyCode = 13) {
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
        else
            alert("Login successful.")
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
                            <input ref={passwordInput} type="text" onKeyPress={enterKey}/>
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
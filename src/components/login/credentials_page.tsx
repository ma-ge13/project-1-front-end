export default function LoginCredentials() {

    return (
        <>
            <br /><br /><br /><br />
            
            <table style={{borderSpacing: "25px", marginLeft: "auto", marginRight: "auto"}}>
                <tbody>
                    <tr>
                        <td>
                            <label>Username: </label>
                            <input type="text"/>
                        </td>
                        <td>
                            <label>Password: </label>
                            <input type="text"/>
                        </td>
                        <td>
                            <button>Login</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
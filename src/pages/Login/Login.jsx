import "./Login.css"
import {Button} from "rsuite"

export default function Login() {


    return (
        <div className="background">
            <div className="rounded-lg bg-slate-100" style={{height: "25%"}}>
                    <h3>Login</h3>
                    <label>Username/Email</label>
                    <input></input>
                    <label>Password</label>
                    <input></input>
                    <Button appearance="primary" color="blue">Login</Button>
            </div>

            <div className="rounded-lg bg-slate-100" style={{height: "25%"}}>
                    <h3>Register</h3>
                    <label>Email</label>
                    <input></input>
                    <label>Username</label>
                    <input></input>
                    <label>Password</label>
                    <input></input>
                    <Button appearance="primary" color="cyan">Register</Button>
            </div>
        </div>
    )
}
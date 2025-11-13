import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserConext } from "../context/userContext";
import { useState } from "react";


export default function Login() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserConext);
    const [formdata, setFormData] = useState({
        email : "",
        password : ""
    })
    const API_URL = process.env.REACT_APP_API_BASE_URL;

    const handleChange = (e) => {
        setFormData({...formdata, [e.target.name] : e.target.value});
    }

    const handleLogin = async () => {
        try {
            const rs = await axios.post(`${API_URL}/api/v1/auth/login`, formdata);
            localStorage.setItem("token", rs.data.token);
            console.log(rs.data.token);
            console.log(rs.data.userInfo);
            setUser(rs.data.userInfo);
            navigate("/dashboard");
        }
        catch(err) {
            console.log(err);
            return err
        }
    }

    return (
        <div className="loginpage">
            <h1>Login Form</h1>
            <form>
                <label>Email</label>
                <input type="email" placeholder="Type your Email" name="email" value={formdata.email} onChange={handleChange} required />
                <label>Password</label>
                <input type="password" placeholder="Type your Password" name="password" value={formdata.password} onChange={handleChange} required />
            </form>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
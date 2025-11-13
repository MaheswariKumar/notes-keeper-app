import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import API_URL from "../config";

export default function SignUp() {
    const [formdata, setFormData] = useState({
        username : "",
        email : "",
        password : ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formdata, [e.target.name] : e.target.value})
    }

    const handleSubmit = async () => {
        try {
            const rs = await axios.post(`${API_URL}/api/v1/auth/signup`, formdata);
            console.log(rs);
            navigate("/login")
        }
        catch(err) {
            console.log(err);
            return err;
        }
    }


    return (
        <div className="signuppage">
            <h1>SignUp Form</h1>
            <form>
                <label>Username</label>
                <input type="text" placeholder="Type your username" name="username" value={formdata.username} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" placeholder="Type your Email" name="email" value={formdata.email} onChange={handleChange} required />
                <label>Password</label>
                <input type="password" placeholder="Type your password" name="password" value={formdata.password} onChange={handleChange} required />
            </form>
            <button onClick={handleSubmit}>Signup</button>
        </div>
    )
}
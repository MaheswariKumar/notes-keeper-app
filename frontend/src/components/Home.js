import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h1 className="head">Notes-Keeper-App</h1>
      <div className="auth">
        <div className="authBtns">
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("login")}>Login</button>
        </div>
      </div>
    </div>
  );
}

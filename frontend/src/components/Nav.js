import { useContext } from "react";
import { UserConext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { user } = useContext(UserConext);
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="note">
        <nav>Notes</nav>
      </div>
      <div className="pro">
        <div className="profIcon">
          <nav>{user?.userName.charAt(0)}</nav>
          <nav>{user?.userName}</nav>
        </div>
        <nav onClick={() => navigate("/")} className="logout">
          Logout
        </nav>
      </div>
    </div>
  );
}

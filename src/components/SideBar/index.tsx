import logo from "../../images/logoPrincipal.png";
import "./style.scss";
import home from "../../images/icons/home.svg";
import mail from "../../images/icons/mail.svg";
import user from "../../images/icons/user.svg";
import logout from "../../images/icons/log-out.svg";
import alert from "../../images/icons/alert.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { UserProfileType } from "../../utils/types";

export default function SideBar() {
  const authContext = useContext(AuthContext);
  const [dataUser, setDataUser] = useState<UserProfileType>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    const { isLoggedUser, loginAuthContext, userDataAuthContext } = authContext;
    setDataUser(userDataAuthContext!);
    console.log(isLoggedUser + " " + loginAuthContext);

    if (!isLoggedUser) {
      navigate("/login");
    }
  }, [authContext, navigate]);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { logoutAuthContext } = authContext;

  return (
    <aside>
      <nav>
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <ul>
          <Link className="link" to="/">
            <li>
              <img src={home} alt="Home" />
              <a href="#">Home</a>
            </li>
          </Link>
          {dataUser?.role != "bidder" && (
            <li>
              <img src={mail} alt="Mail" />
              <a
                href="https://www.microsoft.com/pt-br/microsoft-365/microsoft-teams/free"
                target="_blank"
              >
                Teams
              </a>
            </li>
          )}

          <Link className="link" to="profile">
            <li>
              <img src={user} alt="User" />
              <a href="#">Profile</a>
            </li>
          </Link>
          {dataUser?.role == "bidder" ? (
            <></>
          ) : (
            <Link className="link" to="notices">
              <li>
                <img src={alert} alt="alert icon" style={{ width: "32px" }} />
                <a href="#">Avisos</a>
              </li>
            </Link>
          )}
        </ul>
        <button onClick={logoutAuthContext}>
          <img src={logout} alt="logout" />
        </button>
      </nav>
    </aside>
  );
}

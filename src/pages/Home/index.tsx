import { useContext, useEffect, useState } from "react";
import AddContract from "../../components/AddContract";
import ButtonAdd from "../../components/ButtonAdd";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserProfileType } from "../../utils/types";
import Loader from "../../components/Loader";

export default function Home() {
  const [showAddContract, setShowAddContract] = useState(false);
  const [dataUser, setDataUser] = useState<UserProfileType>();
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const { isLoggedUser, loginAuthContext, userDataAuthContext } = authContext;
    setDataUser(userDataAuthContext!);
    console.log(isLoggedUser + " " + loginAuthContext);

    if (!isLoggedUser) {
      navigate("/login");
    }
  }, [authContext, navigate]);

  function handleShowAddContract() {
    setShowAddContract(!showAddContract);
  }

  return (
    <>
      <SideBar />

      <Header />

      {loading && <Loader />}

      {dataUser?.role == "admin" && (
        <div onClick={handleShowAddContract}>
          <ButtonAdd />
        </div>
      )}

      {showAddContract && <AddContract handle={handleShowAddContract} />}
      <Outlet />
    </>
  );
}

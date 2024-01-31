import "./styles.scss";
import Contracts from "../../components/Contracts";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ContractType, UserProfileType } from "../../utils/types";
import { API } from "../../utils/API";
import edit2 from "../../images/icons/edit2.svg";
import close from "../../images/icons/x.svg";

export default function Profile() {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState<UserProfileType>();
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const [showAddNote, setshowAddNote] = useState(false);
  const [dataForm, setDataForm] = useState({
    description: "",
  });

  useEffect(() => {
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }

    const { userDataAuthContext } = authContext;

    setUserData(userDataAuthContext!);
    console.log(userDataAuthContext);

    API.get(`/contracts?userId=${userDataAuthContext?.id}`).then((res) => {
      console.log(res.data);
      setContracts(res.data);
    });
  }, [authContext]);

  function handleShowAddNote() {
    setshowAddNote(!showAddNote);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChangeInput(e: any) {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value || "" });
    console.log(dataForm);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    const { loginAuthContext } = authContext;
    e.preventDefault();

    const obj = {
      fullName: userData.fullName,
      id: userData?.id,
      imgUrl: userData?.imgUrl,
      role: userData?.role,
      sector: userData?.sector,
      email: userData?.email,
      cpf: userData?.cpf,
      password: userData?.password,
      anotacoes: [...(userData?.anotacoes ?? ""), dataForm.description],
    };

    API.put(`/users/${userData.id}`, obj).then(() => {
      loginAuthContext(obj as UserProfileType);
      setshowAddNote(false);
    });
  }

  function handleDeleteNote(index) {
    const { loginAuthContext } = authContext;

    const newNotes = userData?.anotacoes?.filter((_note, i) => i !== index);
    const obj = {
      fullName: userData.fullName,
      id: userData?.id,
      imgUrl: userData?.imgUrl,
      role: userData?.role,
      sector: userData?.sector,
      email: userData?.email,
      cpf: userData?.cpf,
      password: userData?.password,
      anotacoes: [...newNotes],
    };

    API.put(`/users/${userData.id}`, obj).then(() => {
      loginAuthContext(obj as UserProfileType);
    });
  }

  return (
    <>
      <section className="container profile-container">
        <div className="contact-card flex-bt">
          <div className="flex-center">
            <div>
              <img src={userData?.imgUrl} className="profile"></img>
            </div>
            <div className="flex-column ml-1">
              <h2 className="name">{userData?.fullName}</h2>
              <p className="title">
                {userData?.role == "admin" ? "Gêrencia" : "Membro"}
                <span className="ml-1">{userData?.sector}</span>
              </p>

              <p className="email flex-column">
                Email:
                <a href={`mailto:olivia.wilson@${userData?.email}`}>
                  {userData?.email}
                </a>
              </p>
            </div>
          </div>
          <div className=" notes-content">
            <p className="notes">
              Anotações:{" "}
              <img onClick={handleShowAddNote} src={edit2} className="icon-5" />
            </p>
            {userData?.anotacoes?.map((anotacao, index) => {
              return (
                <div
                  className="note-content"
                  key={index}
                  onClick={() => handleDeleteNote(index)}
                >
                  <p>{anotacao}</p>
                </div>
              );
            })}
          </div>
        </div>
        {userData &&
          userData.role === "admin" &&
          (contracts.length > 0 ? (
            <Contracts title={"Últimas atualizações"} data={contracts} />
          ) : (
            <Contracts title={"Últimas atualizações"} />
          ))}
      </section>
      {showAddNote && (
        <section className=" addContract-container">
          <form
            className="addContract-content"
            onSubmit={(e) => handleSubmit(e)}
          >
            <button onClick={handleShowAddNote}>
              <img src={close} alt="close icon" className="close-icon" />
            </button>
            <div className="flex-column">
              <label>Escrever Nota</label>
              <input
                name="description"
                onChange={handleChangeInput}
                type="text"
              ></input>
            </div>
            <div className="addEvent-btn">
              <button type="submit">Escrever Nota</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

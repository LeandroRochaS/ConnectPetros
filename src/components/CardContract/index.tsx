import moneyGreen from "../../images/icons/moneyGreen.svg";
import moneyYellow from "../../images/icons/moneyYellow.svg";
import edit from "../../images/icons/edit.svg";
import info from "../../images/icons/info.svg";
import "./styles.scss";
import { useContext, useEffect, useState } from "react";
import { API } from "../../utils/API";
import { Link } from "react-router-dom";
import { ContractType, UserProfileType } from "../../utils/types";
import { AuthContext } from "../../context/AuthContext";

export default function CardContract(props: ContractType) {
  const [showEdit, setShowEdit] = useState(false);
  const [dataUser, setDataUser] = useState<UserProfileType>();
  const authContext = useContext(AuthContext);

  function handleShowEdit() {
    setShowEdit(!showEdit);
  }

  useEffect(() => {
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    const { userDataAuthContext } = authContext;
    setDataUser(userDataAuthContext!);
  }, [authContext]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("submit");

    const status = document.getElementById("status") as HTMLInputElement;

    if (!status) {
      return;
    }

    const obj = {
      status: status.value,
      id: props.id,
      description: props.description,
      date: props.date,
      title: props.title,
      userId: props.userId,
      sector: props.sector,
    };

    API.put(`/contracts/${props.id}`, obj).then(() => {
      handleShowEdit();
      window.location.reload();
    });
  }

  function handleDeleteContract() {
    API.delete(`/contracts/${props.id}`).then(() => {
      window.location.reload();
    });
  }

  return (
    <>
      {props && (
        <div className="card flex-bt">
          <div className="flex">
            <img
              className="icon mr-1"
              src={
                props.sector.split("/")[0] == "SOP" ? moneyGreen : moneyYellow
              }
            ></img>
            <div className="flex-column card-description flex-center mr-2">
              <p className="color-black">{props.title.slice(0, 30)}...</p>
              <p className="color-gray">{props.description.slice(0, 30)}... </p>
            </div>
            <div className="flex-center">
              <h5>{props.date.split("T")[0]}</h5>
            </div>
          </div>
          <div className="flex-center">
            <h5>{props.id}</h5>
          </div>
          <div>
            <h5 className="color-green status">{props.status.toUpperCase()}</h5>
          </div>
          <div className="icons">
            {dataUser?.role == "admin" && (
              <img className="icon-2" onClick={handleShowEdit} src={edit}></img>
            )}
            <Link to={`/contract/${props.id}`}>
              <img className="icon-2 " src={info}></img>
            </Link>
          </div>
        </div>
      )}

      {showEdit && (
        <section className=" addContract-container">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="addContract-content"
          >
            <div className="flex-bt">
              <h2>Atualizar Status do Processo </h2>
            </div>

            <div className="flex-column">
              <div className="flex-column">
                <label>Status do contrato</label>
                <input type="text" name="status" id="status" />
              </div>
              <div className="contract-buttons mt-3">
                <button onClick={handleShowEdit}>Cancelar</button>
                <button onClick={handleSubmit}>Atualizar</button>
                <button onClick={handleDeleteContract}>Deletar</button>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

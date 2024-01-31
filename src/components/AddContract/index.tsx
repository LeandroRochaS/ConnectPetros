import "./style.scss";
import plusBlack from "../../images/icons/plusBlack.svg";
import x from "../../images/icons/x.svg";
import { ContractType, UserProfileType } from "../../utils/types";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API } from "../../utils/API";

export default function AddContract(props: { handle: () => void }) {
  const [dataForm, setDataForm] = useState<ContractType>();
  const [userData, setUserData] = useState<UserProfileType>();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }

    const { userDataAuthContext } = authContext;
    setUserData(userDataAuthContext!);
  }, [authContext]);

  function handleShowAddContract() {
    props.handle();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChangeInput(e: any) {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value || "" });
    console.log(dataForm);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formtData = dataForm?.date?.replace("-", "/").replace("-", "/");

    const obj = {
      id: dataForm?.id,
      description: dataForm?.description,
      title: dataForm?.title,
      date: formtData,
      sector: dataForm?.sector,
      status: dataForm?.status,
      userId: userData?.id,
    };

    API.post("/contracts", obj).then(() => {
      handleShowAddContract();
      window.location.reload();
    });
  }

  return (
    <>
      <section className=" addContract-container">
        <form onSubmit={(e) => handleSubmit(e)} className="addContract-content">
          <div className="flex-bt">
            <h2>Processos Internos FORM</h2>
            <button onClick={handleShowAddContract}>
              <img src={x} alt="close icon" className="icon-3"></img>
            </button>
          </div>

          <div className="flex-column">
            <div className="flex-column">
              <label>ID do Contrato</label>
              <input
                onChange={handleChangeInput}
                type="number"
                placeholder=""
                name="id"
                id="id"
              />
            </div>
            <div className="flex-column">
              <label>Título do Contrato</label>
              <input
                onChange={handleChangeInput}
                type="text"
                name="title"
                id="title"
              />
            </div>
            <div className="flex-column">
              <label>Descrição do Contrato</label>
              <input
                onChange={handleChangeInput}
                type="text"
                name="description"
                id="description"
              />
            </div>
            <div className="flex-column">
              <label>Data</label>
              <input
                onChange={handleChangeInput}
                type="datetime-local"
                name="date"
                id="date"
              />
            </div>
            <div className="flex-column">
              <label>Setor</label>
              <select onChange={handleChangeInput} name="sector" id="sector">
                <option value="">Options</option>
                <option value="SOP/SMS">SOP/SMS</option>
                <option value="GIAD">GIAD</option>
                <option value="SOP/ALSO">SOP/ALSO</option>
                <option value="GSTD/ENPI">GSTD/ENPI</option>
                <option value="CONT">CONT</option>
                <option value="BIDDER">BIDDER</option>
              </select>
            </div>

            <div className="flex-column">
              <label>Status</label>
              <input
                onChange={handleChangeInput}
                type="text"
                name="status"
                id="status"
              />
            </div>
          </div>

          <button>
            <img className="icon-3" src={plusBlack} alt="plus" />
          </button>
        </form>
      </section>
    </>
  );
}

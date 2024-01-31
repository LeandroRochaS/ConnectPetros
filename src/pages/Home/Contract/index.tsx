import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../utils/API";
import { ContractType, UserProfileType } from "../../../utils/types";
import "./styles.scss";
import arrowLeft from "../../../images/icons/arrow-left.svg";

export default function Contract() {
  const { id } = useParams();
  const [contract, setContract] = useState<ContractType>();
  const [response, setResponse] = useState<UserProfileType>();

  useEffect(() => {
    API.get(`/contracts/${id}`).then((response) => {
      setContract(response.data);

      API.get(`/users/${response.data.userId}`).then((response) => {
        setResponse(response.data);
      });
    });

    console.log(contract);
  }, []);

  return (
    <>
      {contract ? (
        <section className="container contract-container">
          <div className="flex mb-2">
            <Link to={"/"} className="link">
              <img src={arrowLeft} className="icon-4" />
            </Link>

            <div className="flex title-container">
              <h1>Contrato #{contract?.id}</h1>
            </div>
          </div>
          <div className="mt-2">
            <p>Nome contrato</p>
            <p className="color-gray-2">{contract?.title}</p>
          </div>
          <div className="mt-2">
            <p>Descrição contrato</p>
            <p className="color-gray-2">{contract?.description}</p>
          </div>
          <div className="mt-2">
            <p>Data contrato</p>
            <p className="color-gray-2">
              {contract?.date.split("T")[0]} às {contract?.date.split("T")[1]}
            </p>
          </div>
          <div className="mt-2">
            <p>Setor contrato</p>
            <p className="color-gray-2">{contract?.sector}</p>
          </div>
          <div className="mt-2">
            <p>Status</p>
            <p className="color-green">{contract?.status?.toUpperCase()}</p>
          </div>
          <div className="mt-2 flex-column">
            <p>Responsável</p>

            <div className="flex dados-user">
              <p>ID:</p> <span color="color-gray-2">{response?.id}</span>
            </div>
            <div className="flex dados-user">
              <p>Nome:</p>{" "}
              <span color="color-gray-2">{response?.fullName}</span>
            </div>
          </div>
        </section>
      ) : (
        <h1>Contrato não encontrado</h1>
      )}
    </>
  );
}

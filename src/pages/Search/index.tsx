import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../utils/API";
import { ContractType } from "../../utils/types";
import CardContract from "../../components/CardContract";

export default function Search() {
  const { id } = useParams();
  const [contracts, setContracts] = useState<ContractType>();

  useEffect(() => {
    API.get(`/contracts/${id}`).then((response) => {
      setContracts(response.data);
    });
  }, [id]);

  return (
    <>
      <section className="container">
        {contracts && <CardContract {...contracts} />}
      </section>
    </>
  );
}

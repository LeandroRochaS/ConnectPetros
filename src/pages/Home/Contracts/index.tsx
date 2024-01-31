import { useContext, useEffect, useState } from "react";
import Contracts from "../../../components/Contracts";
import { ContractType } from "../../../utils/types";
import { API } from "../../../utils/API";
import { AuthContext } from "../../../context/AuthContext";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<ContractType[]>();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    const { userDataAuthContext } = authContext;
    console.log(userDataAuthContext?.sector);

    if (
      userDataAuthContext?.sector !== "CONT" &&
      userDataAuthContext?.sector !== "BIDDER"
    ) {
      API.get(`/contracts?q=${userDataAuthContext?.sector}`).then(
        (response) => {
          setContracts(response.data);
          console.log(response.data);
        }
      );
    } else {
      API.get(`/contracts`).then((response) => {
        setContracts(response.data);
      });
    }
  }, [authContext]);

  return <>{contracts && <Contracts title={"Contratos"} data={contracts} />}</>;
}

import "./styles.scss";
import CardContract from "../CardContract";
import { ContractType } from "../../utils/types";

interface Props {
  title: string;
  data?: ContractType[];
}

export default function Contracts(props: Props) {
  return (
    <>
      <section className="container contract-container">
        <h1>{props.title}</h1>
        <div className="cards">
          {props.data != null ? (
            props.data.map((contract) => (
              <CardContract
                key={contract.id ?? ""}
                id={contract.id ?? ""}
                title={contract.title ?? ""}
                description={contract.description ?? ""}
                date={contract.date ?? ""}
                status={contract.status ?? ""}
                userId={contract.userId ?? ""}
                sector={contract.sector ?? ""}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}

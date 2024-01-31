import "./style.scss";
import plus from "../../images/icons/plus.svg";

export default function ButtonAdd() {
  return (
    <button className="button-add">
      <img src={plus} alt="plus" />
    </button>
  );
}

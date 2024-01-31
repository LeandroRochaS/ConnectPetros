import { useNavigate } from "react-router-dom";
import searchSvg from "../../images/icons/search.svg";
import "./style.scss";
export default function Header() {
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = (
      e.currentTarget.elements.namedItem("id") as HTMLInputElement
    ).value;
    handleClearInput();
    navigate(`/search/${inputValue}`);
  }

  function handleClearInput() {
    const input = document.getElementById("id") as HTMLInputElement;
    input.value = "";
  }

  return (
    <header>
      <div className="container">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="header-input-container"
        >
          <button type="submit">
            <img src={searchSvg} alt="Search" />
          </button>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="Procurar um documento"
          />
        </form>
      </div>
    </header>
  );
}

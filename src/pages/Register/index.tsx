import { FormEvent, useState } from "react";
import "./styles.scss";
import { API } from "../../utils/API";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    sector: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
    imgUrl: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  function handelSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
      if (input.value === "") {
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });

    if (form.password !== form.confirmPassword) {
      const passwordConfirm = document.getElementById("confirmPassword");
      passwordConfirm?.classList.add("error");
      return;
    }

    setTimeout(() => {
      inputs.forEach((input) => {
        input.classList.remove("error");
      });
    }, 2000);

    let role = "";
    if (form.sector.split("0")[0].toLowerCase() === "bidder") {
      role = "bidder";
    } else {
      role = form.sector.split("0")[0] === "CONT" ? "admin" : "member";
    }

    console.log(role);

    const sector = form.sector.replace("0", "/");

    console.log(form);
    const obj = {
      fullName: form.nome,
      sector: sector,
      cpf: form.cpf,
      email: form.email,
      password: form.password,
      role: role,
      imgUrl: form.imgUrl,
    };

    console.log(obj);

    API.post("/users", obj)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <section className="register-container ">
        <div className="register-card-container">
          <img src={logo} className="logo" />
          <form
            onSubmit={(e) => handelSubmitForm(e)}
            className="form-container"
          >
            <div className="input-container  mt-1">
              <label htmlFor="nome">Nome Completo:</label>
              <input
                onChange={handleChange}
                name="nome"
                type="text"
                id="nome"
              />
            </div>
            <div className="input-container  mt-1">
              <label htmlFor="setor">Setor:</label>
              <select onChange={handleChange} name="sector" id="setor">
                <option value="">Options</option>
                <option value="SOP0SMS">SOP/SMS</option>
                <option value="GIAD">GIAD</option>
                <option value="SOP0ALSO">SOP/ALSO</option>
                <option value="GSTD0ENPI">GSTD/ENPI</option>
                <option value="CONT">CONT</option>
              </select>
            </div>
            <div className="input-container  mt-1">
              <label htmlFor="cpf">CPF:</label>
              <input onBlur={handleChange} name="cpf" type="text" id="cpf" />
            </div>
            <div className="input-container  mt-1">
              <label htmlFor="email">Email Coorporativo:</label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                id="email"
              />
            </div>
            <div className="input-container  mt-1">
              <label htmlFor="imgUrl">Foto Url:</label>
              <input
                onChange={handleChange}
                name="imgUrl"
                type="url"
                id="imgUrl"
              />
            </div>
            <div className="input-container  mt-1">
              <label htmlFor="password">Senha:</label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                autoComplete="off"
              />
            </div>
            <div className="input-container  mt-1 mb-3">
              <label htmlFor="confirmPassword">Confirmar Senha:</label>
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="mb-2 submit-button">
              Cadastrar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

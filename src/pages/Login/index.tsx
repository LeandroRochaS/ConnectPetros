import { FormEvent, useContext, useEffect, useState } from "react";
import "./styles.scss";
import { API } from "../../utils/API";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
export default function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { isLoggedUser, loginAuthContext } = authContext;
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  useEffect(() => {
    console.log(isLoggedUser + " " + loginAuthContext);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  function handelSubmitForm(e: FormEvent<HTMLFormElement>) {
    const div = document.getElementById("error-msg");
    const p = document.createElement("p");
    p.classList.add("error-msg");
    e.preventDefault();
    let erros = 0;

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
      if (input.value === "") {
        input.classList.add("error");
        erros++;

        setTimeout(() => {
          inputs.forEach((input) => {
            input.classList.remove("error");
          });
        }, 2000);
      } else {
        input.classList.remove("error");
      }
    });

    if (erros > 0) {
      return;
    } else {
      API.get(`/users/${form.id}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.password === form.password) {
            handleCleanErrrorMsg();
            loginAuthContext(response.data);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            p.textContent = "Dados inválidos";
            handleCleanErrrorMsg();
            div?.appendChild(p);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            handleCleanErrrorMsg();
            p.innerText = "Usuário não encontrado";
            div?.appendChild(p);
          }
        });
    }
  }

  function handleCleanErrrorMsg() {
    const div = document.getElementById("error-msg");
    while (div?.firstChild) {
      div.removeChild(div.firstChild);
    }
  }

  return (
    <>
      <section className=" login-container">
        <div className="login-card">
          <img src={logo} className="logo" />
          <div id="error-msg"></div>
          <form onSubmit={handelSubmitForm} className="mt-1">
            <div className="input-group mt-1">
              <label htmlFor="id">ID:</label>
              <input
                type="number"
                id="id"
                name="id"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="input-group mt-2">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <p className="esqueceuSenha mb-2">Esqueceu a senha ?</p>
            <button type="submit" className="mb-2 mt-2">
              Entrar
            </button>
          </form>
          <p className="register">
            Não tem uma conta? <a href="/register">Clique aqui</a> para se
            cadastrar.
          </p>
        </div>
      </section>
    </>
  );
}

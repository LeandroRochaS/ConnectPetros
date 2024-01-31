import "./styles.scss";
import addPlus from "../../images/icons/plus-square.svg";
import { useContext, useEffect, useState } from "react";
import close from "../../images/icons/x.svg";
import { API } from "../../utils/API";
import { AgendaType, UserProfileType } from "../../utils/types";
import { AuthContext } from "../../context/AuthContext";
import trash from "../../images/icons/trash.svg";

const cores = [
  {
    backgroundColor: "#F2F2F2",
    borderTop: "5px solid #0000003d",
  },
  {
    backgroundColor: "#D4E6F1",
    borderTop: "5px solid #87AFC7",
  },
  {
    backgroundColor: "#E8F6F3",
    borderTop: "5px solid #2ECC71",
  },
  {
    backgroundColor: "#F9EBB2",
    borderTop: "5px solid #F39C12",
  },
  {
    backgroundColor: "#EFE0D5",
    borderTop: "5px solid #D35400",
  },
];

export default function Notices() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataForm, setDataForm] = useState<any>();
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<UserProfileType>();

  const [showAddEvent, setshowAddEvent] = useState(false);
  const [agenda, setAgenda] = useState<AgendaType>();

  useEffect(() => {
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }

    const { userDataAuthContext } = authContext;
    setUser(userDataAuthContext!);
    console.log(userDataAuthContext?.sector);
    API.get(`agenda?q=${userDataAuthContext?.sector}`).then((r) => {
      setAgenda(r.data[`${userDataAuthContext?.sector}`]);
    });
  }, [authContext]);

  function handleShowAddEvent() {
    setshowAddEvent(!showAddEvent);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChangeInput(e: any) {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value || "" });
    console.log(dataForm);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    e.preventDefault();
    const sector = user?.sector;

    if (!dataForm || !sector) {
      console.error("Invalid data or sector");
      return;
    }

    const { day, title, description, time } = dataForm;

    if (!day || !title || !description || !time) {
      console.error("Incomplete data for the new event");
      return;
    }
    console.log(day);
    const updatedAgenda = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [`${sector}`]: agenda?.map((agendaDay: any) =>
        agendaDay.day === day
          ? {
              ...agendaDay,
              schedule: [
                ...agendaDay.schedule,
                {
                  time: time,
                  subject: title,
                  description: description,
                },
              ],
            }
          : agendaDay
      ),
    };

    console.log(updatedAgenda);

    API.put(`agenda?q=${sector}`, updatedAgenda).then(() => {
      window.location.reload();
    });
  }

  function handleDelete(dayIndex: number, itemIndex: number) {
    const sector = user?.sector;

    if (!agenda) {
      console.error("Agenda is undefined");
      return;
    }

    const updatedSchedule = [...agenda[dayIndex].schedule];
    updatedSchedule.splice(itemIndex, 1);

    const updatedAgenda = {
      [`${sector}`]: [
        ...agenda.slice(0, dayIndex),
        { ...agenda[dayIndex], schedule: updatedSchedule },
        ...agenda.slice(dayIndex + 1),
      ],
    };

    console.log(updatedAgenda);

    API.put(`agenda?q=${sector}`, updatedAgenda).then((r) => {
      console.log(r);
      window.location.reload();
    });
  }

  return (
    <>
      <section className="container contract-container">
        <div className="flex-bt">
          <h1>Agenda</h1>
          {user?.role == "admin" && (
            <button className="button-add-event" onClick={handleShowAddEvent}>
              <img src={addPlus} alt="Adicionar" />
            </button>
          )}
        </div>

        <div className="agenda-container mt-1">
          {agenda &&
            agenda.map((day: AgendaType, index: number) => (
              <div className="card-day" key={index}>
                <div className="title-day">
                  <h2>{day.day}</h2>
                </div>
                <div className="card-items">
                  {day.schedule.map((item, indexItem) => (
                    <div
                      key={indexItem}
                      className="card-item"
                      style={{
                        backgroundColor: cores[indexItem].backgroundColor,
                        borderTop: cores[indexItem].borderTop,
                      }}
                    >
                      <h3>{item.time}</h3>
                      <p>{item.subject}</p>
                      <p className="p-2">{item.description}</p>
                      <button
                        className="mt-2 btn-del-item"
                        onClick={() => handleDelete(index, indexItem)}
                      >
                        <img src={trash} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
      {showAddEvent && (
        <section className=" addContract-container">
          <form className="addContract-content" onSubmit={handleSubmit}>
            <button onClick={handleShowAddEvent}>
              <img src={close} alt="close icon" className="close-icon" />
            </button>
            <div className="flex-column">
              <label>Dia da semana</label>

              <select name="day" onChange={handleChangeInput}>
                <option value="">Options</option>
                <option value="Segunda-feira">Segunda-feira</option>
                <option value="Terça-feira<">Terça-feira</option>
                <option value="Quarta-feira">Quarta-feira</option>
                <option value="Quinta-feira">Quinta-feira</option>
                <option value="Sexta-feira">Sexta-feira</option>
              </select>
            </div>
            <div className="flex-column">
              <label>Título</label>

              <input
                name="title"
                onChange={handleChangeInput}
                type="text"
              ></input>
            </div>

            <div className="flex-column">
              <label>Descrição</label>

              <input
                name="description"
                onChange={handleChangeInput}
                type="text"
              ></input>
            </div>
            <div className="flex-column">
              <label>Horário</label>

              <input
                onChange={handleChangeInput}
                type="text"
                name="time"
                placeholder="00:00 - 00:00"
              ></input>
            </div>
            <div className="addEvent-btn">
              <button>Postar Aviso</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

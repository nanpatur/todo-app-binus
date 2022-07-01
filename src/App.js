import { useState } from "react";
import "./App.css";

export default function App() {
  const [selectedItem, setSelectedItem] = useState();
  const [data, setData] = useState([
    {
      id: +new Date(),
      title: "Meeting dengan Klien (Contoh)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: "2022-07-01T09:03:28.276Z",
      isCompleted: false,
    },
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("id-ID", options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addNewCollapse = new window.bootstrap.Collapse("#addNewCollapse", {
      toggle: false,
    });
    const newData = [
      ...data,
      {
        id: +new Date(),
        title: e.target.title.value,
        description: e.target.description.value,
        date: e.target.date.value,
        isCompleted: false,
      },
    ];
    setData(newData);
    e.target.reset();
    addNewCollapse.hide();
  };

  const deleteTask = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const updateTaskStatus = (id, isCompleted) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, isCompleted } : item
    );
    setData(newData);
  }

  return (
    <div
      className="container-fluid bg-secondary"
      style={{ "--bs-bg-opacity": 0.1 }}
    >
      <div
        className="d-flex justify-content-center p-5"
        style={{ height: "100vh" }}
      >
        <div className="" style={{ width: "700px" }}>
          <div className="card-body">
            <h3 className="card-title">TODO List App</h3>
            <h6 className="card-subtitle mb-5 text-muted">
              Team 5 - Web Application
            </h6>
            <div className="vstack gap-3">
              <div className="vstack gap-2">
                {data.map((item, i) => (
                  <div
                    key={i}
                    className={`shadow-sm p-3 rounded d-flex justify-content-between ${item.isCompleted ? 'bg-info' : 'bg-body'}`}
                    style={{ cursor: "pointer", "--bs-bg-opacity": item.isCompleted ? 0.2 : 1 }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      checked={item.isCompleted}
                      onChange={({ target }) => {
                        updateTaskStatus(item.id, target.checked);
                      }}
                    />
                    <div className="ms-3 me-auto">
                      <div className="fw-bold fs-5">{item.title}</div>
                      <div
                        className="text-truncate"
                        style={{ maxWidth: "600px" }}
                      >
                        {item.description}
                      </div>
                      <div className="hstack gap-2">
                        <span className="text-primary">
                          <i className="fa-solid fa-calendar-days fa-xs"></i>
                        </span>
                        <span className="text-primary fs-6">
                          {formatDate(item.date)}
                        </span>
                      </div>
                    </div>
                    <i
                      className="fa-solid fa-up-right-from-square"
                      onClick={() => setSelectedItem(item)}
                      data-bs-toggle="modal"
                      data-bs-target="#detailTaskModal"
                    ></i>
                  </div>
                ))}
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="flex-grow-1"
                  style={{
                    borderBottom: "1px solid #ccc",
                    height: "1px",
                    width: "100%",
                  }}
                ></div>
                <a
                  className="text-decoration-none text-nowrap ms-3"
                  data-bs-toggle="collapse"
                  href="#addNewCollapse"
                  aria-expanded="false"
                  aria-controls="addNewCollapse"
                >
                  <i className="fa-solid fa-plus"></i> &nbsp;Tambah Tugas
                </a>
              </div>
              <div className="collapse" id="addNewCollapse">
                <div
                  className="shadow-sm p-3 bg-body rounded"
                  style={{ cursor: "pointer" }}
                >
                  <form
                    className="needs-validation"
                    novalidate
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="title"
                        placeholder="Judul"
                        required
                      />
                    </div>
                    <div className="mb-1">
                      <textarea
                        className="form-control"
                        id="description"
                        aria-describedby="description"
                        placeholder="Deskripsi"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        aria-describedby="date"
                        required
                      />
                    </div>
                    <div>
                      <button type="reset" className="btn btn-light">
                        Reset
                      </button>
                      <button type="submit" className="btn btn-primary ms-1">
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="detailTaskModal"
        tabindex="-1"
        aria-labelledby="detailTaskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="detailTaskModalLabel">
                {selectedItem?.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">{selectedItem?.description}</div>
              <div className="hstack gap-2">
                <span className="text-primary">
                  <i className="fa-solid fa-calendar-days fa-xs"></i>
                </span>
                <span className="text-primary fs-6">
                  {formatDate(selectedItem?.date)}
                </span>
              </div>
            </div>
            <div className="modal-footer d-flex">
              <span className="text-danger">
                <i
                  className="fa-solid fa-trash-can"
                  data-bs-dismiss="modal"
                  onClick={() => deleteTask(selectedItem?.id)}
                ></i>
              </span>
              <div className="flex-grow-1"></div>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

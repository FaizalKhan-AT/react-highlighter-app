import React, { useContext, useEffect, useState } from "react";
import { UpdateAnnotWindow, UpdateLocalStorage } from "../../Store/Contexts";

function AnnotList() {
  const { list } = useContext(UpdateLocalStorage);
  const { id, fetchData, highLightWords } = useContext(UpdateAnnotWindow);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    fetchAnnotations();
  }, [id, list]);

  const fetchAnnotations = () => {
    setAnnotations(list.filter((val) => val.id === id));
    highLightWords();
  };

  let data = [];
  const handleDelete = (id) => {
    data = JSON.parse(localStorage.getItem("highlights"));
    data = data.filter((el) => el.rId !== id);
    localStorage.setItem("highlights", JSON.stringify(data));
    fetchData();
  };

  return (
    <>
      <div className="nav w-100 d-flex justify-content-center align-items-center p-3 fs-4 fw-bold">
        Annotations
      </div>
      <div className="px-2 annot-container">
        {annotations.map((val, idx) => {
          return (
            <div key={idx} className="p-2 row row-cols-3 align-items-center ">
              <div className="col-6">{val.text}</div>
              <div className="fw-bold col-5">{val.status}</div>
              <div
                className="delete-btn fs-4 fw-bold col-1 text-end"
                onClick={() => handleDelete(val.rId)}
              >
                &times;
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AnnotList;

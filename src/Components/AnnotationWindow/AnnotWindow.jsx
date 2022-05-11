import React, { useContext, useState } from "react";
import { UpdateAnnotWindow } from "../../Store/Contexts";

function AnnotWindow() {
  const { text, id, fetchData } = useContext(UpdateAnnotWindow);
  const [btnStatus, setBtnStatus] = useState("person");

  const highLightText = (e) => {
    let sub = getSelection();
    if (sub.toString().length === 0) return;
    saveToLocalStorage(sub.toString());
  };

  let records = [];
  const saveToLocalStorage = (str) => {
    if (localStorage.getItem("highlights")) {
      records = JSON.parse(localStorage.getItem("highlights"));
      records.push({ id, status: btnStatus, text: str, rId: Date.now() });
      localStorage.setItem("highlights", JSON.stringify(records));
    } else {
      records.push(...records, {
        id,
        status: btnStatus,
        text: str,
        rId: Date.now(),
      });
      localStorage.setItem("highlights", JSON.stringify(records));
    }
    fetchData();
  };

  return (
    <>
      <div className="nav d-flex align-items-center gap-3 p-3">
        <button
          className={`annot-btn btn btn-outline-light fw-bold ${
            btnStatus === "person" && "active"
          }`}
          onClick={() => setBtnStatus("person")}
        >
          PERSON <sub>1</sub>
        </button>
        <button
          className={`annot-btn btn btn-outline-light fw-bold ${
            btnStatus === "org" && "active"
          }`}
          onClick={() => setBtnStatus("org")}
        >
          ORG <sub>2</sub>
        </button>
      </div>
      <div
        className="p-3 highlight-container fs-5 w-100"
        onSelect={highLightText}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: text ? text : "" }}
      ></div>
    </>
  );
}

export default AnnotWindow;

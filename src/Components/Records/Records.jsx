import React, { useRef, useContext, useEffect } from "react";
import data from "../../data";
import { UpdateAnnotWindow } from "../../Store/Contexts";
function Records() {
  const recTabRef = useRef();
  const { setText, setId, setOrgText } = useContext(UpdateAnnotWindow);

  useEffect(() => {
    recTabRef.current.querySelector(".record-item").click();
  }, []);

  const handleTabActive = (e, text, id) => {
    const tabs = recTabRef.current.querySelectorAll(".record-item");
    tabs.forEach((tab) => {
      if (tab.classList.contains("active")) {
        tab.classList.remove("active");
      }
    });
    setText(text);
    setId(id);
    setOrgText(text);
    e.target.classList.add("active");
  };

  return (
    <>
      <div className="nav w-100 d-flex justify-content-center align-items-center p-3 fs-4 fw-bold">
        Records
      </div>
      <div ref={recTabRef} className="record-container">
        {data.map((val, idx) => {
          return (
            <div
              key={idx}
              className="py-3 px-1 fs-5 record-item"
              onClick={(e) => handleTabActive(e, val.data, val.id)}
            >
              {idx + 1}. {val.data.slice(0, 25)}...
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Records;

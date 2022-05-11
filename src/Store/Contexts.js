import { createContext, useState, useEffect } from "react";

export const UpdateAnnotWindow = createContext(null);
export const UpdateLocalStorage = createContext(null);

function Contexts({ children }) {
  const [text, setText] = useState("");
  const [id, setId] = useState();
  const [list, setList] = useState([]);
  const [orgText, setOrgText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.querySelectorAll(".high-delete").forEach((btn) => {
      btn.addEventListener("click", handleDelete);
    });
    return () => {
      document.querySelectorAll(".high-delete").forEach((btn) => {
        btn.removeEventListener("click", handleDelete);
      });
    };
  });

  const handleDelete = (e) => {
    let data = JSON.parse(localStorage.getItem("highlights"));
    data = data.filter((el) => el.rId !== +e.target.dataset.id);
    localStorage.setItem("highlights", JSON.stringify(data));
    fetchData();
  };

  const fetchData = () => {
    if (localStorage.getItem("highlights"))
      setList(JSON.parse(localStorage.getItem("highlights")));
    else return;
  };

  const highLightWords = () => {
    if (!localStorage.getItem("highlights")) return;
    let words = JSON.parse(localStorage.getItem("highlights"));
    words = words.filter((item) => item.id === id);
    let orginalText = orgText;
    words.forEach((el) => {
      orginalText = orginalText.replace(
        el.text,
        `<span class="position-relative wrapper-mark">
          <span class="position-absolute fs-5 fw-bold high-delete" data-id=${el.rId}>&times;</span>
          <mark>${el.text} &nbsp;<sub>${el.status}</sub></mark>
        </span>`
      );
    });
    setText(orginalText);
  };

  return (
    <UpdateAnnotWindow.Provider
      value={{
        text,
        setText,
        id,
        setId,
        fetchData,
        highLightWords,
        setOrgText,
      }}
    >
      <UpdateLocalStorage.Provider value={{ list, setList }}>
        {children}
      </UpdateLocalStorage.Provider>
    </UpdateAnnotWindow.Provider>
  );
}

export default Contexts;

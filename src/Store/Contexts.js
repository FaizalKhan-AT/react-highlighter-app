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
        `<mark>${el.text}  <sub>${el.status}</sub></mark>`
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

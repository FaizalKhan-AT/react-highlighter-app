import "./App.css";
import AnnotList from "./Components/AnnotationList/AnnotList";
import AnnotWindow from "./Components/AnnotationWindow/AnnotWindow";
import Records from "./Components/Records/Records";
import Contexts from "./Store/Contexts";

function App() {
  return (
    <Contexts>
      <div className="row py-3 mx-4 ">
        <div className="col-3">
          <Records />
        </div>
        <div className="col">
          <AnnotWindow />
        </div>
        <div className="col-3">
          <AnnotList />
        </div>
      </div>
    </Contexts>
  );
}

export default App;

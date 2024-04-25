import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { DataForm } from "./pages/DataForm";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import { TablaValores } from "./pages/TablaValores";

function App() {
  const [respuestas, setRespuestas] = useState();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DataForm respuestas={respuestas} setRespuestas={setRespuestas} />
            }
          />
          <Route path="/tabla" element={<TablaValores tabla={respuestas} />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

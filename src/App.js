import { useTranslation } from "react-i18next";

import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import backgroundImage from "./imgs/1C5.jpeg";

function App() {
  const { t } = useTranslation();


  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="overlay">
        <Header />
        <Body />
      </div>
      <div className="title">{t("punta-blanca")}</div>
    </div>
  );
}

export default App;

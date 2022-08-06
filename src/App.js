import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";

import "./App.css";
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
        <div className="flex-item">
          <DatePicker.RangePicker className="date-picker" />
        </div>
      </div>
      <div className="title">{t("punta-blanca")}</div>
    </div>
  );
}

export default App;

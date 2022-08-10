import { useTranslation } from "react-i18next";
import { DatePicker } from "antd";

import "./body.css";

const Body = () => {
  const { t } = useTranslation();

  return (
    <div className="body">
      <div className="date-picker-container">
        <DatePicker.RangePicker
          placeholder={[t("start-date"), t("end-date")]}
          className="date-picker"
        />
      </div>
    </div>
  );
};

export default Body;

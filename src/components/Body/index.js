import db from "../../firebase";
import { DatePicker, Select, Dropdown, Button, Card } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { collection, getDocs } from "firebase/firestore/lite";
import { t } from "i18next";

import "./body.css";

const Guests = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bedrooms, setBedrooms] = useState(1);

  return (
    <Card className="card" title={t("guests-and-bedrooms")}>
      <div className="guests-row">
        <div>{t("adults")}</div>
        <div className="slider-container">
          <div>
            <Button
              onClick={() => {
                setAdults(adults - 1);
              }}
            >
              -
            </Button>
          </div>
          <div className="counter">{`${adults}`}</div>
          <div>
            <Button
              onClick={() => {
                setAdults(adults + 1);
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="restrictions">{t("adults-restrictions")}</div>
      <div className="guests-row">
        <div>{t("children")}</div>
        <div className="slider-container">
          <div>
            <Button
              onClick={() => {
                setChildren(children - 1);
              }}
            >
              -
            </Button>
          </div>
          <div className="counter">{`${children}`}</div>
          <div>
            <Button
              onClick={() => {
                setChildren(children + 1);
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="restrictions">{t("children-restrictions")}</div>
      <div className="guests-row">
        <div>{t("bedrooms")}</div>
        <div className="slider-container">
          <div>
            <Button
              onClick={() => {
                setBedrooms(bedrooms - 1);
              }}
            >
              -
            </Button>
          </div>
          <div className="counter">{`${bedrooms}`}</div>
          <div>
            <Button
              onClick={() => {
                setBedrooms(bedrooms + 1);
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Body = () => {
  const { t } = useTranslation();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      const locations = collection(db, "locations");
      const locationSnapshot = await getDocs(locations);
      console.log(locationSnapshot);
      const result = locationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLocations(result);
    };

    getLocations();
  }, []);

  return (
    <div className="body">
      {locations.length !== 0 &&
        ((
          <Select
            className="body-item"
            defaultValue={locations[0]?.id}
            style={{ width: 200 }}
          >
            {locations.map((location) => (
              <Select.Option key={location.id} value={location.id}>
                {location.name}
              </Select.Option>
            ))}
          </Select>
        ) ||
          null)}
      <div className="date-picker-container body-item">
        <DatePicker.RangePicker
          placeholder={[t("start-date"), t("end-date")]}
          className="date-picker"
        />
      </div>
      <div className="guests body-item">
        <Dropdown overlay={() => <Guests />} placement="bottomCenter">
          <Button style={{ height: 60 }}>{t("guests")}</Button>
        </Dropdown>
      </div>

      <div className="search-container body-item">
        <Button className="search" style={{ height: 60 }}>
          {t("search")}
        </Button>
      </div>
    </div>
  );
};

export default Body;

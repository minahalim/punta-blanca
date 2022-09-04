import { t } from "i18next";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { collection, getDocs } from "firebase/firestore/lite";
import { DatePicker, Select, Dropdown, Button, Card } from "antd";

import db from "../../firebase";

import "./body.css";

var ical2json = require("ical2json");

const calData = `BEGIN:VCALENDAR
PRODID;X-RICAL-TZSOURCE=TZINFO:-//Airbnb Inc//Hosting Calendar 0.8.8//EN
CALSCALE:GREGORIAN
VERSION:2.0
BEGIN:VEVENT
DTEND;VALUE=DATE:20220820
DTSTART;VALUE=DATE:20220816
UID:1418fb94e984-8c79f32c389eb94bda0c2dba727de2dc@airbnb.com
DESCRIPTION:Reservation URL: https://www.airbnb.com/hosting/reservations/
 details/HMN43F95QS\nPhone Number (Last 4 Digits): 2656
SUMMARY:Reserved
END:VEVENT
BEGIN:VEVENT
DTEND;VALUE=DATE:20221113
DTSTART;VALUE=DATE:20221111
UID:1418fb94e984-5537a9fe57d1a3e4db504632a7c2a610@airbnb.com
DESCRIPTION:Reservation URL: https://www.airbnb.com/hosting/reservations/
 details/HM3AXCFTTC\nPhone Number (Last 4 Digits): 4367
SUMMARY:Reserved
END:VEVENT
BEGIN:VEVENT
DTEND;VALUE=DATE:20220904
DTSTART;VALUE=DATE:20220820
UID:6fec1092d3fa-4813751b0374f1458ade612fb440c43b@airbnb.com
SUMMARY:Airbnb (Not available)
END:VEVENT
BEGIN:VEVENT
DTEND;VALUE=DATE:20230820
DTSTART;VALUE=DATE:20230215
UID:6fec1092d3fa-df519e93ccc5b78ed808249e509eeb61@airbnb.com
SUMMARY:Airbnb (Not available)
END:VEVENT
END:VCALENDAR
`;
var output = ical2json.convert(calData);

const Guests = ({ details, onGuestChange }) => {
  return (
    <Card className="card" title={t("guests-and-bedrooms")}>
      <div className="guests-row">
        <div>{t("adults")}</div>
        <div className="slider-container">
          <div>
            <Button
              onClick={() => {
                onGuestChange("adults", details.adults - 1);
              }}
            >
              -
            </Button>
          </div>
          <div className="counter">{`${details.adults}`}</div>
          <div>
            <Button
              onClick={() => {
                onGuestChange("adults", details.adults + 1);
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
                onGuestChange("children", details.children - 1);
              }}
            >
              -
            </Button>
          </div>
          <div className="counter">{`${details.children}`}</div>
          <div>
            <Button
              onClick={() => {
                onGuestChange("children", details.children + 1);
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
                onGuestChange("bedrooms", details.bedrooms - 1);
              }}
            >
              -
            </Button>
          </div>
          <div className="counter">{`${details.bedrooms}`}</div>
          <div>
            <Button
              onClick={() => {
                onGuestChange("bedrooms", details.bedrooms + 1);
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
  const [reservations, setReservations] = useState([]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bedrooms, setBedrooms] = useState(1);

  useEffect(() => {
    const getLocations = async () => {
      const locations = collection(db, "locations");
      const locationSnapshot = await getDocs(locations);
      const result = locationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLocations(result);
    };

    const getReservations = async () => {
      const reservations = collection(db, "reservations");
      const reservationSnapshot = await getDocs(reservations);
      const result = reservationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReservations(result);
    };

    getLocations();
    getReservations();
  }, []);

  const handleOnGuestChange = (type, value) => {
    switch (type) {
      case "adults":
        setAdults(value);
        return;
      case "children":
        setChildren(value);
        return;
      case "bedrooms":
        setBedrooms(value);
        return;
      default:
        return;
    }
  };

  const isDisabled = (date) => {
    const disabled = output.VCALENDAR[0].VEVENT.find((event) =>
      date.isBetween(
        moment(event["DTSTART;VALUE=DATE"], "YYYY-MM-DD"),
        moment(event["DTEND;VALUE=DATE"], "YYYY-MM-DD")
      )
    );

    return disabled;
  };

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
          disabledDate={isDisabled}
        />
      </div>
      <div className="guests body-item">
        <Dropdown
          overlay={() => (
            <Guests
              onGuestChange={handleOnGuestChange}
              details={{ adults, children, bedrooms }}
            />
          )}
          placement="bottom"
        >
          <Button style={{ height: 60 }}>{t("guests")}</Button>
        </Dropdown>
      </div>

      <div className="search-container body-item">
        <Button className="search" style={{ height: 60 }}>
          {t("book")}
        </Button>
      </div>
    </div>
  );
};

export default Body;

import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from '@ant-design/icons';

import './header.css';

const Header = () => {
  const { t, i18n } = useTranslation();

  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrency = async () => {
      const result = await axios.get(
        `https://api.exchangerate.host/latest?base=${baseCurrency}`
      );

      setCurrencies(result.data.rates);
    };

    fetchCurrency();
  }, [baseCurrency]);

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const handleBaseCurrency = () => {
    setBaseCurrency('CAD');
  }

  return (
    <div className="header">
      <div className="header-item" onClick={handleLanguageChange}><GlobalOutlined className='icon' /> / {i18n.language.toUpperCase()}</div>
      <div className="header-item" onClick={handleBaseCurrency}>{baseCurrency}</div>
      {/* <div className="header-item">{t("my-account")}</div> */}
    </div>
  );
};

export default Header;

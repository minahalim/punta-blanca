import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "punta-blanca": "Punta Blanca",
      "my-account": "My account",
      "start-date": "Start date",
      "end-date": "End date",
      "guests-and-bedrooms": "Guests and Bedrooms",
      "adults-restrictions": "Ages 16 and above",
      "children-restrictions": "Ages 0-15",
      guests: "Guests",
      bedrooms: "Bedrooms",
      adults: "Adults",
      children: "Children",
      book: "Book",
    },
  },
  es: {
    translation: {
      "punta-blanca": "Punta Blanca",
      "my-account": "Mi cuenta",
      "start-date": "Fecha de inicio",
      "end-date": "Fecha final",
      "guests-and-bedrooms": "Huéspedes y Dormitorios",
      guests: "El invitado",
      bedrooms: "Dormitorios",
      adults: "Adulto",
      children: "Niños",
      book: "Reservar",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

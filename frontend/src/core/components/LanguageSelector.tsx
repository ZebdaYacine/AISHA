import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
// اللغة + العلم (Unicode Emoji)
const languages = [
  { code: "en", flag: "🇺🇸" },
  { code: "ar", flag: "🇩🇿" },
  { code: "fr", flag: "🇫🇷" },
  { code: "es", flag: "🇪🇸" },
];

export default function LanguageSelector() {
  const [selectedLang, setSelectedLang] = useState("en");

  const handleChange = (langCode: string) => {
    setSelectedLang(langCode);
    // يمكنك هنا حفظ اللغة في localStorage أو تفعيل i18n لاحقاً
    console.log("Language changed to:", langCode);
  };

  const currentLang = languages.find((lang) => lang.code === selectedLang);

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost gap-2 normal-case text-md"
      >
        <FaGlobe className="w-5 h-5" />
        <span className="text-xl">{currentLang?.flag}</span>
        <span>{currentLang?.code}</span>
      </div>
      <ul className="absolute left-1/2 top-full -translate-x-1/2 dropdown-content right-10 mt-2 p-2 shadow bg-base-100 rounded-box w-44">
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              className={`btn btn-sm w-full justify-start ${
                selectedLang === lang.code ? "btn-active" : ""
              }`}
              onClick={() => handleChange(lang.code)}
            >
              <span className="text-lg mr-2">{lang.flag}</span>
              {lang.code}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

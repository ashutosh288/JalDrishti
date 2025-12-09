
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div className="flex gap-2">
      {['en','hi','mr'].map(l=>(
        <button key={l} onClick={()=>i18n.changeLanguage(l)}
          className="px-2 py-1 bg-slate-700 text-white rounded">
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

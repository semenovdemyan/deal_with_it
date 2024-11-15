// src/components/LangToggle/LangToggle.tsx
import { useDispatch } from 'react-redux';
import { setLang } from '../../store/slices/appSlice';
import styles from './LangToggle.module.css';

interface LangToggleProps {
  lang: 'en' | 'ru';
}

export const LangToggle: React.FC<LangToggleProps> = ({ lang }) => {
  const dispatch = useDispatch();

  const langToggle = () => {
    dispatch(setLang(lang === 'ru' ? 'en' : 'ru')); // Dispatch для setLang
  };

  return (
    <div className={styles.langToggle}>
      <button onClick={langToggle}>
        {lang === 'ru' ? 'RU' : 'ENG'}
      </button>
    </div>
  );
};

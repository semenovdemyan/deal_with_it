// Header.tsx
import { FC, useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Header.module.css';

interface HeaderProps {
  lang: 'en' | 'ru';
  setLang: (value: 'en' | 'ru') => void;
  setCurrentPage: (value: 'Start' | 'Todo' | 'Notes' | 'AboutApp') => void;
}

export const Header: FC<HeaderProps> = ({ lang, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles['header-container']}>
      <button
        className={`${styles['burger-button']} ${
          isMenuOpen ? styles.open : ''
        }`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
        className={`${styles['header-buttons']} ${
          isMenuOpen ? styles.open : ''
        }`}
      >
        <nav style={{ padding: '15px' }}>
          <Button
            lang={lang}
            labelRu="Стартовая"
            labelEn="Start"
            onClick={() => setCurrentPage('Start')}
          />
          <Button
            lang={lang}
            labelRu="Список задач"
            labelEn="Todo"
            onClick={() => setCurrentPage('Todo')}
          />
          <Button
            lang={lang}
            labelRu="Заметки"
            labelEn="Notes"
            onClick={() => setCurrentPage('Notes')}
          />
          <Button
            lang={lang}
            labelRu="О приложении"
            labelEn="About App"
            onClick={() => setCurrentPage('AboutApp')}
          />
        </nav>
      </div>
    </div>
  );
};

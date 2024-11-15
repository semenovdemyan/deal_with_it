import styles from './Pages.module.css';

import viteLogo from '/vite.svg?url';
import reactLogo from '../assets/react.svg';
import tsLogo from '../assets/typescript.svg';
import reduxLogo from '../assets/redux.svg';

export function AboutApp() {
  return (
    <>
      <h1 className={`${styles.pageTitle} ${styles.centered}`}>
        <span className={`${styles.redLetter} ${styles.largeText}`}>A</span>
        bout
        <span className={`${styles.redLetter} ${styles.largeText}`}>A</span>
        pp
      </h1>
      <ul>
        <li>
          <div className={styles.logoContainer}>
            <div className={styles.logoPair}>
              <span>
                <p>React</p>
                <img src={reactLogo} className={styles.logo} alt="React logo" />
              </span>
              <span>
                <p>Vite</p>
                <img src={viteLogo} className={styles.logo} alt="Vite logo" />
              </span>
            </div>
            <div className={styles.logoPair}>
              <span>
                <p>Redux</p>
                <img src={reduxLogo} className={styles.logo} alt="Redux logo" />
              </span>
              <span>
                <p>TypeScript</p>
                <img
                  src={tsLogo}
                  className={styles.logo}
                  alt="TypeScript logo"
                />
              </span>
            </div>
          </div>
        </li>
      </ul>

      <h2 className={styles.headTwo}>
        <span className={`${styles.redLetter} ${styles.contactsTitle}`}>
          My
        </span>{' '}
        contacts
      </h2>
      <ul>
        <li>
          <a className={styles.link} href="mailto:semenovdemyan@gmail.com">
            semenovdemyan@gmail.com
          </a>
        </li>
        <li>
          <a className={styles.link} href="tel:+79996683935">
            +7 999 668-39-35
          </a>
        </li>
        <li>
          <a className={styles.link} href="https://t.me/demian_semenoff">
            Telegram
          </a>
        </li>
        <li>
          <a
            className={styles.link}
            href="https://github.com/semenovdemyan"
            target="_blank"
          >
            <span className={`${styles.redLetter} ${styles.gitHubTitle}`}>
              Git
            </span>
            Hub
          </a>
        </li>
      </ul>
    </>
  );
}

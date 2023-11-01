import React from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import styles from './Header.module.scss';

const Subheader = () => {

const location = useLocation()
const isCaesar = location.pathname === "/"
const isvigener = location.pathname === "/vigener"

  return (
    <div className={styles.subheader}>
      <div className={styles.container}>
        <ul>
          <Link to="/">
            <li className={isCaesar ? styles.active : ""}>Метод Цезаря</li>
          </Link>
          <Link to="vigener">
            <li className={isvigener ? styles.active : ""}>Метод Віженера</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default Subheader;

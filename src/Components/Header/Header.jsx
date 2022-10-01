import React from "react";
import Styles from "./Header.module.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className={Styles.header}>
      🎬 Movie Store 🎥
    </span>
  );
};

export default Header;

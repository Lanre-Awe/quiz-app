import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./frontpage.module.css";
import SideMenu from "./SideMenu";

const Header = () => {
  const [show, setShow] = useState(false);
  const control = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <div
        className={show ? classes.side : `${classes.side} ${classes.closed}`}
      >
        <button onClick={control} className={classes.close}>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            className={classes.icons}
          >
            <g>
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
        </button>
        <SideMenu onClose={control} />
      </div>
      <div className={classes.titleContainer}>
        <div className={classes.burgerContainer} onClick={control}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link to="/" className={classes.titleHeader}>
          Brain-Pick
        </Link>
      </div>
    </>
  );
};

export default Header;

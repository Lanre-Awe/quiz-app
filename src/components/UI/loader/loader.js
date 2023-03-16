import classes from "./loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.box1}></div>
      <div className={classes.box2}></div>
      <div className={classes.box3}></div>
      <div className={classes.box4}></div>
      <div className={classes.box5}></div>
      <div className={classes.box6}></div>
    </div>
  );
};

export default Loader;

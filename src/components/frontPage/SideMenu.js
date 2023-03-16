import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { categoryAction } from "../../store/categorySlice";
import classes from "./frontpage.module.css";

const SideMenu = (props) => {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const dispatchHandler = (name) => {
    dispatch(categoryAction.onQuizCategory(name));
    props.onClose();
  };
  useEffect(() => {
    setError(false);
    if (categories.length < 1) {
      setError(true);
    }
  }, [categories]);

  return (
    <div className={classes.categories}>
      <h3>categories</h3>
      {!error && (
        <ul>
          {categories.map((item) => (
            <li key={item.id} onClick={() => dispatchHandler(item.name)}>
              <NavLink
                activeClassName={classes.active}
                to={`/categories/${item.name.toLowerCase()}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <div className={classes.error}>could not fetch categories!</div>
      )}
    </div>
  );
};

export default SideMenu;

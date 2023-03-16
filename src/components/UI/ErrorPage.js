import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ErrorPage = () => {
  const location = useLocation();
  return (
    <div
      style={{ width: "fit-content", margin: "20% auto", textAlign: "center" }}
    >
      <h2>An Error Occured!</h2>
      <Link to="/">
        <button
          style={{
            padding: "15px",
            border: "none",
            borderRadius: "5px",
            background: "blue",
            color: "#fff",
          }}
        >
          {" "}
          {location.pathname === "/home" ? "Reload" : "Go to Home"}
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;

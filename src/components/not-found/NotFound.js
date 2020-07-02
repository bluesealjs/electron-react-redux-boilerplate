import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ height: "100%" }}>
      <div>404 error, Page not Found</div>
      <Link className="nav-link" to="/" key="404">
        Back to Home
      </Link>
    </div>
  );
};
export default NotFound;

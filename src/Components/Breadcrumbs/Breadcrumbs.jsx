import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  // تقسيم المسار إلى أجزاء
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {/* رابط الصفحة الرئيسية */}
       
        <li className="breadcrumb-item">
          <Link className="nav-link text-decoration-underline" to="/">Home</Link>
        </li>

        {/* عرض باقي الأجزاء */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={to} className="breadcrumb-item fw-bold fst-italic ms-2 text-danger" aria-current="page">
              {value}
            </li>
          ) : (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>{value}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

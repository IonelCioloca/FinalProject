import { Link } from "react-router-dom";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <div className="breadcrumbs">
      {items.map((item, index) => (
        <span key={index}>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;

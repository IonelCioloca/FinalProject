import React from "react";
import { Link } from "react-router-dom";
const ProjectCard = ({
  id,
  continent,
  country,
  region,
  image,
  title,
  status,
  estimatedBudget,
  currentAmount,
}) => {
  const progressPercent = Math.min(
    (currentAmount / estimatedBudget) * 100,
    100
  );

  return (
    <Link to={`/projects/${id}`} className="link-lsp">
      <div className="wrap-lsp">
        <div className="location">
          <div className="m-loc">
            {continent.toUpperCase()} - {country}
          </div>
          <div className="s-loc">{region}</div>
        </div>
        <div className="ww-wrap-lsp">
          <img src={image} alt="project" />
        </div>
        <h2>{title}</h2>

        <div className="project-info">
          <span className="project-status">
            {status ? "✅ Done" : "⌛ Pending"}
          </span>
          <span className="project-budget">
            €{currentAmount.toLocaleString()} / €
            {estimatedBudget.toLocaleString()}
          </span>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

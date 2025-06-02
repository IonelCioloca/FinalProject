import React, { useEffect, useState } from "react";
import { getProjects } from "../api";
import ProjectCard from "../components/ProjectCard";
import ProjectBanner from "../components/ProjectBanner";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    void (async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    })();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredProjects = projects.filter((project) => {
    const statusMatch =
      filter === "all"
        ? true
        : filter === "done"
        ? project.status === true
        : project.status === false;

    const budgetMatch =
      budgetFilter === "all"
        ? true
        : budgetFilter === "<15000"
        ? project.estimatedBudget < 15000
        : budgetFilter === "15000-20000"
        ? project.estimatedBudget >= 15000 && project.estimatedBudget <= 20000
        : project.estimatedBudget > 20000;

    const searchMatch = project.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    return statusMatch && budgetMatch && searchMatch;
  });

  const getFilterLabel = () => {
    const statusLabel =
      filter === "all"
        ? "all statuses"
        : filter === "done"
        ? "done"
        : "pending";
    const budgetLabel =
      budgetFilter === "all"
        ? "all budgets"
        : budgetFilter === "<15000"
        ? "below €15,000"
        : budgetFilter === "15000-20000"
        ? "between €15,000–€20,000"
        : "above €20,000";

    return `${statusLabel} and ${budgetLabel}`;
  };

  return (
    <>
      <ProjectBanner />
      <section className="landing-s">
        <div className="container cstm-container-ln">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <div
                className="mb-3"
                style={{ maxWidth: "400px", margin: "0 auto" }}
              >
                <input
                  type="text"
                  className="form-control std-input"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div
                style={{
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <select
                  className="std-input md"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="done">Done</option>
                  <option value="pending">Pending</option>
                </select>

                <select
                  className="std-input md"
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                >
                  <option value="all">All Budgets</option>
                  <option value="<15000">&lt; €15,000</option>
                  <option value="15000-20000">€15,000–€20,000</option>
                  <option value=">20000">&gt; €20,000</option>
                </select>
              </div>

              <div className="subtitle-s1">
                Showing {filteredProjects.length} projects ({getFilterLabel()})
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {filteredProjects.map((project) => (
              <div className="col-lg-4 col-md-6 col-12 mb-4" key={project.id}>
                <ProjectCard
                  id={project.id}
                  continent={project.continent}
                  country={project.country}
                  region={project.region}
                  image={project.image}
                  title={project.title}
                  status={project.status}
                  estimatedBudget={project.estimatedBudget}
                  currentAmount={project.currentAmount}
                  date={project.date}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects, deleteProject } from "../api"; // <- import din api.js

const Admin = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  return (
    <section className="admin-panel">
      <div className="container">
        <h1 className="title-s1">Admin Panel</h1>
        <div className="text-end mb-3">
          <Link to="/admin/new" className="btn-s3">
            ➕ Add new project
          </Link>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Country</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.country}</td>
                  <td>{project.status ? "✅ Done" : "⌛ Pending"}</td>
                  <td>€{project.estimatedBudget.toLocaleString()}</td>
                  <td>
                    <Link to={`/admin/edit/${project.id}`} className="btn-s2">
                      Edit
                    </Link>
                    <button
                      className="btn-s2 danger"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Admin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProject } from "../api";

const AddProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    continent: "",
    region: "",
    image: "",
    description: "",
    estimatedBudget: "",
    currentAmount: "",
    status: false,
    datePublished: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.title.length < 3)
      newErrors.title = "Title must be at least 3 characters.";
    if (formData.country.length < 3)
      newErrors.country = "Country must be at least 3 characters.";
    if (formData.continent.length < 3)
      newErrors.continent = "Continent must be at least 3 characters.";
    if (formData.region.length < 3)
      newErrors.region = "Region must be at least 3 characters.";
    if (formData.description.length < 3)
      newErrors.description = "Description must be at least 3 characters.";

    if (
      isNaN(formData.estimatedBudget) ||
      Number(formData.estimatedBudget) <= 0
    ) {
      newErrors.estimatedBudget = "Estimated budget must be a positive number.";
    }

    if (isNaN(formData.currentAmount) || Number(formData.currentAmount) < 0) {
      newErrors.currentAmount = "Current amount must be 0 or more.";
    }

    if (!formData.datePublished) {
      newErrors.datePublished = "Please select a date.";
    } else {
      const selectedDate = new Date(formData.datePublished);
      const today = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(today.getFullYear() - 5);

      if (selectedDate > today || selectedDate < fiveYearsAgo) {
        newErrors.datePublished =
          "Date must be within the last 5 years and not in the future.";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const projectToAdd = {
        ...formData,
        estimatedBudget: Number(formData.estimatedBudget),
        currentAmount: Number(formData.currentAmount),
      };
      await addProject(projectToAdd);
      navigate("/admin");
    } catch (error) {
      setErrors({ form: "Something went wrong. Please try again." });
    }
  };

  return (
    <section className="admin-panel">
      <div className="container">
        <h2 className="title-s1 mb-3">➕ Add New Project</h2>
        {errors.form && (
          <div className="alert alert-danger mb-3">{errors.form}</div>
        )}

        <form onSubmit={handleSubmit} className="form-container">
          <div className="row g-3">
            {[
              { label: "Title", name: "title" },
              { label: "Country", name: "country" },
              { label: "Continent", name: "continent" },
              { label: "Region", name: "region" },
              { label: "Image URL", name: "image" },
              { label: "Description", name: "description", textarea: true },
              {
                label: "Estimated Budget (€)",
                name: "estimatedBudget",
                type: "number",
              },
              {
                label: "Current Amount (€)",
                name: "currentAmount",
                type: "number",
              },
              { label: "Date Published", name: "datePublished", type: "date" },
            ].map(({ label, name, type = "text", textarea }) => (
              <div className="col-md-6" key={name}>
                <label>{label}</label>
                {textarea ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="form-control std-input"
                    rows="3"
                    required
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="form-control std-input"
                    required
                  />
                )}
                {errors[name] && (
                  <div className="text-danger small mt-1">{errors[name]}</div>
                )}
              </div>
            ))}

            <div className="col-12">
              <label>
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />{" "}
                Mark as Done
              </label>
            </div>

            <div className="col-12">
              <button type="submit" className="btn-s3">
                ➕ Save Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProject;

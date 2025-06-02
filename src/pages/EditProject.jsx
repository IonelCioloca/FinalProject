import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../api";

const EditProject = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectById(id);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load project:", error);
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (formData.title.length < 3) newErrors.title = "At least 3 characters.";
    if (formData.country.length < 3)
      newErrors.country = "At least 3 characters.";
    if (formData.continent.length < 3)
      newErrors.continent = "At least 3 characters.";
    if (formData.region.length < 3) newErrors.region = "At least 3 characters.";
    if (formData.description.length < 3)
      newErrors.description = "At least 3 characters.";

    if (!formData.estimatedBudget || Number(formData.estimatedBudget) <= 0) {
      newErrors.estimatedBudget = "Must be a positive number.";
    }
    if (formData.currentAmount === "" || Number(formData.currentAmount) < 0) {
      newErrors.currentAmount = "Must be 0 or greater.";
    }

    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 5);

    const selectedDate = new Date(formData.datePublished);
    if (
      !formData.datePublished ||
      selectedDate > today ||
      selectedDate < minDate
    ) {
      newErrors.datePublished =
        "Date must be within last 5 years and not in the future.";
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
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const updated = {
        ...formData,
        estimatedBudget: Number(formData.estimatedBudget),
        currentAmount: Number(formData.currentAmount),
      };
      await updateProject(id, updated);
      navigate("/admin");
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  if (loading) return <div className="text-center p-5">Loading project...</div>;

  return (
    <section className="admin-panel">
      <div className="container">
        <h2 className="title-s1 mb-3">✏️ Edit Project</h2>
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
                  <div className="alert alert-danger mt-2">{errors[name]}</div>
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
                💾 Update Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProject;

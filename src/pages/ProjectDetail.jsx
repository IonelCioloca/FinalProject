import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SocialShare from "../components/SocialShare";
import Breadcrumbs from "../components/Breadcrumbs";
import AnimatedProgressBar from "../components/AnimatedProgressBar";
import { getProjectById } from "../api";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (error) {
        console.error("Failed to load project:", error);
      }
    }
    fetchProject();
  }, [id]);

  if (!project) return <div className="text-center p-5">Loading...</div>;

  return (
    <section className="news-details">
      <div className="container cstm-container-ln">
        <div className="row">
          <div className="col-12 position-relative">
            {/* Share section */}
            <SocialShare title={project.title} />
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <span className="shape"></span>
                <div className="over-ils">
                  <div className="wrap-info-ls">
                    <div className="reverse-b">
                      <Breadcrumbs
                        items={[
                          { label: "Home", to: "/" },
                          { label: `${project.title}` },
                        ]}
                      />
                    </div>
                    <div className="gen-i">
                      <span className="date">{project.datePublished}</span> -{" "}
                      <span className="reading-time">
                        <img
                          src="/clock-icon.png"
                          alt="clock"
                          className="clock-icon"
                        />
                        3 min read
                      </span>
                    </div>
                    <h1 className="title-s1">{project.title}</h1>
                    <div className="nd-slider">
                      <div className="slide">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="img-xl-details"
                        />
                        <div className="caption">
                          {project.region}, {project.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 offset-lg-3">
                <div className="over-ils">
                  <div className="content">
                    <p>{project.description}</p>

                    <div className="alg-q quote">
                      <span className="sign">"</span>
                      <div>
                        <span className="msg">
                          Empower local communities through action and
                          compassion.
                        </span>
                        <span className="name">Missio Volunteer</span>
                      </div>
                    </div>

                    <p>
                      Status:{" "}
                      <strong>
                        {project.status ? "✅ Completed" : "⌛ In progress"}
                      </strong>
                    </p>
                    <p>
                      Budget:{" "}
                      <strong>
                        €{project.estimatedBudget.toLocaleString()}
                      </strong>
                    </p>
                    {project.currentAmount !== undefined && (
                      <p>
                        Raised:{" "}
                        <strong>
                          €{project.currentAmount.toLocaleString()} (
                          {Math.round(
                            (project.currentAmount / project.estimatedBudget) *
                              100
                          )}
                          %)
                        </strong>
                      </p>
                    )}
                    {project.currentAmount !== undefined && (
                      <AnimatedProgressBar
                        current={project.currentAmount}
                        total={project.estimatedBudget}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-10 offset-lg-1 text-center">
            <hr className="cstm-hr" />
            <a href="/projects" className="btn-s3">
              ← Back to projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;

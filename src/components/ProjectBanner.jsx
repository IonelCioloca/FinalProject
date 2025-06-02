import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const ProjectBanner = () => {
  return (
    <section className="landing-s s2">
      <div className="container cstm-container-ln adj1">
        <div className="shape s4"> </div>
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="go-over">
              <h1 className="title-s1">
                Together for a Better Tomorrow: Discover the Mission Behind
                Every Missio Project
              </h1>
              <Breadcrumbs
                items={[{ label: "Home", to: "/" }, { label: "Projects" }]}
              />
              <div className="content">
                <h2>
                  From remote villages to dense urban centers, the map below
                  reveals where Missio walks alongside those in need — building
                  schools, delivering care, and restoring hope where it’s needed
                  most.
                </h2>
              </div>
              <img
                src="/wmap.jpg"
                alt="World map"
                className="img-fluid w-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectBanner;

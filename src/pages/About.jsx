import React, { useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import "aos/dist/aos.css";
import Newsletter from "../components/Newsletter";

const teamMembers = [
  {
    name: "Maria Lefevre",
    role: "Executive Director",
    email: "maria.lefevre@missio.org",
    phone: "+32 477 21 45 67",
    image: "/maria.jpg",
  },
  {
    name: "Joseph Mensah",
    role: "Programs & Outreach Manager",
    email: "joseph.mensah@missio.org",
    phone: "+32 478 33 90 12",
    image: "/joseph.png",
  },
  {
    name: "Isabelle Verhoeven",
    role: "Finance & Partnerships Coordinator",
    email: "isabelle.verhoeven@missio.org",
    phone: "+32 476 84 22 19",
    image: "/isabelle.png",
  },
];

const About = () => {
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({ duration: 800, once: true });
    });
  }, []);

  return (
    <>
      <section className="landing-s s2">
        <div className="container cstm-container-ln adj1">
          <div className="shape s4"> </div>
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="go-over">
                <h1 className="title-s1">
                  Our Mission, Your Impact:
                  <br /> About Missio
                </h1>
                <Breadcrumbs
                  items={[{ label: "Home", to: "/" }, { label: "About us" }]}
                />
                <div className="content mb-5">
                  <h2>
                    Missio is more than a name — it’s a mission born from
                    compassion, rooted in solidarity, and driven by the belief
                    that every person deserves dignity, education, and hope.
                    From rural villages to bustling cities, we partner with
                    local communities to deliver lasting impact where it's
                    needed most.
                  </h2>
                </div>
                <div className="team-section d-flex flex-wrap justify-content-center gap-4">
                  {teamMembers.map((member, index) => (
                    <div
                      className="team-card text-center p-4"
                      key={member.email}
                      data-aos="fade-up"
                      data-aos-delay={index * 150}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="team-photo mb-3"
                      />
                      <h3>{member.name}</h3>
                      <p className="role">{member.role}</p>
                      <p>
                        <strong>Email:</strong>{" "}
                        <a href={`mailto:${member.email}`}>{member.email}</a>
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        <a href={`tel:${member.phone}`}>{member.phone}</a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/HmNIQsnTT9o"
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default About;

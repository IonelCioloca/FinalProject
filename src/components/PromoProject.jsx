const PromoProject = () => {
  return (
    <section className="promo-project">
      <div className="container cstm-container-xl px-0">
        <div className="row g-0">
          <div className="col-md-6 order-2 order-md-1 text-end">
            <img
              src="/zaf.jpeg"
              alt="promo-project"
              className="img-promo-project"
              data-aos="fade-right"
            />
          </div>
          <div className="col-md-6 order-1 order-md-2">
            <div className="info-project" data-aos="fade-left">
              <img
                src="/world-map.png"
                alt="world-map"
                className="img-world-map"
              />
              <div className="info-content">
                <h3 className="title-s1">Thanks to you!</h3>
                <div className="short-content">
                  <p>
                    Together, we bring hope and change to communities worldwide.
                  </p>
                </div>
                <a href="/projects" className="btn-s1">
                  Discover our projects
                </a>
              </div>
              <div className="details-project" data-aos="fade-in">
                Clean water where there was only thirst. A safe place to learn
                where there was once silence. Nourishing food on the table, and
                essential medicine when hope seemed far away.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoProject;

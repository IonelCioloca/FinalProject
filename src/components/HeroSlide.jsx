const HeroSlide = ({ image, title, description, linkText }) => {
  return (
    <div className="slide">
      <div className={`slide-f`} style={{ backgroundImage: `url(${image})` }}>
        <div className="wrap-slide">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
          <div className="align-set">
            <div className="short-txt">
              <p>{description}</p>
            </div>
            <a href="/projects" className="btn-s3 d-inline-block">
              {linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;

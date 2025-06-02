import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const NotFound = () => {
  return (
    <section className="s-404">
      <div className="container cstm-container-ln">
        <div className="shape">&nbsp;</div>
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="go-over">
              <h1 className="title-s1">Oops...</h1>
              <Breadcrumbs
                items={[
                  { label: "Home", to: "/" },
                  { label: "Page not found" },
                ]}
              />
              <div className="content">
                <p>
                  The page you were trying to access doesn't exist (anymore).
                </p>
                <p>
                  You can return to the <Link to="/">homepage</Link> or choose
                  from the overview below.
                </p>
                <p>
                  We hope you find what you're looking for. If not, feel free to{" "}
                  <Link to="/contact">contact Missio</Link>.
                </p>
                <p>Have a great day!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

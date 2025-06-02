import { useState } from "react";
import { subscribeUser } from "../api";

const Newsletter = () => {
  const [open, setOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await subscribeUser(emailData);
      setSuccessMessage("Thank you for subscribing!");
      setEmailData({ email: "", firstName: "", lastName: "" });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <section className="newsltr">
      <div className="container cstm-container-std">
        <div className="row">
          <div className="col-12">
            <div className="newsltr-container" data-aos="zoom-in">
              <button id="toggleBtnNws" onClick={() => setOpen(!open)}>
                <span>Missio in your inbox?</span>
                <img
                  src="/arrow-down.png"
                  alt="arrow-down"
                  className="open-nws"
                  style={{ display: open ? "none" : "inline-block" }}
                />
                <img
                  src="/close.png"
                  alt="close"
                  className="close-nws"
                  style={{ display: open ? "inline-block" : "none" }}
                />
              </button>
              <div className={`form-container ${open ? "active" : ""}`}>
                <span className="message-newsltr">
                  Subscribe to receive inspiring stories, updates and
                  opportunities to make a difference.
                </span>

                {/* Success or Error messages */}
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email" className="std-label">
                      Email address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      value={emailData.email}
                      onChange={handleInput}
                      className="form-control std-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="firstName" className="std-label">
                      First name <span>(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={emailData.firstName}
                      onChange={handleInput}
                      className="form-control std-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName" className="std-label">
                      Last name <span>(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={emailData.lastName}
                      onChange={handleInput}
                      className="form-control std-input"
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

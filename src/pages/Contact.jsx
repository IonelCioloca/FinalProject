import React, { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    if (!form.agree) newErrors.agree = "You must agree to the terms.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", form);
      // Reset form or trigger success action here
    }
  };

  return (
    <>
      <section className="bnr-pg">
        <div className="container cstm-container-ln">
          <div className="shape">&nbsp;</div>
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="go-over">
                <h2 className="title-s1">Contact</h2>
                <Breadcrumbs
                  items={[{ label: "Home", to: "/" }, { label: "Contact" }]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="form-fields">
        <div className="container cstm-container-ln">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <h2>We'd love to hear from you</h2>
              <form onSubmit={handleSubmit} noValidate>
                {[
                  { label: "Your Name *", name: "name" },
                  { label: "Your Email *", name: "email", type: "email" },
                  { label: "Subject *", name: "subject" },
                ].map(({ label, name, type = "text" }) => (
                  <div className="form-group" key={name}>
                    <label className="std-label">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      className="form-control std-input"
                      placeholder={label}
                      required
                    />
                    {errors[name] && (
                      <div className="msg-validation error">{errors[name]}</div>
                    )}
                  </div>
                ))}

                <div className="form-group">
                  <label className="std-label">Your Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className="form-control std-input"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                  {errors.message && (
                    <div className="msg-validation error">{errors.message}</div>
                  )}
                </div>

                <div className="form-group input-checkbox agree">
                  <label className="txt-checkbox">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                      required
                    />
                    <span>I agree to the terms and conditions.</span>
                  </label>
                  {errors.agree && (
                    <div className="msg-validation error">{errors.agree}</div>
                  )}
                </div>

                <div className="text-center">
                  <button type="submit" className="btn-s1 mt-4">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

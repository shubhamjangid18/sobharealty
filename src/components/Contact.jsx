import { useState } from "react";
import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";
import "./Contact.css";

const initialForm = { name: "", email: "", phone: "", interest: "Apartments", message: "" };

const PROPERTY_TYPES = [
  { value: "Apartments", label: "Apartments" },
  { value: "Villas", label: "Villas" },
  { value: "Villaments", label: "Villaments" },
  { value: "Penthouses", label: "Penthouses" },
  { value: "Commercial", label: "Commercial" },
];

const fieldVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Contact() {
  const [ref, inView] = useReveal({ threshold: 0.15 });
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectOption = (value) => {
    setForm((prev) => ({ ...prev, interest: value }));
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact__bg" aria-hidden="true">
        <motion.div
          className="contact__bg-img"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="contact__bg-overlay" />
        <div className="contact__bg-grain" />
      </div>

      <div className="container contact__grid">
        {/* ── LEFT: Info ── */}
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.1em" } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Register Your Interest
          </motion.p>
          <h2>
            Let&rsquo;s discuss your
            <br /> next address.
          </h2>
          <p className="contact__lead">
            Share a few details and our sales team will reach out within one
            business day with availability, pricing and a private viewing slot.
          </p>

          <ul className="contact__details">
            {[
              { label: "Sales Office", value: "Sobha Sales Gallery, Sheikh Zayed Road, Dubai, UAE" },
              { label: "Phone", value: "+971 800 SOBHA" },
              { label: "Email", value: "enquiries@sobharealty.com" },
            ].map((item, i) => (
              <motion.li
                key={item.label}
                custom={i}
                variants={fieldVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{ x: 6 }}
                transition={{ x: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                <span>{item.label}</span>
                <p>{item.value}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── RIGHT: Form ── */}
        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          {submitted ? (
            <motion.div
              className="contact__success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                ✓
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Thank you.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Your enquiry has been received — our team will be in touch shortly.
              </motion.p>
            </motion.div>
          ) : (
            <>
              {/* Name + Phone */}
              <motion.div
                className="contact__row"
                custom={0}
                variants={fieldVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" />
                  <span className="field__line" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" required value={form.phone} onChange={handleChange} placeholder="+971 50 000 0000" />
                  <span className="field__line" />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="field"
                custom={1}
                variants={fieldVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" />
                <span className="field__line" />
              </motion.div>

              {/* Property Type — Custom Dropdown */}
              <motion.div
                className="field"
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <label>Property Type</label>
                <div
                  className={`custom-select${dropdownOpen ? " custom-select--open" : ""}`}
                  onClick={() => setDropdownOpen((o) => !o)}
                  onBlur={() => setDropdownOpen(false)}
                  tabIndex={0}
                  role="combobox"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span className="custom-select__value">{form.interest}</span>
                  <span className="custom-select__icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="field__line" />

                  {dropdownOpen && (
                    <motion.ul
                      className="custom-select__menu"
                      role="listbox"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {PROPERTY_TYPES.map((opt) => (
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={form.interest === opt.value}
                          className={`custom-select__option${form.interest === opt.value ? " custom-select__option--active" : ""}`}
                          onMouseDown={(e) => { e.preventDefault(); handleSelectOption(opt.value); }}
                        >
                          <span>{opt.label}</span>
                          {form.interest === opt.value && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </motion.div>

              {/* Message */}
              <motion.div
                className="field"
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your requirements…" />
                <span className="field__line" />
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="btn btn-solid contact__submit"
                custom={4}
                variants={fieldVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span>Submit Enquiry</span>
              </motion.button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
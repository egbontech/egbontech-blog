import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import Navbar from "@/components/general/Navbar";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

const ContactPage = () => {
  return (
    <main className="contact-container">
      <Navbar />
      <section className="contact-section">
        <Header title="Contact" />
        <div className="info-container">
          <div className="info">
            <FaEnvelope className="i" />
            <p>Email</p>
            <p>egbonemmanuel50@gmail.com</p>
          </div>
          <div className="info">
            <FaPhone className="i" />
            <p>Phone</p>
            <p>+234 7033 829 679</p>
          </div>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
};

export default ContactPage;

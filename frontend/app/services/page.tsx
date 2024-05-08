import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import Navbar from "@/components/general/Navbar";
import React from "react";

const ServicesPage = () => {
  return (
    <main className="service-container">
      <Navbar />
      <section className="services-section">
        <Header title="My services" />
        <div className="services">
          <div className="card">
            <div className="svg">
              <img src="/assets/svgs/web.svg" alt="" />
            </div>
            <div className="details">
              <p>Website Development</p>
              <p>
                I offer full-stack web development services, including front-end
                and back-end development, to create responsive and user-friendly
                websites.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="svg">
              <img src="/assets/svgs/web-app.svg" alt="" />
            </div>
            <div className="details">
              <p>Custom Web Application Development</p>
              <p>
                I develop custom web applications tailored to client&apos;s specific
                needs, such as e-commerce platforms.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="svg">
              <img src="/assets/svgs/app.svg" alt="" />
            </div>
            <div className="details">
              <p>Mobile App Development</p>
              <p>
                I offer mobile app development services for cross-platform
                solutions that run on both iOS and Android platforms.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="svg">
              <img src="/assets/svgs/maintenance.svg" alt="" />
            </div>
            <div className="details">
              <p>Website Maintenance and Support</p>
              <p>
                I offer ongoing maintenance and support services to ensure
                client&apos;s websites and applications remain up-to-date,
                secure, and optimized for performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ServicesPage;

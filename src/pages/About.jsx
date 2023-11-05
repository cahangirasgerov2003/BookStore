import React from "react";
import "../styles/about.css";
import ingress from "../assets/images/ingress.jpg";

const About = () => {
  return (
    <div className="aboutUs">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="about__bank__content">
              <h2>Our mission</h2>
              <p>
                Ingress Group LLC was found in 2019, with main focus on
                providing Digital Transformation Services. The main services we
                provide are : <br /> 1. Software Development 2. Microservice &
                DevOps Transition Support & Consulting 3. Linux System
                Infrastructure Setup & Administration 4. Network Infrastructure
                Setup & Support 5. IT Training Services
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-12 whyIngress">
            <div className="about__bank__content">
              <h2>Why Ingress Academy</h2>
              <p>
                With us, you can learn Microservices, DevOps, Ethical Hacking,
                or master the skills to develop modern FrontEnd, BackEnd or
                Mobile applications.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-12 d-flex align-items-center">
            <div className="bank__info__left bank__info">
              <p>
                To provide better training services to our customers, we always
                strive to innovate the training processes, tools and technics as
                well as invite some of the best engineers & instructors in the
                field.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-12 bank__logo__section my-3">
            <img alt="Alfresco" src={ingress}></img>
          </div>

          <div className="col-lg-4 col-12 d-flex align-items-center">
            <div className="bank__info__right bank__info">
              <p>
                What makes us successful is that we, we are offering what we
                know the best to our customers. All of our team members are
                highly technical with years of experience in the field.
              </p>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="ingress__info__bottom">
              <div className="bank__info bank__info__bottom">
                <p>
                  The IT Training Services are provided under the brand name
                  Ingress Academy. Ingress Academy quickly managed to capture
                  the attention of IT community, now we have over 30+ corporate
                  customers, including the major private companies, banks, &
                  government organisations, and hundreds of students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

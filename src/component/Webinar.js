import React from "react";
import Posts from "./posts/Posts";
import RegisterForm from "./RegisterForm";

const Webinar = () => {
  return (
    <main>
      <div className="webinar-header">
        <div className="intro-title">Forex Webinars</div>
        <div className="subtitle">
          Whether you are new to foreign exchange trading or already have some
          market experience, we believe that a solid FX trading education is
          vital to your success as a trader.
        </div>
      </div>

      <div className="posts-container">
        <div className="posts-list">
          <Posts />
        </div>
      </div>

      <div className="host-container">
        <div className="host-wrapper">
          <div className="host-intro">
            <div className="host-intro-title">
              Meet Your Host - Alistair Schultz
            </div>
            <div className="host-intro-content">
              With more than 15 years of experience covering both the FX and CFD
              markets, Alistair has extensive knowledge covering algorithmic
              trading, market analysis & an impressive educational background.
              <br />
              <br />
              As the author of ‘Essentials for Trading Students – An Overview of
              the Basics for Aspiring Traders’, which was released in 2017,
              Alistair will take any aspiring trader from the basics right
              through to advanced analytics used in institutional funds.
              <br />
              <br />
              At the core of Alistair’s teachings is the ability to help each
              trader uncover their ‘Trading DNA', helping them flourish with the
              skills and timeframes that work best for them.
            </div>
          </div>
          <div className="intro-video">
            <div className="intro-video-wrapper">
              <iframe
                title="Forex trading webinar video"
                src="https://www.youtube.com/embed/IccDSTlF4fs?playlist=IccDSTlF4fs&loop=1"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <RegisterForm />
    </main>
  );
};

export default Webinar;

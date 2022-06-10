import React from "react";
import AboutData from "../../components/About";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import AboutTeam from "../../components/AboutTeam";
import AboutPartners from "../../components/AboutPartners";

const About = () => {
    return (
        <div>
            <Header />
            <AboutData />
            <AboutTeam /> 
            <AboutPartners />
            <Footer />
        </div>
    )
}

export default About
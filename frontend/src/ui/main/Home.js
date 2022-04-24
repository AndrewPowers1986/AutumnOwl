import React from "react";
import {Gallery} from "./Gallery";

import PageHeader from "../../assets/AutumnOwl_header.svg";
import AutumnOwl_Icon from "../../assets/AutumnOwl_icon.svg";

export const Home = () => {
    const headerImage = <img id={"autumn-owl_image-header"} src={PageHeader} alt={"Autumn Owl"}/>
    const iconImage = <img id={"autumn-owl_image-icon"} src={AutumnOwl_Icon} alt={"Contact Autumn Owl on Facebook"}/>
    const facebookPageLink = "https://www.facebook.com/MyAutumnOwl";

    return (
        <>
            <section id={"autumn-owl_section"} className={"main-section"}>
                {headerImage}
            </section>
            <section id={"about-us_section"} className={"main-section"}>
                <h3 id={"about-us_section-header"} className={"section-header"}>About Us</h3>
                <p id={"about-us_passage"} className={"passage"}>
                    We are a small business operating out of our home that creates custom vinyl and print designs for
                    clothing, dishware, and whatever else you can imagine. Contact us so we can build your custom
                    project.
                </p>
            </section>
            <section id={"products_section"} className={"main-section"}>
                <h3 id={"products_section-header"} className={"section-header"}>Products</h3>
                <Gallery/>
            </section>
            <section id={"contact-us_section"} className={"main-section"}>
                <h3 id={"contact-us_section-header"} className={"section-header"}>Contact Us</h3>
                <a href={facebookPageLink}>
                    {iconImage}
                </a>
            </section>
        </>
    );
}
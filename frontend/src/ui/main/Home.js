import React from "react";

export const Home = () => {
    return (
        <>
            <section id={"autumn-owl_section"} className={"main-section"}>
                <h1 id={"autumn-owl_page-header"} className={"page-header"}>Autumn Owl</h1>
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
            </section>
            <section id={"contact-us_section"} className={"main-section"}>
                <h3 id={"contact-us_section-header"} className={"section-header"}>Contact Us</h3>
            </section>
        </>
    );
}
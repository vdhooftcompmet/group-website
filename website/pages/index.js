import React from "react";
import { Header } from "../website/components/Header";
import { SEO } from "../custom/header";
import { Navigation } from "../website/components/Navigation";
import { navigation } from "../custom/navigation";
import { About } from "../website/components/About";
import { about } from "../custom/about";
import { News } from "../website/components/News";
import { People, Alumni } from "../website/components/People";
import { people } from "../custom/people";
import { Footer } from "../website/components/Footer";
import { footer } from "../custom/footer";

export default function Home() {
    return (
        <div className="content">
            <Header seo={SEO}/>
            <Navigation 
                logo={navigation.home.logo}
                links={navigation.home.links}
            />
            <div className="content-border"/>
            <About description={about.description}/>
            <div className="content-border"/>
            <News/>
            <div className="content-border"/>
            <People people={people.people}/>
            <div className="content-border"/>
            <Alumni people={people.people}/>
            <div className="content-border"/>
            <Footer info={footer}/>
        </div>
    );
};
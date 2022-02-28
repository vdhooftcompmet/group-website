import React from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export const PersonCard = ({ profile, name, role, links  }) => {
    const url = "./people/" + name.replace(/\s/g, "_")
    var personPage = {
        icon: faQuestionCircle,
        link: url
    }
    links = [personPage].concat(links)
    return (
        <div className="person-card">
            <a href={url} className="fill-div">
                <div className="profile">
                    {!profile ?
                        (<FontAwesomeIcon icon={faUserCircle} size="3x"/>)
                        :
                        <img
                            className="img-fluid"
                            src={profile}
                            alt={name}
                        />}
                </div>
                <div className="info">
                    <div className="name">
                        {name}
                    </div>
                    <div className="role">
                        {role}    
                    </div> 
                    <div className="row contact">
                        {links.map((value, index) => 
                            <Link key={index} href={value.link}>
                                <div className="col contact-icon">
                                    <FontAwesomeIcon icon={value.icon} size="1x"/>
                                    &nbsp;
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </a>
        </div>
    )
};

export const  People = ({ people }) => {
    people = people.filter(person => person.active == true)
    var content = (
        <div>
            No people yet!
        </div>
    );
    if (people.length !== 0) {
        content = (
            <div className="d-flex flex-row flex-wrap justify-content-left">
                {people.map((value, index) => (
                    <PersonCard
                        key={index}
                        profile={value.profile}
                        name={value.name}
                        role={value.role}
                        links={value.links}
                    />
                ))}
            </div>
        )
    };
    return (
        <div 
            id="people"
            className="content-container"
        >
            <h3>
                People
            </h3>
            {content}
        </div>
    );
};

export const  Alumni = ({ people }) => {
    people = people.filter(person => person.active == false)
    var content = (
        <div>
            No people yet!
        </div>
    )
    if (people.length !== 0) {
        content = (
            <div className="d-flex flex-row flex-wrap justify-content-left">
                {people.map((value, index) => (
                    <PersonCard
                        key={index}
                        profile={value.profile}
                        name={value.name}
                        role={value.role}
                        links={value.links}
                    />
                ))}
            </div>
        )
    }
    return (
        <div 
            id="alumni"
            className="content-container"
        >
            <h3>
                Alumni
            </h3>
            {content}
        </div>
    );
};
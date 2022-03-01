import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Navigation = ({ logo, links }) => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    return (
        <div>
            <nav className="navbar navbar-light">
                <img
                    className="logo"
                    src={logo}
                    alt="group logo"
                />
                <button
                    className="menu-button"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample09"
                    aria-controls="navbarsExample09"
                    aria-expanded={!isNavCollapsed ? true : false}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <FontAwesomeIcon icon={faBars} size="2x"/>
                </button>

                <div
                    className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
                    id="navbarsExample09"
                >
                    {links.map((value, index) => (
                        <Link key={index} href={value.link}>
                            <a className="nav-link">
                                {value.title}
                            </a>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
};
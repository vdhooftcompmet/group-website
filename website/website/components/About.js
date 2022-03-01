import React from "react";

export const  About = ({ description }) => {
    return (
        <div 
            id="about"
            className="content-container"
        >
            <h3>
                About
            </h3>
            <div className="about">
                <div className="description">
                    {description.map((value, index) => (
                        <p key={index}>
                            {value}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};
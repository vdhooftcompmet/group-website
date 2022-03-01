import React from "react";
import Link from "next/link";

export const  Footer = ({ info }) => {
    return (
        <div className="content-container">
            <div className="footer">
                <small>
                    &copy;
                    2022
                    &nbsp;
                    <Link href={info.link}>
                        {info.title}
                    </Link>
                </small>
            </div>
        </div>
    );
};
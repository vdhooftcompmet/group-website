import React from "react";
import Link from "next/link";
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import entries from '../../custom/news.json';

export const NewsCard = ({ id, date, title }) => {
    return (
        <Link href={"/news/" + id}>
            <div className="mx-sm-1 my-1 news-card">
                <div className="news-card-content">
                    <div className="row px-4">
                        <div className="col-sm-1 py-2 px-1 text-center">
                            <FontAwesomeIcon icon={faNewspaper} size="2x"/>
                        </div>
                        <div className="col-sm-10">
                            <div className="news-item-row-date">
                                {date}
                            </div>
                            <div className="news-item-row-text">
                                {title}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export const News = () => {
    var content = "No news yet!"
    if (entries.length !== 0) {
        entries = entries.slice(0, 5)  // Display max 5 news items
        content = (
            <div className="d-flex flex-row flex-wrap justify-content left">
                {entries.map((value, index) => (
                    <NewsCard
                        key={index}
                        id={value.id}
                        date={value.date}
                        title={value.title}
                    />
                ))}
            </div>
        );
    };
    return (
        <div 
            id="news"
            className="content-container"
        >
            <h3>
                News
            </h3>
            {content}
            <div className="text-muted mt-2 mx-2">
                <Link href="/archive">
                    <a>
                        Older news...
                    </a>
                </Link>
            </div>
        </div>
    );
};
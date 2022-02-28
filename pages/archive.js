import React from 'react';
import Link from 'next/link';
import { Footer } from "../website/components/Footer";
import { footer } from "../custom/footer";
import entries from '../custom/news.json';

export const NewsItem = ({ id, date, title }) => {
    return (
        <Link href={"/news/" + id}>
            <div className="archive-item row">
                <div className="col-sm-2 date">
                    {date}
                </div>
                <div className="col-sm-10 title">
                    <Link href="https://github.com/vdhooftcompmet/">
                        <a>{title}</a>
                    </Link>
                </div>
            </div>
        </Link>
    )
}

export default function Archive() {
    return (
        <div className="content">
            <div className="content-container">
                <div className="my-4">
                    <div className="text-muted">
                        <Link href="../">
                            <a>Main...</a>
                        </Link>
                    </div>
                </div>
                <div className="archive-card">
                    <div className="archive">
                        <div className="d-flex flex-row flex-wrap justify-content-left">  
                            {entries.map((value, index) => (
                                <NewsItem 
                                    id={value.id}
                                    date={value.date}
                                    title={value.title}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer info={footer}/>
        </div>
    );
}
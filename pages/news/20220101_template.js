import React from 'react';
import Link from 'next/link';
import { Footer } from '../../website/components/Footer';
import { footer } from '../../custom/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faQuestionCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
export default function Item20220101_template() {
    return (
        <div className="content">
            <div className="content-container">
                <div className="my-4">
                    <div className="text-muted">
                        <Link href="../#news">
                            <a>Main...</a>
                        </Link>
                    </div>
                    <div className="text-mutedz">
                        <Link href="../archive">
                            <a>Archive...</a>
                        </Link>
                    </div>
                </div>
                <div className="message-card">
                    <div className="message">
                        <a className="title">This is a template news message</a>
                        <br/>
                        <a className="date">
                            2022-01-01
                        </a>
                        <br/>
                        <br/>
                        <a className="description">This is a template news message.</a>
                        <br/>
                    </div>
                </div>
            </div>
            <Footer info={footer}/>
        </div>
    );
}
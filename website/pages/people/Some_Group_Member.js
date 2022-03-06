import React from 'react';
import Link from 'next/link';
import { Footer } from '../../src/components/Footer';
import { footer } from '../../custom/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faQuestionCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export default function ItemSome_Group_Member_description() {
    return (
        <div className='content'>
            <div className="content-container">
                <div className="my-4">
                    <div className="text-muted">
                        <Link href="../#people">
                            <a>Main...</a>
                        </Link>
                    </div>
                </div>
                <div className="people-card">
                    <div className="people">
                        <div className="text-center">
    <FontAwesomeIcon icon={faUserCircle} size="10x"/>
</div>
                        <a className="name">Some Group Member</a>
                        <br/>
                        <a className="role">Member role</a>
                        <br/>
                        <br/>
                        <a className="description">No description available.</a>
                        <br/>
                    </div>
                </div>
            </div>
            <Footer info={footer}/>
        </div>
    );
}
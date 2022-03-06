const fs = require('fs');
const path = require('path');
const gray_matter = require('gray-matter');

const peopleFolder = 'website/custom/people';
let peopleDir = 'website/pages/people/';

function setPeopleDir (peopleDir) {
    if (!fs.existsSync(peopleDir)){
        fs.mkdirSync(peopleDir);
    } else {
        const files = fs.readdirSync(peopleDir);;
        for (const file of files) {
            fs.unlink(path.join(peopleDir, file), err => {
                if (err) throw err;
            });
        };
    };
};

function getFiles (dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var fileName = files[i]
        if (fileName.endsWith('.md')) {
            id = fileName.replace(/\.md$/, '')
            profile_name = fileName.replace(/\_description\.md$/, '\_profile\.png')
            profile = '../../config/people/' + profile_name
            var path = dir + '/' + fileName
            if (fs.statSync(path).isDirectory()) {
                getFiles(path, files_);
            } else {
                files_.push(
                    {
                        path: path,
                        id: id,
                        profile: profile,
                        profile_name: profile_name
                    }
                );
            };
        };
    };
    return files_;
};

function parseMarkdown (peopleItemPaths) {
    for (var i in peopleItemPaths) {
        const path = peopleItemPaths[i]
        const fileContents = fs.readFileSync(path.path, 'utf8') 
        const { data, content } = gray_matter(fileContents)

        var files = fs.readdirSync(peopleFolder);
        if (files.includes(path.profile_name)) {
            profile = `import profile from '${path.profile}';`
            profile_div = (
`<div className="profile text-center">
    <img
        className="img-fluid"
        src={profile.src}
        alt="${data.name}"
    />
</div>`
            )
        } else {
            profile = ""
            profile_div = (
`<div className="text-center">
    <FontAwesomeIcon icon={faUserCircle} size="10x"/>
</div>`
            )
        }

        const htmlString = (
`import React from 'react';
import Link from 'next/link';
import { Footer } from '../../src/components/Footer';
import { footer } from '../../custom/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faQuestionCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
${profile}
export default function Item${path.id}() {
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
                        ${profile_div}
                        <a className="name">${data.name}</a>
                        <br/>
                        <a className="role">${data.role}</a>
                        <br/>
                        <br/>
                        <a className="description">${content}</a>
                        <br/>
                    </div>
                </div>
            </div>
            <Footer info={footer}/>
        </div>
    );
}`
        )
        fs.writeFile("website/pages/people/" + path.id.replace(/_description/, '') + ".js", htmlString, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        }); 
    }
}

// Set output folder for news items.
setPeopleDir(peopleDir);

// Read all Markdown news items file names.
var paths = getFiles(peopleFolder);

// Parse Markdown to HTML; write out to deploy folder.
parseMarkdown(paths);

console.log("People items parsed to HTML!");
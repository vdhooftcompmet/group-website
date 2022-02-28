const fs = require('fs');
const path = require('path');
const gray_matter = require('gray-matter');

const newsFolder = 'custom/news'
let newsDir = './pages/news/'

function setNewsDir (newsDir) {
    if (!fs.existsSync(newsDir)){
        fs.mkdirSync(newsDir);
    } else {
        const files = fs.readdirSync(newsDir);;
        for (const file of files) {
            fs.unlink(path.join(newsDir, file), err => {
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
        var path = dir + '/' + fileName
        if (fs.statSync(path).isDirectory()) {
            getFiles(path, files_);
        } else {
            if (fileName.endsWith(".md")) {
                files_.push(
                    {
                        path: path,
                        id: fileName.replace(/\.md$/, '')
                    }
                );
            };
        };
    };
    return files_;
};

function parseMarkdown (newsItemPaths) {
    for (var i in newsItemPaths) {
        const path = newsItemPaths[i]
        const fileContents = fs.readFileSync(path.path, 'utf8') 
        const { data, content } = gray_matter(fileContents)

        const htmlString = (
`import React from 'react';
import Link from 'next/link';
import { Footer } from '../../website/components/Footer';
import { footer } from '../../custom/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faQuestionCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
export default function Item${path.id}() {
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
                        <a className="title">${data.title}</a>
                        <br/>
                        <a className="date">
                            ${data.date}
                        </a>
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
        fs.writeFile("pages/news/" + path.id + ".js", htmlString, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        }); 
    }
}

// Set output folder for news items.
setNewsDir(newsDir);

// Read all Markdown news items file names.
var paths = getFiles(newsFolder);

// Parse Markdown to HTML; write out to deploy folder.
parseMarkdown(paths);

console.log("News items parsed to HTML!");
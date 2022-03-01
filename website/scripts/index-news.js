const fs = require('fs');
const gray_matter = require('gray-matter');

const newsFolder = 'website/custom/news'

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
                )
            }
        }
    }
    return files_;
}

function annotateDate (newsItemPaths) {
    annotated = [];
    for (var i in newsItemPaths) {
        const path = newsItemPaths[i]
        const fileContents = fs.readFileSync(path.path, 'utf8') 
        const { data, _ } = gray_matter(fileContents)
        annotated.push(
            {
                id: path.id,
                title: data.title,
                date: data.date
            }
        )
    }
    return annotated;
}

// Read all Markdown news items file names.
var paths = getFiles(newsFolder);

// Annotate items with date from Markdown.
var newsItems = annotateDate(paths);

// Sort items.
newsItems.sort(function (a, b) { 
    return b.date.replace(/-/g, "") - a.date.replace(/-/g, ""); 
});

// Parse out to file in config.
const jsonContent = JSON.stringify(newsItems);

fs.writeFile("website/custom/news.json", jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("News path IDs saved to 'custom' folder!");
}); 
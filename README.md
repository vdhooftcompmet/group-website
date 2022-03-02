[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

We as the Van der Hooft Computational Metabolomics Group wanted to have a free, accessible, and easy to maintain website on which we could share our team, mission statement, and research. To this end, we have created [a GitHub Pages website](https://vdhooftcompmet.github.io/). Now we would like to share a template of our website with you. Go through the following sections to have a minimal group website set up in under 30 minutes.

---

## Prerequisites
- You will need to be able to [connect to GitHub through SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).
- `Node.js NPM (>=14.0)` (Optional: install inside a custom environment).

---

## Getting started on your group website

1. **Fork this repository**

    You can fork this repository or use the `Use this template` button to create a repository. `cd` into this repository.

2. **Create a separate [GitHub Pages](https://pages.github.com/) repository**

    We chose to set up this template with a remote GitHub Pages repository. This means you will have your fork (or implemented template) repository that will contain the source code for your website, and you will have a second seperate `<account_name>.github.io` GitHub Pages repository that the static build of the website will be pushed to.

3. **Run `./config.sh`** 

    The configuration script will ask for the name of your `<account_name>.github.io` repository created in step 2, which will then be added to `package.json`. Additionally, it will adjust the remotes of your repository: the `origin` remote will be redirected to your `<account_name>.github.io` repository, and a new `dev` remote will direct to the repository of the fork (or implemented template) create in step 1. You can check out these reconfigured remotes by running `git remote -v`.  

If steps 1-3 were successful, you now have everything set up for developing your own group website in the next section. 

---

## Developing your group website

4. **Run `./build.sh run`**

    Try out running the template build. This command will host a build of the template locally which you can view at [https://localhost:3000/](https://localhost:3000/). 

    At this stage, the webpage only contains filler text, which can be replaced by custom info in the next step. 

5. **Develop**
    
    Making changes to the source code of the website will immediately trigger a recompile upon saving changes, which will make changes visible in the browser (if the recompile is succesful of course). However, not all changes will be immediately visible. Since GitHub Pages only serves static websites, some pages need to be created beforehand (e.g., personal pages and news items). To prevent having to code all of these pages manually, including changing every page individually if there is a style change, we created a few scripts (you can check them out in `website/scripts`) that do this for us. All we need to do is supply the information to create pages for and put them in the correct format in the right location: 

    - **Adding a news item**
    
        Add a markdown file containing the news message and some meta data and put it in the `website/custom/news` folder. It is possible to create further sub folders (e.g., `2022`, `2023`, etc). The file can have any name as long as it has the markdown `.md` suffix. 

        The contents of the file should have the following format:

        ```
        ---
        title: "This is a template news message"
        date: "2022-01-01"
        author:
            name: "Some Author"
        ---
        This is a template news message.
        ```

        The title can be any string. The date should be in `yyyy-mm-dd` format as it is used to correctly order news messages from most to least recent. Author name can also be any string. The description (the actual news message which will be displayed on the personal page for the news item) can contain html. 

    - **Adding a personal page**

        Add a markdown file containing the personal page and some meta data and put it in the `website/custom/people` folder. The file name should follow the `<name>_description.md` format, where name is the name of the person with spaces between parts of the name as underscores (`_`). For example, `John_Doe_description.md`. 
        
        The contents of the file should have the following format:

        ```
        ---
        name: "John Doe"
        role: "Employee of the month"
        imgs: []
        ---
        No description available.
        ```
        
        You can add a profile picture to the personal page following the similar `John_Doe_profile.png` format and adding the file to the `website/custom/people` folder as well. 
        
        To make the profile show up on the home page, you should add personal information of the person you are creating a personal page for in the `website/custom/people.js` file:

        ```javascript
        import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

        import John_Doe_profile from 'people/John_Doe_profile.png';

        export const people = {
            people: [
                {
                    name: "John Doe",
                    role: "Employee of the month",
                    active: true,
                    profile: John_Doe_profile.src,
                    links: [
                        {
                            icon: faGithub,
                            link: "https://github.com/"
                        },
                        {
                            icon: faTwitter,
                            link: "https://twitter.com/"
                        },
                        {
                            icon: faLinkedin,
                            link: "https://www.linkedin.com/"
                        }
                    ]
                }
            ]
        };
        ```

        It is important that the `name` property is exactly the same as the name in the `John_Doe_description.md` file. `active` determines if the personal tile on the homepage will end up in the `People` section or the `Alumni` section.

        You can find more brand icons to include [here](https://fontawesome.com/v6/icons?s=brands).

    After adding a new news item or a personal page, you should rerun `./build.sh run` in order to see the freshly parsed markdown files. Added people to the `website/custom/people.js` file will immediately show up on your website after a recompile.

    Other items you can readily customize which also trigger a recompile:

    - **Group logo**
    
        You can add a different `logo.png` in the `website/custom/logo` folder. 

    - **Customize About section**

        Customize the about section of your group website in the `website/custom/about.js` file.

    - **Customize colors**

        The `website/custom/src/styles` contains all the styling sheets for the website. Main colours can be easily changes in the `website/custom/src/styles/_variables.scss` style sheet.

    - **Advanced: adding more sections and customizing a section**

        Note: this paragraph assumes you are familiar with JavaScript, html, and css. 

        Every section has a component file in the `website/custom/src/components` folder. To make the component show up on your website you will need to add it to the page configurations in `website/custom/src/pages` files. The homepage configuration is described in `website/custom/src/pages/index.js`. Styling of your component can be done by adding a component style sheet to the `website/custom/src/styles` folder. Import your component style sheet in `website/custom/src/styles/main.scss`. Existing components have this aforementioned setup and can be altered accordingly.

6. **Save your changes**

    Save changes to your group website source code by pushing to the `dev` remote:
    ```bash
    git add .
    git commit -m "<commit_message>"
    git push dev
    ```

---

## Deploying your group website

7. **Run `./build.sh deploy`**

    This command will trigger a deployment build. The static pages will be saved to `website/out`. The `website/out` folder is then pushed to your `<account_name>.github.io` (step 2) repository. After 5-10 minutes your website will be online at `https://<account_name>.github.io/`. 

---

## Bugs and feature requests

File individual tickets for bug reports and feature requests. 

---

## Contributing

Want to contribute to this template? Fork this repository, develop locally, and do a merge request. 
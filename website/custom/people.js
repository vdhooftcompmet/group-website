import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// This item is also used to list alumni ("active = false" denotes an alumnus)
export const people = {
    people: [
        {
            name: "Some Group Member",
            role: "Member role",
            active: true,
            profile: null,
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
        },
        {
            name: "Another Group Member",
            role: "Member role",
            active: false,
            profile: null,
            links: []
        }
    ]
};
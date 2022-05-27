import { defineStore } from "pinia";

export const useTeamStore = defineStore("teamID", {
    state: () => ({
        team: [
            {
                id: 1,
                name: "Wade Cooper",
                photo: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                office: "Regional Paradigm Technician",
                status: 1,
                isAdmin: false
            },
            {
                id: 2,
                name: "Arlene Mccoy",
                photo: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                office: "Product Directives Officer ",
                status: 3,
                isAdmin: false
            },
            {
                id: 3,
                name: "Devon Webb",
                photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
                office: "Forward Response Developer",
                status: 1,
                isAdmin: true
            },
            {
                id: 4,
                name: "Tom Cook",
                photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                office: "Central Security Manager",
                status: 4,
                isAdmin: true
            },
            {
                id: 5,
                name: "Tanya Fox",
                photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                office: "Lead Implementation Liaison",
                status: 4,
                isAdmin: false
            },
            {
                id: 6,
                name: "Hellen Schmidt",
                photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                office: "Internal Applications Engineer",
                status: 2,
                isAdmin: false
            },
            {
                id: 7,
                name: "Caroline Schultz",
                photo: "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                office: "Internal Applications Engineer",
                status: 4,
                isAdmin: false
            },
            {
                id: 8,
                name: "Mason Heaney",
                photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                office: "Central Security Guard",
                status: 2,
                isAdmin: true
            },
            {
                id: 9,
                name: "Claudie Smitham",
                photo: "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                office: "Regional Paradigm Manager",
                status: 2,
                isAdmin: false
            },
            {
                id: 10,
                name: "Emil Schaefer",
                photo: "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                office: "Internal Applications Engineer",
                status: 2,
                isAdmin: false
            },
            {
                id: 11,
                name: "John Strickland",
                photo: "https://tailwindui.com/img/justin-profile.jpg",
                office: "Internal Applications Engineer",
                status: 2,
                isAdmin: true
            }
        ]
    })
});

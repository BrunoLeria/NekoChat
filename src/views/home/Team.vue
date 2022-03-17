<script setup>
    let team = [
        {
            id: 1,
            name: "Jane Cooper",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Regional Paradigm Technician",
            status: "Online",
            isAdmin: false
        },
        {
            id: 2,
            name: "Cody Fisher",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Product Directives Officer ",
            status: "Away",
            isAdmin: false
        },
        {
            id: 3,
            name: "Esther Howard",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Forward Response Developer",
            status: "Online",
            isAdmin: true
        },
        {
            id: 4,
            name: "Jenny Wilson",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Central Security Manager",
            status: "Offline",
            isAdmin: true
        },
        {
            id: 5,
            name: "Kristin Watson",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Lead Implementation Liaison",
            status: "Offline",
            isAdmin: false
        },
        {
            id: 6,
            name: "Cameron Williamson",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Internal Applications Engineer",
            status: "Occupied",
            isAdmin: false
        },
        {
            id: 7,
            name: "Mavis Russel",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Internal Applications Engineer",
            status: "Offline",
            isAdmin: false
        },
        {
            id: 8,
            name: "Milton Lowery",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Central Security Guard",
            status: "Occupied",
            isAdmin: true
        },
        {
            id: 9,
            name: "Sullivan Owen",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Regional Paradigm Manager",
            status: "Occupied",
            isAdmin: false
        },
        {
            id: 10,
            name: "Betty Walters",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Internal Applications Engineer",
            status: "Occupied",
            isAdmin: false
        },
        {
            id: 11,
            name: "Leila Strickland",
            photo: "https://tailwindui.com/img/justin-profile.jpg",
            office: "Internal Applications Engineer",
            status: "Occupied",
            isAdmin: true
        }
    ];
</script>
<template>
    <div class="bg-neutral-100 p-14 grid grid-cols-3 gap-5 overflow-auto">
        <div
            v-for="member of team"
            class="bg-white rounded-xl h-fit flex flex-col w-full shadow-lg border-gray-200 border-2 hover:shadow-indigo-500 hover:border-indigo-500 ease-in-out duration-500"
            :key="member.id">
            <div class="flex p-3 justify-between">
                <div class="flex flex-col p-3">
                    <div class="flex">
                        <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                        <p
                            v-if="member.isAdmin"
                            class="mx-6 bg-green-100 text-emerald-700 rounded-full px-2 font-semibold text-base">
                            Admin
                        </p>
                    </div>
                    <p class="text-gray-500">{{ member.office }}</p>
                </div>
                <img
                    :src="member.photo"
                    :alt="member.name + ' avatar'"
                    :class="statusColor(member.status)"
                    class="rounded-full h-12 w-12 m-4 border-2" />
            </div>
            <div class="flex">
                <button
                    class="w-full flex p-4 justify-center text-gray-500 rounded-bl-lg border-gray-200 border-t-2 border-r hover:bg-indigo-500 hover:text-white ease-in-out duration-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mx-2"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                    Configurações
                </button>
                <button
                    class="w-full flex p-4 justify-center text-gray-500 rounded-br-lg border-gray-200 border-t-2 border-l hover:bg-indigo-500 hover:text-white ease-in-out duration-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            statusColor(status) {
                switch (status) {
                    case "Online":
                        return "border-green-400";
                    case "Away":
                        return "border-orange-400";
                    case "Occupied":
                        return "border-red-400";
                    default:
                        return "border-gray-400";
                }
            },
            goToChat(member) {},
            goToEdit(member) {}
        }
    };
</script>
<style></style>

<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="w-28 h-screen fixed top-0 left-0 bg-gray-700">
            <SidebarButton class="bg-primary flex justify-center items-center">LOGO HERE</SidebarButton>
            <SidebarButton class="bg-gray-600" />
        </div>
        <div class="ml-28 p-8">
            <h1 class="mb-12 text-5xl font-semibold">Welcome back, {{ name }}!</h1>
            <h2 class="text-4xl mb-12">Services</h2>
            <!-- Services -->
            <div class="grid grid-cols-3 gap-8 justify-items-center">
                <ServiceCard v-for="service in services" :key="service.id" btn-word="Submit" :service-ip="service.ip">
                    {{ service.name }}
                </ServiceCard>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarButton from './Dashboard_components/SidebarButton.vue';
import ServiceCard from './Dashboard_components/ServiceCard.vue';

const IP_BY_ROLE = {
    student: [
        {
            id: 1,
            name: "Room Booking",
            ip: "form/1"
        },
        {
            id: 2,
            name: "Schedule Events",
            ip: "form/2"
        },
        {
            id: 3,
            name: "Register/Dismiss Event",
            ip: "form/3"
        },
        {
            id: 4,
            name: "Cancel Event",
            ip: "form/4"
        },
        {
            id: 5,
            name: "Cancel Booking",
            ip: "form/5"
        },
        {
            id: 6,
            name: "Submit Maintenance Request",
            ip: "form/6"
        },
        {
            id: 7,
            name: "View Maintenance Status",
            ip: "form/7"
        },
        {
            id: 8,
            name: "Ask Chatbot",
            ip: "form/8"
        }
    ],
    admin: [
        {
            id: 9,
            name: "Approve/Reject Booking",
            ip: "form/9"
        },
        {
            id: 10,
            name: "Cancel Event",
            ip: "form/4"
        },
        {
            id: 11,
            name: "Cancel Booking",
            ip: "form/5"
        },
        // {
        //     id: 12,
        //     name: "View Energy and Water Consumption",
        //     ip: "form/10"
        // },
        // {
        //     id: 13,
        //     name: "Predict Future Resourse Demands",
        //     ip: "form/11"
        // },
        {
            id: 14,
            name: "View Student Feedback",
            ip: "form/12"
        },
        {
            id: 15,
            name: "Summarize Student Feedback",
            ip: "form/13"
        }
    ],
    faculty: [
        {
            id: 16,
            name: "Room Booking",
            ip: "form/1"
        },
        {
            id: 17,
            name: "Schedule Events",
            ip: "form/2"
        },
        {
            id: 18,
            name: "Cancel Event",
            ip: "form/4"
        },
        {
            id: 19,
            name: "Cancel Booking",
            ip: "form/5"
        },
        {
            id: 20,
            name: "Submit Maintenance Request",
            ip: "form/6"
        },
        {
            id: 21,
            name: "View Maintenance Status",
            ip: "form/7"
        },
        {
            id: 22,
            name: "View Student Feedback",
            ip: "form/12"
        },
        {
            id: 23,
            name: "Summarize Student Feedback",
            ip: "form/13"
        }
    ],
    maintenance: [
        {
            id: 24,
            name: "Update Maintenance Status",
            ip: "form/14"
        }
    ]
};

export default {
    data() {
        return {
            name: localStorage.getItem('name') || "John Doe",
            services: IP_BY_ROLE["student"],
        }
    },
    components: {
        SidebarButton,
        ServiceCard
    }
}
</script>

<style scoped></style>

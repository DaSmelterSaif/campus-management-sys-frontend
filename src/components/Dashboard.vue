<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="w-28 h-screen fixed top-0 left-0 bg-gray-700">
            <SidebarButton @click="goToHome"
                class="bg-primary flex justify-center items-center cursor-pointer hover:bg-opacity-80 transition-all">
                LOGO HERE</SidebarButton>
            <SidebarButton @click="goToBookings"
                class="bg-gray-600 cursor-pointer hover:bg-opacity-80 transition-all flex justify-center items-center text-4xl"
                title="View Bookings">
                📅
            </SidebarButton>
            <SidebarButton @click="goToEvents"
                class="bg-gray-600 cursor-pointer hover:bg-opacity-80 transition-all flex justify-center items-center text-4xl"
                title="View Events">
                📌
            </SidebarButton>
            <SidebarButton @click="goToMaintenance"
                class="bg-gray-600 cursor-pointer hover:bg-opacity-80 transition-all flex justify-center items-center text-4xl"
                title="View Maintenance">
                🔧
            </SidebarButton>
            <SidebarButton v-if="role === 'maintenance'" @click="goToMaintenanceStaff"
                class="bg-gray-600 cursor-pointer hover:bg-opacity-80 transition-all flex justify-center items-center text-4xl"
                title="Maintenance Requests">
                📋
            </SidebarButton>
        </div>
        <div class="ml-28 p-8">
            <template v-if="!hasChildRoute">
                <h1 class="mb-12 text-5xl font-semibold">Welcome back, {{ name }}!</h1>
                <h2 class="text-4xl mb-12">Services</h2>
                <!-- Services -->
                <div class="grid grid-cols-3 gap-8 justify-items-center">
                    <ServiceCard v-for="service in services" :key="service.id" btn-word="Submit"
                        :service-ip="service.ip" :service-description="service.description"
                        :disabled="service.disabled || false">
                        {{ service.name }}
                    </ServiceCard>
                </div>
            </template>
            <router-view v-else />
        </div>

        <!-- Chatbot Widget -->
        <ChatbotWidget />
    </div>
</template>

<script>
import SidebarButton from './Dashboard_components/SidebarButton.vue';
import ServiceCard from './Dashboard_components/ServiceCard.vue';
import ChatbotWidget from './ChatbotWidget.vue';
import MaintenanceList from './MaintenanceList.vue';
import MaintenanceStaffList from './MaintenanceStaffList.vue';

const IP_BY_ROLE = {
    student: [
        {
            id: 1,
            name: "Room Booking",
            description: "Reserve campus rooms for your needs",
            ip: "form/1"
        },
        {
            id: 2,
            name: "Schedule Events",
            description: "Create and organize events on campus",
            ip: "form/2"
        },
        {
            id: 3,
            name: "Register/Dismiss Event",
            description: "Join or leave events",
            ip: "form/3"
        },
        {
            id: 4,
            name: "Cancel Event",
            description: "Cancel your scheduled events",
            ip: "form/4"
        },
        {
            id: 5,
            name: "Cancel Booking",
            description: "Cancel your room bookings",
            ip: "form/5",
            disabled: false
        },
        {
            id: 6,
            name: "Submit Maintenance Request",
            description: "Report maintenance issues",
            ip: "form/6"
        },
        {
            id: 7,
            name: "View Maintenance Status",
            description: "Track your maintenance requests",
            ip: "form/7"
        }
    ],
    admin: [
        {
            id: 9,
            name: "Approve/Reject Booking",
            description: "Review and manage room booking requests",
            ip: "form/9"
        },
        {
            id: 10,
            name: "Cancel Event",
            description: "Cancel events across campus",
            ip: "form/4"
        },
        {
            id: 11,
            name: "Cancel Booking",
            description: "Cancel room bookings",
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
            description: "Read feedback from students",
            ip: "form/12",
            disabled: true
        },
        {
            id: 15,
            name: "Summarize Student Feedback",
            description: "Generate feedback summaries and insights",
            ip: "form/13",
            disabled: true
        }
    ],
    faculty: [
        {
            id: 16,
            name: "Room Booking",
            description: "Reserve campus rooms for your needs",
            ip: "form/1"
        },
        {
            id: 17,
            name: "Schedule Events",
            description: "Create and organize events on campus",
            ip: "form/2"
        },
        {
            id: 18,
            name: "Cancel Event",
            description: "Cancel your scheduled events",
            ip: "form/4"
        },
        {
            id: 19,
            name: "Cancel Booking",
            description: "Cancel your room bookings",
            ip: "form/5",
            disabled: false
        },
        {
            id: 20,
            name: "Submit Maintenance Request",
            description: "Report maintenance issues",
            ip: "form/6"
        },
        {
            id: 21,
            name: "View Maintenance Status",
            description: "Track your maintenance requests",
            ip: "form/7"
        },
        {
            id: 22,
            name: "View Student Feedback",
            description: "Read feedback from students",
            ip: "form/12",
            disabled: true
        },
        {
            id: 23,
            name: "Summarize Student Feedback",
            description: "Generate feedback summaries and insights",
            ip: "form/13",
            disabled: true
        }
    ],
    maintenance: [
        {
            id: 24,
            name: "Update Maintenance Status",
            description: "Update the status of maintenance requests",
            ip: "form/14"
        }
    ]
};

export default {
    data() {
        const role = localStorage.getItem('role') || "student";
        return {
            name: localStorage.getItem('name') || "John Doe",
            role: role,
            services: IP_BY_ROLE[role],
        }
    },
    computed: {
        hasChildRoute() {
            return this.$route.matched.length > 1;
        }
    },
    methods: {
        goToHome() {
            this.$router.push('/dashboard');
        },
        goToBookings() {
            this.$router.push('/dashboard/bookings');
        },
        goToEvents() {
            this.$router.push('/dashboard/events');
        },
        goToMaintenance() {
            this.$router.push('/dashboard/maintenance');
        },
        goToMaintenanceStaff() {
            this.$router.push('/dashboard/maintenance-staff');
        }
    },
    components: {
        SidebarButton,
        ServiceCard,
        ChatbotWidget,
        MaintenanceList,
        MaintenanceStaffList
    }
}
</script>

<style scoped></style>

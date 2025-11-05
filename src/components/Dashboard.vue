<template>
    <div class="w-28 h-screen fixed top-0 left-0 bg-gray-700">
        <SidebarButton class="bg-primary flex justify-center items-center">LOGO HERE</SidebarButton>
        <SidebarButton class="bg-gray-600" />
    </div>
    <div class="ml-28 p-8">
        <h1 class="mb-12 text-5xl font-semibold">Welcome back, {{ name }}!</h1>
        <h2 class="text-4xl mb-12">Services</h2>
        <!-- Services -->
        <div class="grid grid-cols-3 gap-8 justify-items-center">
            <ServiceCard v-for="service in services">{{ service.name }}</ServiceCard>
        </div>
    </div>
</template>

<script>
import SidebarButton from './Dashboard_components/SidebarButton.vue';
import ServiceCard from './Dashboard_components/ServiceCard.vue';

export default {
    data() {
        return {
            name: "John Doe",
            services: [
                { "name": "Room Booking" },
                { "name": "Event Scheduling" },
            ],
        }
    },
    components: {
        SidebarButton,
        ServiceCard
    }
}
</script>

<style scoped></style>

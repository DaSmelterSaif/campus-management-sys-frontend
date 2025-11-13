<template>
    <div class="h-screen flex justify-center items-start bg-linear-180 from-39% from-white to-100% to-slate-200">
        <div class="w-[750px] min-h-[95vh] p-14 pb-6 bg-blue-200 rounded-md overflow-hidden shadow-lg">
            <h1 class="mb-12 text-5xl font-semibold">{{ BACKEND_IP_BY_SERVICE_ID[serviceId].name }}</h1>
            {{ BACKEND_IP_BY_SERVICE_ID[serviceId].ip }}
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            serviceId: this.$route.params.serviceId,
            BACKEND_IP_BY_SERVICE_ID: {
                1: { name: "Room Booking", ip: "http://localhost:8080/bookroom" },
                2: { name: "Schedule Events", ip: "http://localhost:8080/scheduleevents" },
                3: { name: "Register/Dismiss Event", ip: "http://localhost:8080/registerevent" },
                4: { name: "Cancel Event", ip: "http://localhost:8080/cancelevent" },
                5: { name: "Cancel Booking", ip: "http://localhost:8080/cancelbooking" },
                6: { name: "Submit Maintenance Request", ip: "http://localhost:8080/maintenancerequest" },
                7: { name: "View Maintenance Status", ip: "http://localhost:8080/viewmaintenance" },
                8: { name: "Ask Chatbot", ip: "http://localhost:8080/askchatbot" },
                9: { name: "Approve/Reject Booking", ip: "http://localhost:8080/approverejectbooking" },
                10: { name: "View Energy and Water Consumption", ip: "http://localhost:8080/energywaterreport" },
                11: { name: "Predict Future Resourse Demands", ip: "http://localhost:8080/predictenergywater" },
                12: { name: "View Student Feedback", ip: "http://localhost:8080/getstudentfeedback" },
                13: { name: "Summarize Student Feedback", ip: "http://localhost:8080/summarizestudentfeedback" },
                14: { name: "Update Maintenance Status", ip: "http://localhost:8080/updatemaintenancestatus" }
            },
        }
    },
    created() {
        this.$watch(
            () => this.$route.params.serviceId,
            (newId) => {
                this.serviceId = newId;
            }
        )
    }
}
</script>

<style scoped></style>
<template></template>

<script>


const BACKEND_IP_BY_ROLE = {
    student: [
        {
            id: 1,
            name: "Room Booking",
            ip: "http://localhost:8080/bookroom"
        },
        {
            id: 2,
            name: "Schedule Events",
            ip: "http://localhost:8080/scheduleevents"
        },
        {
            id: 3,
            name: "Register/Dismiss Event",
            ip: "http://localhost:8080/registerevent"
        },
        {
            id: 4,
            name: "Cancel Event",
            ip: "http://localhost:8080/cancelevent"
        },
        {
            id: 5,
            name: "Cancel Booking",
            ip: "http://localhost:8080/cancelbooking"
        },
        {
            id: 6,
            name: "Submit Maintenance Request",
            ip: "http://localhost:8080/maintenancerequest"
        },
        {
            id: 7,
            name: "View Maintenance Status",
            ip: "http://localhost:8080/viewmaintenance"
        },
        {
            id: 8,
            name: "Ask Chatbot",
            ip: "http://localhost:8080/askchatbot"
        }
    ],
    admin: [
        {
            id: 9,
            name: "Approve/Reject Booking",
            ip: "http://localhost:8080/approverejectbooking"
        },
        {
            id: 10,
            name: "Cancel Event",
            ip: "http://localhost:8080/cancelevent"
        },
        {
            id: 11,
            name: "Cancel Booking",
            ip: "http://localhost:8080/cancelbooking"
        },
        {
            id: 12,
            name: "View Energy and Water Consumption",
            ip: "http://localhost:8080/energywaterreport"
        },
        {
            id: 13,
            name: "Predict Future Resourse Demands",
            ip: "http://localhost:8080/predictenergywater"
        },
        {
            id: 14,
            name: "View Student Feedback",
            ip: "http://localhost:8080/getstudentfeedback"
        },
        {
            id: 15,
            name: "Summarize Student Feedback",
            ip: "http://localhost:8080/summarizestudentfeedback"
        }
    ],
    faculty: [
        {
            id: 16,
            name: "Room Booking",
            ip: "http://localhost:8080/bookroom"
        },
        {
            id: 17,
            name: "Schedule Events",
            ip: "http://localhost:8080/scheduleevents"
        },
        {
            id: 18,
            name: "Cancel Event",
            ip: "http://localhost:8080/cancelevent"
        },
        {
            id: 19,
            name: "Cancel Booking",
            ip: "http://localhost:8080/cancelbooking"
        },
        {
            id: 20,
            name: "Submit Maintenance Request",
            ip: "http://localhost:8080/maintenancerequest"
        },
        {
            id: 21,
            name: "View Maintenance Status",
            ip: "http://localhost:8080/viewmaintenance"
        },
        {
            id: 22,
            name: "View Student Feedback",
            ip: "http://localhost:8080/getstudentfeedback"
        },
        {
            id: 23,
            name: "Summarize Student Feedback",
            ip: "http://localhost:8080/summarizestudentfeedback"
        }
    ],
    maintenance: [
        {
            id: 24,
            name: "Update Maintenance Status",
            ip: "http://localhost:8080/updatemaintenancestatus"
        }
    ]
};

export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped></style>
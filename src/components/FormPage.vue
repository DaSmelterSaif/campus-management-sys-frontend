<template>
    <div
        class="h-screen bg-linear-180 from-39% from-white to-100% to-slate-200 fixed inset-0 flex justify-center items-start overflow-y-auto">
        <div class="w-[750px] min-h-[95vh] p-14 mt-4 pb-6 bg-blue-200 rounded-md overflow-hidden shadow-lg">
            <h1 class="mb-12 text-5xl font-semibold">{{ BACKEND_IP_BY_SERVICE_ID[serviceId].name }}</h1>
            <FormBuilder :schema="service.schema" :submit-url="service.ip"
                :read-only-fields="getReadOnlyFields(serviceId)" />
        </div>
    </div>
</template>

<script>
import FormBuilder from './FormPage_components/FormBuilder.vue';

export default {
    data() {
        const BACKEND_IP_BY_SERVICE_ID = {
            1: {
                name: "Room Booking",
                ip: "http://localhost:8080/bookroom",
                schema: {
                    fields: [
                        { key: "userId", label: "User ID", type: "text", placeholder: "For demonstration", required: true },
                        { key: "roomId", label: "Room", type: "text", placeholder: "e.g. A-101", required: true },
                        { key: "date", label: "Date", type: "date", required: true },
                        { key: "startTime", label: "Start Time", type: "time", required: true },
                        { key: "endTime", label: "End Time", type: "time", required: true },
                    ]
                }
            },

            2: {
                name: "Schedule Events",
                ip: "http://localhost:8080/scheduleevents",
                schema: {
                    fields: [
                        { key: "userId", label: "User ID", type: "text", required: true },
                        { key: "title", label: "Title", type: "text", required: true },
                        { key: "roomId", label: "Room ID", type: "text", required: true },
                        { key: "date", label: "Date", type: "date", required: true },
                        { key: "startTime", label: "Start Time", type: "time", required: true },
                        { key: "endTime", label: "End Time", type: "time", required: true },
                        { key: "description", label: "Description", type: "textarea", required: false }
                    ]
                }
            },

            3: {
                name: "Register/Dismiss Event",
                ip: "http://localhost:8080/registerevent",
                schema: {
                    fields: [
                        { key: "userId", label: "User ID", type: "text", required: true },
                        { key: "eventId", label: "Event ID", type: "text", required: true },
                        {
                            key: "action", label: "Action", type: "select", required: true,
                            options: [
                                { value: "register", label: "Register" },
                                { value: "cancel", label: "Cancel RSVP" }
                            ],
                            default: "register"
                        }
                    ]
                }
            },

            4: {
                name: "Cancel Event",
                ip: "http://localhost:8080/cancelevent",
                schema: {
                    fields: [
                        { key: "eventId", label: "Event ID", type: "text", required: true },
                        { key: "reason", label: "Reason", type: "textarea" }
                    ]
                }
            },

            5: {
                name: "Cancel Booking",
                ip: "http://localhost:8080/cancelbooking",
                schema: {
                    fields: [
                        { key: "bookingId", label: "Booking ID", type: "text", required: true },
                        { key: "roomId", label: "Room ID", type: "text", required: true },
                        { key: "reason", label: "Reason", type: "textarea" }
                    ]
                }
            },

            6: {
                name: "Submit Maintenance Request",
                ip: "http://localhost:8080/maintenancerequest",
                schema: {
                    fields: [
                        { key: "userId", label: "User ID", type: "text", required: true },
                        { key: "location", label: "Location", type: "text", placeholder: "Building/Room", required: true },
                        {
                            key: "category", label: "Category", type: "select", required: true,
                            options: [
                                { value: "electrical", label: "Electrical" },
                                { value: "plumbing", label: "Plumbing" },
                                { value: "hvac", label: "HVAC" },
                                { value: "other", label: "Other" }
                            ]
                        },
                        { key: "description", label: "Description", type: "textarea", required: true },
                        { key: "priority", label: "Priority", type: "select", options: ["low", "medium", "high"], default: "medium" },
                        { key: "contactEmail", label: "Contact Email", type: "email", required: true }
                    ]
                }
            },

            7: {
                name: "View Maintenance Status",
                ip: "http://localhost:8080/viewmaintenance",
                schema: {
                    fields: [
                        { key: "requestId", label: "Request ID", type: "text", required: true }
                    ]
                }
            },

            8: {
                name: "Ask Chatbot",
                ip: "http://localhost:8080/askchatbot",
                schema: {
                    fields: [
                        {
                            key: "mode", label: "Mode", type: "select", required: true,
                            options: [
                                { value: "query", label: "Question" },
                                { value: "quickAction", label: "Quick Action" }
                            ],
                            default: "query"
                        },
                        { key: "prompt", label: "Your question or instruction", type: "textarea", required: true },
                        { key: "keywords", label: "Keywords (optional)", type: "text", placeholder: "comma-separated" }
                    ]
                }
            },

            9: {
                name: "Approve/Reject Booking",
                ip: "http://localhost:8080/approverejectbooking",
                schema: {
                    fields: [
                        { key: "bookingId", label: "Booking ID", type: "text", required: true },
                        { key: "roomId", label: "Room ID", type: "text", required: true },
                        {
                            key: "decision", label: "Decision", type: "select", required: true,
                            options: [
                                { value: "approve", label: "Approve" },
                                { value: "reject", label: "Reject" }
                            ]
                        },
                        { key: "note", label: "Note", type: "textarea", placeholder: "Optional comment", required: false }
                    ]
                }
            },

            // 10 & 11 intentionally excluded

            12: {
                name: "View Student Feedback",
                ip: "http://localhost:8080/getstudentfeedback",
                schema: {
                    fields: [
                        { key: "keyword", label: "Keyword", type: "text", placeholder: "Filter by word/phrase" },
                        { key: "fromDate", label: "From Date", type: "date" },
                        { key: "toDate", label: "To Date", type: "date" }
                    ]
                }
            },

            13: {
                name: "Summarize Student Feedback",
                ip: "http://localhost:8080/summarizestudentfeedback",
                schema: {
                    fields: [
                        { key: "fromDate", label: "From Date", type: "date" },
                        { key: "toDate", label: "To Date", type: "date" },
                        {
                            key: "summaryType", label: "Summary Type", type: "select",
                            options: [
                                { value: "themes", label: "Key Themes" },
                                { value: "sentiment", label: "Sentiment" },
                                { value: "both", label: "Themes + Sentiment" }
                            ],
                            default: "both"
                        }
                    ]
                }
            },

            14: {
                name: "Update Maintenance Status",
                ip: "http://localhost:8080/updatemaintenancestatus",
                schema: {
                    fields: [
                        { key: "ticketId", label: "Ticket ID", type: "text", required: true },
                        {
                            key: "status", label: "Status", type: "select", required: true,
                            options: [
                                { value: "open", label: "Open" },
                                { value: "in_progress", label: "In Progress" },
                                { value: "completed", label: "Completed" },
                                { value: "closed", label: "Closed" }
                            ]
                        },
                        { key: "updateNote", label: "Update Note", type: "textarea", placeholder: "What changed?" }
                    ]
                }
            }
        };
        return {
            serviceId: this.$route.params.serviceId,
            service: BACKEND_IP_BY_SERVICE_ID[this.$route.params.serviceId],
            BACKEND_IP_BY_SERVICE_ID,
        };
    },
    created() {
        this.$watch(
            () => this.$route.params.serviceId,
            (newId) => {
                this.serviceId = newId;
                this.service = this.BACKEND_IP_BY_SERVICE_ID[newId];
                this.autoFillUserId();
            }
        );
        // Auto-fill on initial load
        this.autoFillUserId();
    },
    methods: {
        getReadOnlyFields(serviceId) {
            // Services with booking-related read-only fields
            const readOnlyMap = {
                5: ["bookingId", "roomId"],    // Cancel Booking (student)
                9: ["bookingId", "roomId"],    // Approve/Reject Booking (admin)
                11: ["bookingId", "roomId"],   // Cancel Booking (admin)
            };
            return readOnlyMap[serviceId] || [];
        },
        autoFillUserId() {
            const userId = localStorage.getItem('userId');
            if (userId && this.service && this.service.schema.fields.some(f => f.key === 'userId')) {
                const userIdField = this.service.schema.fields.find(f => f.key === 'userId');
                if (userIdField) {
                    userIdField.default = userId;
                }
            }
        }
    },
    components: {
        FormBuilder
    }
}
</script>

<style scoped></style>
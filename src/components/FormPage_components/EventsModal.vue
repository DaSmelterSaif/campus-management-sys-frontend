<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-auto p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-semibold">Select an Event</h2>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="flex justify-center items-center py-8">
                <p class="text-gray-600">Loading events...</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{{ error }}</p>
                <button @click="fetchEvents"
                    class="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Retry
                </button>
            </div>

            <!-- No events state -->
            <div v-else-if="events.length === 0" class="text-center py-8">
                <p class="text-gray-600">No events found</p>
            </div>

            <!-- Events table -->
            <div v-else class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-200 border-b-2 border-gray-400">
                            <th class="px-4 py-2 text-left font-semibold">Event ID</th>
                            <th class="px-4 py-2 text-left font-semibold">Title</th>
                            <th class="px-4 py-2 text-left font-semibold">Date</th>
                            <th class="px-4 py-2 text-left font-semibold">Time</th>
                            <th class="px-4 py-2 text-left font-semibold">Room</th>
                            <th class="px-4 py-2 text-center font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="event in events" :key="event.eventId"
                            class="border-b border-gray-300 hover:bg-gray-50">
                            <td class="px-4 py-2 font-mono text-sm">{{ event.eventId }}</td>
                            <td class="px-4 py-2">{{ event.title }}</td>
                            <td class="px-4 py-2">{{ event.date }}</td>
                            <td class="px-4 py-2 text-sm">{{ event.startTime }} - {{ event.endTime }}</td>
                            <td class="px-4 py-2">{{ event.roomId }}</td>
                            <td class="px-4 py-2 text-center">
                                <button @click="selectEvent(event)"
                                    class="bg-primary hover:bg-hovered-btn text-white px-3 py-1 rounded text-sm transition-colors">
                                    Select
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EventsModal",
    props: {
        isOpen: { type: Boolean, default: false },
        userId: { type: String, required: true }
    },
    emits: ["close", "event-selected"],
    data() {
        return {
            events: [],
            loading: false,
            error: null
        };
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.fetchEvents();
            }
        }
    },
    methods: {
        async fetchEvents() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch(`http://localhost:8080/getevents?userId=${this.userId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch events");
                }

                this.events = data;
            } catch (err) {
                this.error = err.message;
                console.error("Error fetching events:", err);
            } finally {
                this.loading = false;
            }
        },
        selectEvent(event) {
            this.$emit("event-selected", event);
            this.$emit("close");
        }
    }
};
</script>

<style scoped></style>

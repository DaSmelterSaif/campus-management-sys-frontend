<template>
    <div class="p-8">
        <div>
            <h1 class="text-5xl font-semibold mb-12">My Events</h1>

            <!-- Loading state -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <p class="text-gray-600 text-lg">Loading events...</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p class="font-semibold">Error loading events</p>
                <p>{{ error }}</p>
                <button @click="fetchEvents"
                    class="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Retry
                </button>
            </div>

            <!-- No events state -->
            <div v-else-if="events.length === 0"
                class="bg-blue-50 border border-blue-300 text-blue-700 px-4 py-3 rounded">
                <p class="text-lg">No events found. Start by creating a new event!</p>
            </div>

            <!-- Events grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="event in events" :key="event.eventId"
                    class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                    <div class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Event ID</p>
                        <p class="text-lg font-mono font-bold text-gray-800">{{ event.eventId }}</p>
                    </div>

                    <div class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Event Name</p>
                        <p class="text-lg font-bold text-gray-800">{{ event.name }}</p>
                    </div>

                    <div class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Description</p>
                        <p class="text-sm text-gray-700 line-clamp-2">{{ event.description }}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p class="text-sm text-gray-500 uppercase font-semibold">Date</p>
                            <p class="text-lg font-bold text-gray-800">{{ formatDate(event.date) }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 uppercase font-semibold">Attendees</p>
                            <p class="text-lg font-bold text-gray-800">{{ event.attendeeCount }}</p>
                        </div>
                    </div>

                    <div class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Room & Time</p>
                        <p class="text-sm text-gray-700">{{ event.roomId }} • {{ event.startTime }} - {{ event.endTime
                            }}</p>
                    </div>

                    <button @click="cancelEvent(event)"
                        class="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors">
                        Cancel Event
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EventsList",
    data() {
        return {
            events: [],
            loading: false,
            error: null
        };
    },
    mounted() {
        this.fetchEvents();
    },
    methods: {
        async fetchEvents() {
            this.loading = true;
            this.error = null;
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found. Please log in again.');
                }

                const response = await fetch(`http://localhost:8080/getevents?userId=${userId}`);
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
        cancelEvent(event) {
            this.$router.push({
                name: 'form',
                params: { serviceId: 4 },
                query: {
                    eventId: event.eventId,
                    title: event.name,
                    roomId: event.roomId,
                    date: event.date,
                    startTime: event.startTime,
                    endTime: event.endTime
                }
            });
        },
        formatDate(dateStr) {
            try {
                const date = new Date(dateStr + 'T00:00:00');
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            } catch {
                return dateStr;
            }
        }
    }
};
</script>

<style scoped></style>

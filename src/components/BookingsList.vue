<template>
    <div class="p-8">
        <div>
            <h1 class="text-5xl font-semibold mb-12">My Bookings</h1>

            <!-- Loading state -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <p class="text-gray-600 text-lg">Loading bookings...</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p class="font-semibold">Error loading bookings</p>
                <p>{{ error }}</p>
                <button @click="fetchBookings"
                    class="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Retry
                </button>
            </div>

            <!-- No bookings state -->
            <div v-else-if="bookings.length === 0"
                class="bg-blue-50 border border-blue-300 text-blue-700 px-4 py-3 rounded">
                <p class="text-lg">No bookings found. Start by creating a new booking!</p>
            </div>

            <!-- Bookings grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="booking in bookings" :key="booking.bookingId"
                    class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                    <div class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Booking ID</p>
                        <p class="text-lg font-mono font-bold text-gray-800">{{ booking.bookingId }}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p class="text-sm text-gray-500 uppercase font-semibold">Room</p>
                            <p class="text-lg font-bold text-gray-800">{{ booking.roomId }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 uppercase font-semibold">Date</p>
                            <p class="text-lg font-bold text-gray-800">{{ formatDate(booking.date) }}</p>
                        </div>
                    </div>

                    <div class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Time</p>
                        <p class="text-lg font-bold text-gray-800">{{ booking.startTime }} - {{ booking.endTime }}</p>
                    </div>

                    <div class="mb-4 flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 uppercase font-semibold">Status</p>
                            <span :class="getStatusBadgeClass(booking.status)">
                                {{ booking.status }}
                            </span>
                        </div>
                    </div>

                    <button @click="cancelBooking(booking)"
                        class="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors">
                        Cancel Booking
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BookingsList",
    data() {
        return {
            bookings: [],
            loading: false,
            error: null
        };
    },
    mounted() {
        this.fetchBookings();
    },
    methods: {
        async fetchBookings() {
            this.loading = true;
            this.error = null;
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found. Please log in again.');
                }

                const response = await fetch(`${this.$API_BASE_URL}/getbookings?userId=${userId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch bookings");
                }

                this.bookings = data;
            } catch (err) {
                this.error = err.message;
                console.error("Error fetching bookings:", err);
            } finally {
                this.loading = false;
            }
        },
        cancelBooking(booking) {
            this.$router.push({
                name: 'form',
                params: { serviceId: 5 },
                query: {
                    bookingId: booking.bookingId,
                    roomId: booking.roomId,
                    date: booking.date,
                    startTime: booking.startTime,
                    endTime: booking.endTime
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
        },
        getStatusBadgeClass(status) {
            const baseClass = "px-3 py-1 rounded-full text-sm font-medium text-white inline-block";
            const statusClasses = {
                pending: "bg-yellow-500",
                approved: "bg-green-500",
                rejected: "bg-red-500",
                cancelled: "bg-gray-500",
                completed: "bg-blue-500"
            };
            return `${baseClass} ${statusClasses[status] || "bg-gray-400"}`;
        }
    }
};
</script>

<style scoped></style>

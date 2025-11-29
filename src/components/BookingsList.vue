<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="w-28 h-screen fixed top-0 left-0 bg-gray-700">
            <SidebarButton @click="goBack"
                class="bg-primary flex justify-center items-center cursor-pointer hover:bg-opacity-80 transition-all">
                LOGO HERE
            </SidebarButton>
            <SidebarButton @click="openBookingsView"
                class="bg-gray-600 cursor-pointer hover:bg-opacity-80 transition-all flex justify-center items-center text-4xl"
                title="View Bookings">
                📅
            </SidebarButton>
        </div>
        <div class="ml-28 p-8">
            <div class="flex items-center justify-between mb-12">
                <h1 class="text-5xl font-semibold">My Bookings</h1>
                <button @click="goBack"
                    class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors">
                    Back to Dashboard
                </button>
            </div>

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
import SidebarButton from './Dashboard_components/SidebarButton.vue';

export default {
    name: "BookingsList",
    components: {
        SidebarButton
    },
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

                const response = await fetch(`http://localhost:8080/getbookings?userId=${userId}`);
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
        goBack() {
            this.$router.push('/dashboard');
        },
        openBookingsView() {
            // Already on bookings view, do nothing
        },
        cancelBooking(booking) {
            // Navigate to cancel booking form with pre-filled data
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

<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-auto p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-semibold">Select a Booking</h2>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="flex justify-center items-center py-8">
                <p class="text-gray-600">Loading bookings...</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{{ error }}</p>
                <button @click="fetchBookings"
                    class="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Retry
                </button>
            </div>

            <!-- No bookings state -->
            <div v-else-if="bookings.length === 0" class="text-center py-8">
                <p class="text-gray-600">No bookings found</p>
            </div>

            <!-- Bookings table -->
            <div v-else class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-200 border-b-2 border-gray-400">
                            <th class="px-4 py-2 text-left font-semibold">Booking ID</th>
                            <th class="px-4 py-2 text-left font-semibold">Room ID</th>
                            <th class="px-4 py-2 text-left font-semibold">Date</th>
                            <th class="px-4 py-2 text-left font-semibold">Time</th>
                            <th class="px-4 py-2 text-left font-semibold">Status</th>
                            <th class="px-4 py-2 text-center font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="booking in bookings" :key="booking.bookingId"
                            class="border-b border-gray-300 hover:bg-gray-50">
                            <td class="px-4 py-2 font-mono text-sm">{{ booking.bookingId }}</td>
                            <td class="px-4 py-2">{{ booking.roomId }}</td>
                            <td class="px-4 py-2">{{ booking.date }}</td>
                            <td class="px-4 py-2 text-sm">{{ booking.startTime }} - {{ booking.endTime }}</td>
                            <td class="px-4 py-2">
                                <span :class="getStatusBadgeClass(booking.status)">
                                    {{ booking.status }}
                                </span>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <button @click="selectBooking(booking)"
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
    name: "BookingsModal",
    props: {
        isOpen: { type: Boolean, default: false },
        userId: { type: String, required: true },
        fetchAllBookings: { type: Boolean, default: false }
    },
    emits: ["close", "booking-selected"],
    data() {
        return {
            bookings: [],
            loading: false,
            error: null
        };
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.fetchBookings();
            }
        }
    },
    methods: {
        async fetchBookings() {
            this.loading = true;
            this.error = null;
            try {
                let url;
                if (this.fetchAllBookings) {
                    url = `http://localhost:8080/getallbookings`;
                } else {
                    url = `http://localhost:8080/getbookings?userId=${this.userId}`;
                }
                const response = await fetch(url);
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
        selectBooking(booking) {
            this.$emit("booking-selected", booking);
            this.$emit("close");
        },
        getStatusBadgeClass(status) {
            const baseClass = "px-3 py-1 rounded-full text-sm font-medium text-white";
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

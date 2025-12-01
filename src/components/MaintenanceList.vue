<template>
    <div class="p-8">
        <div>
            <h1 class="text-5xl font-semibold mb-12">My Maintenance Requests</h1>

            <!-- Loading state -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <p class="text-gray-600 text-lg">Loading maintenance requests...</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p class="font-semibold">Error loading maintenance requests</p>
                <p>{{ error }}</p>
                <button @click="fetchMaintenanceRequests"
                    class="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Retry
                </button>
            </div>

            <!-- No requests state -->
            <div v-else-if="maintenanceRequests.length === 0"
                class="bg-blue-50 border border-blue-300 text-blue-700 px-4 py-3 rounded">
                <p class="text-lg">No maintenance requests found. Submit a new request if needed!</p>
            </div>

            <!-- Maintenance requests grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="request in maintenanceRequests" :key="request.requestId"
                    class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                    <div class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Request ID</p>
                        <p class="text-lg font-mono font-bold text-gray-800">{{ request.requestId }}</p>
                    </div>

                    <div class="mb-4 flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 uppercase font-semibold">Status</p>
                            <span :class="getStatusBadgeClass(request.status)">
                                {{ request.status }}
                            </span>
                        </div>
                    </div>

                    <div class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Description</p>
                        <p class="text-sm text-gray-700 line-clamp-2">{{ request.description }}</p>
                    </div>

                    <div class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Submitted</p>
                        <p class="text-sm text-gray-700">{{ formatTimestamp(request.timestamp) }}</p>
                    </div>

                    <div v-if="request.comments" class="mb-4">
                        <p class="text-sm text-gray-500 uppercase font-semibold">Latest Comment</p>
                        <p class="text-sm text-gray-700 line-clamp-2">{{ request.comments }}</p>
                    </div>

                    <button @click="viewDetails(request)"
                        class="w-full bg-primary hover:bg-hovered-btn text-white px-3 py-2 rounded transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MaintenanceList",
    data() {
        return {
            maintenanceRequests: [],
            loading: false,
            error: null
        };
    },
    mounted() {
        this.fetchMaintenanceRequests();
    },
    methods: {
        async fetchMaintenanceRequests() {
            this.loading = true;
            this.error = null;
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found. Please log in again.');
                }

                const response = await fetch(`http://localhost:8080/getmaintenance?userId=${userId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch maintenance requests");
                }

                this.maintenanceRequests = data;
            } catch (err) {
                this.error = err.message;
                console.error("Error fetching maintenance requests:", err);
            } finally {
                this.loading = false;
            }
        },
        viewDetails(request) {
            this.$router.push({
                name: 'form',
                params: { serviceId: 7 },
                query: {
                    requestId: request.requestId,
                    status: request.status,
                    description: request.description
                }
            });
        },
        formatTimestamp(timestamp) {
            if (!timestamp) return "";
            try {
                const date = new Date(timestamp);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + " " +
                    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            } catch {
                return timestamp;
            }
        },
        getStatusBadgeClass(status) {
            const baseClass = "px-3 py-1 rounded-full text-sm font-medium text-white inline-block";
            const statusClasses = {
                open: "bg-red-500",
                in_progress: "bg-yellow-500",
                completed: "bg-green-500",
                closed: "bg-gray-500"
            };
            return `${baseClass} ${statusClasses[status] || "bg-gray-400"}`;
        }
    }
};
</script>

<style scoped></style>

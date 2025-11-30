<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-auto p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-semibold">Select a Maintenance Request</h2>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="flex justify-center items-center py-8">
                <p class="text-gray-600">Loading maintenance requests...</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{{ error }}</p>
                <button @click="fetchMaintenanceRequests"
                    class="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Retry
                </button>
            </div>

            <!-- No requests state -->
            <div v-else-if="maintenanceRequests.length === 0" class="text-center py-8">
                <p class="text-gray-600">No maintenance requests found</p>
            </div>

            <!-- Maintenance requests table -->
            <div v-else class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-200 border-b-2 border-gray-400">
                            <th class="px-4 py-2 text-left font-semibold">Request ID</th>
                            <th class="px-4 py-2 text-left font-semibold">Status</th>
                            <th class="px-4 py-2 text-left font-semibold">Description</th>
                            <th class="px-4 py-2 text-left font-semibold">Timestamp</th>
                            <th class="px-4 py-2 text-center font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="request in maintenanceRequests" :key="request.requestId"
                            class="border-b border-gray-300 hover:bg-gray-50">
                            <td class="px-4 py-2 font-mono text-sm">{{ request.requestId }}</td>
                            <td class="px-4 py-2">
                                <span :class="getStatusBadgeClass(request.status)">
                                    {{ request.status }}
                                </span>
                            </td>
                            <td class="px-4 py-2 text-sm truncate max-w-xs">{{ request.description }}</td>
                            <td class="px-4 py-2 text-sm">{{ formatTimestamp(request.timestamp) }}</td>
                            <td class="px-4 py-2 text-center">
                                <button @click="selectRequest(request)"
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
    name: "MaintenanceModal",
    props: {
        isOpen: { type: Boolean, default: false },
        userId: { type: String, required: true }
    },
    emits: ["close", "request-selected"],
    data() {
        return {
            maintenanceRequests: [],
            loading: false,
            error: null
        };
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.fetchMaintenanceRequests();
            }
        }
    },
    methods: {
        async fetchMaintenanceRequests() {
            this.loading = true;
            this.error = null;
            try {
                const response = await fetch(`http://localhost:8080/getmaintenance?userId=${this.userId}`);
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
        selectRequest(request) {
            this.$emit("request-selected", request);
            this.$emit("close");
        },
        getStatusBadgeClass(status) {
            const baseClass = "px-3 py-1 rounded-full text-sm font-medium text-white";
            const statusClasses = {
                open: "bg-red-500",
                in_progress: "bg-yellow-500",
                completed: "bg-green-500",
                closed: "bg-gray-500"
            };
            return `${baseClass} ${statusClasses[status] || "bg-gray-400"}`;
        },
        formatTimestamp(timestamp) {
            if (!timestamp) return "";
            const date = new Date(timestamp);
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }
    }
};
</script>

<style scoped></style>

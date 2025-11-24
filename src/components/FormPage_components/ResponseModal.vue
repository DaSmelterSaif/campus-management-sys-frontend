<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <!-- Header -->
            <div class="sticky top-0 bg-blue-600 text-white p-4 flex justify-between items-center">
                <h2 class="text-xl font-semibold">Response</h2>
                <button @click="close" class="text-2xl font-bold hover:text-gray-200">&times;</button>
            </div>

            <!-- Content -->
            <div class="p-6">
                <div v-if="data" class="space-y-4">
                    <!-- Display JSON data with formatted output -->
                    <pre
                        class="bg-gray-100 p-4 rounded overflow-x-auto text-sm">{{ JSON.stringify(data, null, 2) }}</pre>
                </div>
                <div v-else class="text-gray-500">
                    No data to display
                </div>
            </div>

            <!-- Footer -->
            <div class="sticky bottom-0 bg-gray-100 p-4 flex justify-end border-t">
                <button @click="close"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ResponseModal",
    props: {
        data: { type: Object, default: null },
        isOpen: { type: Boolean, default: false }
    },
    emits: ["close"],
    methods: {
        close() {
            this.$emit("close");
        }
    }
};
</script>

<style scoped>
/* Smooth fade-in animation */
.fixed {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>

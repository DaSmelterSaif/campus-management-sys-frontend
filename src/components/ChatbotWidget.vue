<template>
    <div class="fixed bottom-6 right-6 z-40">
        <!-- Floating Button -->
        <button v-if="!isOpen" @click="isOpen = true"
            class="bg-primary hover:bg-hovered-btn active:bg-clicked-btn text-white rounded-full shadow-lg p-4 transition-all transform hover:scale-110 duration-200 flex items-center justify-center w-16 h-16">
            <span class="text-2xl">💬</span>
        </button>

        <!-- Chat Box -->
        <div v-else class="bg-white rounded-lg shadow-2xl w-96 max-h-96 flex flex-col overflow-hidden">
            <!-- Header -->
            <div class="bg-primary text-white p-4 flex justify-between items-center">
                <h3 class="font-semibold text-lg">Campus Support</h3>
                <button @click="isOpen = false" class="text-white hover:text-gray-200 text-2xl leading-none">
                    ×
                </button>
            </div>

            <!-- Messages Area -->
            <div class="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                <!-- Bot greeting message -->
                <div v-if="messages.length === 0" class="flex justify-start">
                    <div class="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs">
                        <p class="text-sm">Hello! 👋 How can I help you today?</p>
                    </div>
                </div>

                <!-- Chat Messages -->
                <div v-for="(msg, idx) in messages" :key="idx" :class="[
                    'flex',
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                ]">
                    <div :class="[
                        'rounded-lg px-4 py-2 max-w-xs',
                        msg.sender === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-800'
                    ]">
                        <p class="text-sm break-words">{{ msg.text }}</p>
                    </div>
                </div>

                <!-- Loading indicator -->
                <div v-if="loading" class="flex justify-start">
                    <div class="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
                        <div class="flex gap-1">
                            <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                            <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                style="animation-delay: 0.1s"></span>
                            <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                style="animation-delay: 0.2s"></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="p-4 border-t border-gray-300 bg-white">
                <form @submit.prevent="sendMessage" class="flex gap-2">
                    <input v-model="userInput" type="text" placeholder="Type your message..."
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        :disabled="loading" />
                    <button type="submit"
                        class="bg-primary hover:bg-hovered-btn active:bg-clicked-btn text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="!userInput.trim() || loading">
                        Send
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChatbotWidget",
    data() {
        return {
            isOpen: false,
            userInput: "",
            messages: [],
            loading: false,
            autoNavigateTimer: null
        };
    },
    methods: {
        async sendMessage() {
            if (!this.userInput.trim()) return;

            // Add user message to chat
            this.messages.push({
                sender: "user",
                text: this.userInput
            });

            const userMessage = this.userInput;
            this.userInput = "";
            this.loading = true;

            try {
                // Get user type from localStorage
                const userType = localStorage.getItem('role') || 'student';

                // Send to chatbot endpoint
                const response = await fetch(`${this.$API_BASE_URL}/askchatbot`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        mode: "query",
                        prompt: userMessage,
                        keywords: "",
                        userType: userType
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to get response from chatbot");
                }

                // Parse the nested response if it's a string
                let chatbotData = data;
                if (data.response && typeof data.response === 'string') {
                    try {
                        chatbotData = JSON.parse(data.response);
                    } catch (parseErr) {
                        console.error("Error parsing nested response:", parseErr);
                        throw new Error("Invalid response format from chatbot");
                    }
                }

                // Add bot response to chat
                this.messages.push({
                    sender: "bot",
                    text: chatbotData.assistantMessage || "I didn't quite understand that. Could you rephrase?"
                });

                // Check if there's a service to auto-navigate to
                if (chatbotData.selectedServiceId && chatbotData.servicePayloads && chatbotData.servicePayloads[chatbotData.selectedServiceId]) {
                    this.scheduleAutoNavigation(chatbotData.selectedServiceId, chatbotData.servicePayloads[chatbotData.selectedServiceId]);
                }
            } catch (err) {
                console.error("Chatbot error:", err);
                this.messages.push({
                    sender: "bot",
                    text: "Sorry, I'm having trouble connecting. Please try again later."
                });
            } finally {
                this.loading = false;
            }
        },
        scheduleAutoNavigation(serviceId, servicePayload) {
            // Clear any existing timer
            if (this.autoNavigateTimer) {
                clearTimeout(this.autoNavigateTimer);
            }

            // Add a notification message
            this.messages.push({
                sender: "bot",
                text: `📋 Opening the form for you in 3 seconds...`
            });

            // Schedule navigation after 3 seconds
            this.autoNavigateTimer = setTimeout(() => {
                this.navigateToService(serviceId, servicePayload);
            }, 3000);
        },
        navigateToService(serviceId, servicePayload) {
            // Close the chat widget
            this.isOpen = false;

            // Store the payload in sessionStorage so FormPage can retrieve it
            sessionStorage.setItem('chatbotPayload', JSON.stringify({
                serviceId: serviceId,
                data: servicePayload
            }));

            // Navigate to the form
            this.$router.push({
                name: 'form',
                params: { serviceId: serviceId }
            });
        }
    },
    beforeUnmount() {
        // Clear any pending navigation timer when component is destroyed
        if (this.autoNavigateTimer) {
            clearTimeout(this.autoNavigateTimer);
        }
    }
};
</script>

<style scoped></style>

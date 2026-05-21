<template>
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
            v-if="!isOpen"
            type="button"
            @click="isOpen = true"
            class="bg-primary hover:bg-hovered-btn active:bg-clicked-btn text-white rounded-full shadow-lg p-4 transition-all transform hover:scale-110 duration-200 flex items-center justify-center w-16 h-16"
        >
            <span class="text-2xl">💬</span>
        </button>

        <template v-else>
            <transition name="fade-pop">
                <aside class="w-96 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/10">
                    <div class="mb-3 flex items-start justify-between gap-3">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Chatbot use cases</p>
                            <h3 class="mt-1 text-sm font-semibold text-gray-900">Try these prompts</h3>
                        </div>
                    </div>

                    <div class="space-y-3 text-sm leading-6 text-gray-800">
                        <div class="rounded-xl bg-gray-50 p-3">
                            <p class="font-mono text-xs text-gray-500">Student booking</p>
                            <p class="mt-1">Can you help me the room number 2001 from 9am to 10am?</p>
                        </div>
                        <div class="rounded-xl bg-gray-50 p-3">
                            <p class="font-mono text-xs text-gray-500">Support questions</p>
                            <p class="mt-1">What services can you help with?</p>
                        </div>
                        <div class="rounded-xl bg-gray-50 p-3">
                            <p class="font-mono text-xs text-gray-500">Maintenance request</p>
                            <p class="mt-1">Can you help me find the submit maintenance request? Something's broken in the bathroom.</p>
                        </div>
                    </div>
                </aside>
            </transition>

            <div class="bg-white rounded-lg shadow-2xl w-96 max-h-96 flex flex-col overflow-hidden">
                <div class="bg-primary text-white p-4 flex justify-between items-center">
                    <h3 class="font-semibold text-lg">Campus Support</h3>
                    <button @click="isOpen = false" class="text-white hover:text-gray-200 text-2xl leading-none">
                        ×
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                    <div v-if="messages.length === 0" class="flex justify-start">
                        <div class="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs">
                            <p class="text-sm">Hello! 👋 How can I help you today?</p>
                        </div>
                    </div>

                    <div
                        v-for="(msg, idx) in messages"
                        :key="idx"
                        :class="['flex', msg.sender === 'user' ? 'justify-end' : 'justify-start']"
                    >
                        <div
                            :class="[
                                'rounded-lg px-4 py-2 max-w-xs',
                                msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
                            ]"
                        >
                            <p class="text-sm break-words">{{ msg.text }}</p>
                        </div>
                    </div>

                    <div v-if="loading" class="flex justify-start">
                        <div class="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
                            <div class="flex gap-1">
                                <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                                <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-4 border-t border-gray-300 bg-white">
                    <form @submit.prevent="sendMessage" class="flex gap-2">
                        <input
                            v-model="userInput"
                            type="text"
                            placeholder="Type your message..."
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            :disabled="loading"
                        />
                        <button
                            type="submit"
                            class="bg-primary hover:bg-hovered-btn active:bg-clicked-btn text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="!userInput.trim() || loading"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </template>
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

            this.messages.push({
                sender: "user",
                text: this.userInput
            });

            const userMessage = this.userInput;
            this.userInput = "";
            this.loading = true;

            try {
                const userType = localStorage.getItem('role') || 'student';

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

                let chatbotData = data;
                if (data.response && typeof data.response === 'string') {
                    try {
                        chatbotData = JSON.parse(data.response);
                    } catch (parseErr) {
                        console.error("Error parsing nested response:", parseErr);
                        throw new Error("Invalid response format from chatbot");
                    }
                }

                this.messages.push({
                    sender: "bot",
                    text: chatbotData.assistantMessage || "I didn't quite understand that. Could you rephrase?"
                });

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
            if (this.autoNavigateTimer) {
                clearTimeout(this.autoNavigateTimer);
            }

            this.messages.push({
                sender: "bot",
                text: `📋 Opening the form for you in 3 seconds...`
            });

            this.autoNavigateTimer = setTimeout(() => {
                this.navigateToService(serviceId, servicePayload);
            }, 3000);
        },
        navigateToService(serviceId, servicePayload) {
            this.isOpen = false;

            sessionStorage.setItem('chatbotPayload', JSON.stringify({
                serviceId: serviceId,
                data: servicePayload
            }));

            this.$router.push({
                name: 'form',
                params: { serviceId: serviceId }
            });
        }
    },
    beforeUnmount() {
        if (this.autoNavigateTimer) {
            clearTimeout(this.autoNavigateTimer);
        }
    }
};
</script>

<style scoped>
.fade-pop-enter-active,
.fade-pop-leave-active {
    transition: opacity 0.16s ease, transform 0.16s ease;
}

.fade-pop-enter-from,
.fade-pop-leave-to {
    opacity: 0;
    transform: translateY(6px);
}
</style>

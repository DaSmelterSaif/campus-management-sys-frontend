<template>
    <div class="relative h-screen flex justify-center items-center bg-linear-180 from-39% from-white to-100% to-gray-400">
        <button
            type="button"
            class="fixed right-6 top-6 z-20 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            @click="showUseCases = !showUseCases"
        >
            {{ showUseCases ? 'Hide login uses' : 'Show login uses' }}
        </button>

        <transition name="fade-slide">
            <aside
                v-if="showUseCases"
                class="fixed right-6 top-20 z-20 w-[320px] max-w-[calc(100vw-3rem)] rounded-2xl bg-beige p-4 shadow-2xl ring-1 ring-black/10"
            >
                <div class="space-y-2 text-sm font-medium text-gray-900">
                    <div class="rounded-xl bg-white/70 p-3 leading-5">
                        <div>Student</div>
                        <div class="mt-2 font-mono text-xs text-gray-700">student1@sys.com</div>
                        <div class="font-mono text-xs text-gray-700">pass123</div>
                    </div>
                    <div class="rounded-xl bg-white/70 p-3 leading-5">
                        <div>Faculty</div>
                        <div class="mt-2 font-mono text-xs text-gray-700">faculty1@sys.com</div>
                        <div class="font-mono text-xs text-gray-700">pass456</div>
                    </div>
                    <div class="rounded-xl bg-white/70 p-3 leading-5">
                        <div>Maintenance worker</div>
                        <div class="mt-2 font-mono text-xs text-gray-700">maint1@sys.com</div>
                        <div class="font-mono text-xs text-gray-700">pass789</div>
                    </div>
                    <div class="rounded-xl bg-white/70 p-3 leading-5">
                        <div>Admin</div>
                        <div class="mt-2 font-mono text-xs text-gray-700">admin@sys.com</div>
                        <div class="font-mono text-xs text-gray-700">admin123</div>
                    </div>
                </div>
            </aside>
        </transition>

        <div class="w-[422px] min-h-[433px] p-14 pb-6 bg-beige rounded-xl overflow-hidden shadow-lg">
            <RouterView />
        </div>
    </div>
</template>

<script>
import Login from './Auth_components/Login.vue';
import Register from './Auth_components/Register.vue';

export default {
    data() {
        return {
            showUseCases: false,
        }
    },
    components: {
        Login,
        Register,
    }
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.18s ease, transform 0.18s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
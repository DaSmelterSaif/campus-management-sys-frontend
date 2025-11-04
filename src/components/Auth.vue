<template>
    <div class="h-screen flex justify-center items-center bg-linear-180 from-39% from-white to-100% to-gray-400">
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
        return {}
    },
    components: {
        Login,
        Register,
    }
}
</script>

<style scoped></style>
<template>
    <div>
        <h1 class="mb-12 text-5xl font-semibold font-inter">Register</h1>
        <form>
            <input class="bg-white w-full px-2 mb-9 h-9 rounded-xl text-xl font-inter" type="email" name="email"
                id="email" placeholder="Email" maxlength="256">
            <input class="bg-white w-full px-2 mb-7 h-9 rounded-xl text-xl font-inter" type="password" name="password"
                id="password" placeholder="Password">
            <router-link
                class="block-inline text-primary underline underline-offset-4 decoration-2 text-xl hover:underline-offset-8 transition-all after:block after:mb-10"
                to="/auth/login">← Login
            </router-link>
            <Button class="w-[120px] h-[37px] text-xl float-right" btn-word="Submit" />
        </form>
    </div>
</template>

<script>
import Button from '../Button.vue';

export default {
    data() {
        return {}
    },
    components: {
        Button,
    }
}
</script>

<style scoped></style>

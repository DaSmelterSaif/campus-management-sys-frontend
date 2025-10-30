<template>
    <div class="h-screen flex justify-center items-center bg-linear-180 from-39% from-white to-100% to-gray-400">
        <div class="w-[422px] h-[433px] p-14 pb-0 bg-beige rounded-xl overflow-hidden">
            <h1 class="mb-12 text-5xl font-semibold font-inter">Login</h1>
            <form>
                <input class="bg-white w-full px-2 mb-9 h-9 rounded-xl text-xl font-inter" type="email" name="email"
                    id="email" placeholder="Email" maxlength="256">
                <input class="bg-white w-full px-2 mb-7 h-9 rounded-xl text-xl font-inter" type="password"
                    name="password" id="password" placeholder="Password">
                <a class="block-inline text-primary underline underline-offset-4 decoration-2 text-xl hover:underline-offset-8 transition-all after:block after:mb-10"
                    href="">Register
                    →</a>
                <Button class="w-[120px] h-[37px] text-xl float-right" btn-word="Submit" />
            </form>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';

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
<template>
    <div class="h-screen flex justify-center items-center bg-linear-180 from-39% from-white to-100% to-gray-400">
        <div class="w-[422px] h-[433px] p-14 bg-beige rounded-xl">
            <h1 class="mb-12 text-5xl font-semibold font-inter">Login</h1>
            <form>
                <input class="bg-white w-full px-2 mb-9 h-9 rounded-xl text-xl font-inter" type="email" name="email"
                    id="email" placeholder="Email" maxlength="256">
                <input class="bg-white w-full px-2 mb-7 h-9 rounded-xl text-xl font-inter" type="password"
                    name="password" id="password" placeholder="Password">
                <a class="text-primary underline underline-offset-4 decoration-2 text-xl">Register -></a>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {}
    },
}
</script>

<style scoped></style>
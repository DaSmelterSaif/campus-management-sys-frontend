<template>
    <router-link :to="serviceIp"
        class="bg-primary hover:bg-hovered-btn active:bg-clicked-btn text-white select-none transition-colors rounded-xl">{{
            btnWord
        }}</router-link>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: ['btnWord', 'serviceIp'],
}
</script>

<style></style>

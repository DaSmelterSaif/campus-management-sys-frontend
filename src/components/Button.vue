<template>
    <button
        class="bg-primary hover:bg-hovered-btn active:bg-clicked-btn text-white select-none transition-colors rounded-xl">{{
            btnWord
        }}</button>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: ['btnWord'],
}
</script>

<style></style>
<template>
    <div class="w-full aspect-square select-none" @click="$emit('click')" :title="title">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: { type: String, default: "" }
    },
    emits: ["click"]
}
</script>

<style scoped></style>
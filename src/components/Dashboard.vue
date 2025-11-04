<template>
    <div class="w-28 h-screen fixed top-0 left-0 bg-gray-700">
        <SidebarButton class="bg-primary flex justify-center items-center">LOGO HERE</SidebarButton>
        <SidebarButton class="bg-gray-600" />
    </div>
</template>

<script>
import SidebarButton from './Dashboard_components/SidebarButton.vue';

export default {
    data() {
        return {

        }
    },
    components: {
        SidebarButton
    }
}
</script>

<style scoped></style>

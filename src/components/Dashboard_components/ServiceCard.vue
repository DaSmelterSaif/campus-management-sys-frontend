<template>
    <div class="w-70 h-75 p-4 relative rounded-xl bg-gray-200 shadow-xl/15">
        <h2 class="text-2xl font-semibold">
            <slot />
        </h2>
        <LinkButton class="absolute bottom-4 right-4 px-4 py-2" :btn-word="btnWord" :service-ip="serviceIp" />
    </div>
</template>

<script>
import LinkButton from '../LinkButton.vue';

export default {
    data() {

    },
    components: {
        LinkButton,
    },
    props: ['btnWord', 'serviceIp'],
}
</script>
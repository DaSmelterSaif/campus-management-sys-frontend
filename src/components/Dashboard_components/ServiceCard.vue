<template>
    <div :class="[
        'w-70 h-75 p-4 relative rounded-xl shadow-xl/15',
        disabled ? 'bg-gray-300 opacity-50' : 'bg-gray-200'
    ]">
        <div v-if="disabled" class="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
            Coming Soon
        </div>
        <h2 class="text-2xl font-semibold mb-2">
            <slot />
        </h2>
        <p class="text-gray-600 text-sm mb-4">{{ serviceDescription }}</p>
        <LinkButton class="absolute bottom-4 right-4 px-4 py-2" :btn-word="btnWord" :service-ip="serviceIp"
            :disabled="disabled" />
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
    props: ['btnWord', 'serviceIp', 'serviceDescription', 'disabled'],
}
</script>
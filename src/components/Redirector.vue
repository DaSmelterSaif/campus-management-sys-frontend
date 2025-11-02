<template></template>

<script>
export default {
    mounted() {
        // TODO - Check if the user is logged in or not
        this.$router.push('./auth/login');
    }
}
</script>
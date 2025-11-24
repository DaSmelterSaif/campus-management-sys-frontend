<template>
    <div>
        <h1 class="mb-12 text-5xl font-semibold">Login</h1>
        <form @submit.prevent="handleLogin">
            <input required class="bg-white w-full px-2 mb-9 h-9 rounded-xl text-xl font-inter" type="email"
                name="email" id="email" placeholder="Email" maxlength="256" v-model="email">
            <input required class="bg-white w-full px-2 mb-7 h-9 rounded-xl text-xl font-inter" type="password"
                name="password" id="password" placeholder="Password" v-model="password">
            <div v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</div>
            <router-link
                class="block-inline text-primary underline underline-offset-4 decoration-2 text-xl hover:underline-offset-8 transition-all after:block after:mb-10"
                to="/auth/register">Register
                →</router-link>
            <Button class="w-[120px] h-[37px] text-xl float-right" btn-word="Submit" :disabled="isLoading" />
        </form>
    </div>
</template>

<script>
import Button from '../Button.vue';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            isLoading: false,
        }
    },
    components: {
        Button,
    },
    methods: {
        async handleLogin() {
            this.errorMessage = '';
            this.isLoading = true;

            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                    }),
                });

                if (response.status === 200) {
                    const data = await response.json();
                    // Save user data to localStorage
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('isLoggedIn', 'true');

                    // Redirect to dashboard
                    this.$router.push('/dashboard');
                } else if (response.status === 401) {
                    const data = await response.json();
                    this.errorMessage = data.message || 'Invalid credentials.';
                } else {
                    this.errorMessage = 'An error occurred. Please try again.';
                }
            } catch (error) {
                this.errorMessage = 'Failed to connect to the server.';
                console.error('Login error:', error);
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>

<style scoped></style>

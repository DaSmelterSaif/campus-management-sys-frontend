<template>
    <div>
        <h1 class="mb-12 text-5xl font-semibold">Register</h1>
        <form>
            <!-- Name -->
            <input class="bg-white w-full px-2 mb-9 h-9 rounded-xl text-xl" type="text" name="name" id="name"
                placeholder="Name">
            <!-- Email -->
            <input class="bg-white w-full px-2 mb-9 h-9 rounded-xl text-xl" type="email" name="email" id="email"
                placeholder="Email" maxlength="256">
            <!-- Password -->
            <input class="bg-white w-full px-2 mb-9 h-9 rounded-xl text-xl" type="password" name="password"
                id="password" placeholder="Password">
            <!-- Confirm password -->
            <input class="bg-white w-full px-2 mb-9 h-9 rounded-xl text-xl" type="password" name="confirmPassword"
                id="confirmPassword" placeholder="Confirm password">
            <!-- Student or faculty -->
            <div class="flex flex-row gap-5 mb-7 w-full h-9">
                <input class="hidden peer/student" type="radio" name="studentFaculty" id="student" value="Student">
                <label
                    class="bg-muted text-white peer-checked/student:bg-primary active:bg-clicked-btn select-none flex flex-1 justify-center items-center px-2 w-max-1/2 h-full rounded-xl text-xl"
                    for="student">Student</label>
                <input class="hidden peer/faculty" type="radio" name="studentFaculty" id="faculty" value="faculty">
                <label
                    class="bg-muted text-white peer-checked/faculty:bg-primary active:bg-clicked-btn select-none flex flex-1 justify-center items-center px-2 w-max-1/2 h-full rounded-xl text-xl"
                    for="faculty">Faculty</label>
            </div>

            <router-link
                class="block-inline text-primary underline underline-offset-4 decoration-2 text-xl hover:underline-offset-8 transition-all after:block after:mb-10"
                to="/auth/login">← Login
            </router-link>
            <Button class="w-[120px] h-[37px] text-xl float-right" btn-word="Submit" />
        </form>
    </div>
</template>

<script>
import Button from '../Button.vue';

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

<template>
    <!-- Form submission handler: @submit.prevent prevents page reload -->
    <form v-if="schema && schema.fields" class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Loop through each field definition in schema.fields -->
        <div v-for="(field, idx) in schema.fields" :key="idx" class="flex flex-col">
            <label :for="field.key" class="mb-1 font-medium">
                {{ field.label }} <span v-if="field.required" class="text-red-600">*</span>
            </label>

            <!-- Render text/number/email/date/time inputs: checks if field.type matches any in the array -->
            <input v-if="['text', 'number', 'email', 'date', 'time'].includes(field.type)" :id="field.key" :class="[
                'px-3 py-2 rounded-md border-2 border-secondary focus:outline-none focus:ring-2 focus:ring-primary',
                isReadOnlyField(field.key) || isDisabledField(field.key) ? 'bg-gray-200 cursor-not-allowed' : 'bg-slate-100'
            ]" v-model="form[field.key]" :type="field.type" :placeholder="field.placeholder || ''"
                :required="field.required" :disabled="isReadOnlyField(field.key) || isDisabledField(field.key)" />

            <!-- Textarea -->
            <textarea v-else-if="field.type === 'textarea'" :id="field.key"
                class="px-3 py-2 rounded-md border-2 border-secondary bg-slate-100 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
                v-model="form[field.key]" :placeholder="field.placeholder || ''" :required="field.required" />

            <!-- Select dropdown: renders options from field.options array -->
            <select v-else-if="field.type === 'select'" :id="field.key"
                class="px-3 py-2 rounded-md border-2 border-secondary bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                v-model="form[field.key]" :required="field.required">
                <option disabled value="">{{ field.placeholder || 'Select…' }}</option>
                <!-- Handle both simple strings and objects: opt.value || opt catches both formats -->
                <option v-for="opt in field.options || []" :key="opt.value || opt" :value="opt.value || opt">
                    {{ opt.label || opt }}
                </option>
            </select>

            <!-- Checkbox: boolean value stored in form[field.key] -->
            <div v-else-if="field.type === 'checkbox'" class="flex items-center gap-3">
                <input type="checkbox" :id="field.key" v-model="form[field.key]" />
                <span class="text-sm">{{ field.description }}</span>
            </div>

            <!-- Fallback for unknown types -->
            <input v-else :id="field.key"
                class="px-3 py-2 rounded-md border-2 border-secondary bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                v-model="form[field.key]" :placeholder="field.placeholder || ''" />

            <!-- Display validation errors for this field -->
            <p v-if="errors[field.key]" class="text-sm text-red-600 mt-1">{{ errors[field.key] }}</p>
        </div>

        <div class="flex items-center justify-between pt-4">
            <div class="flex gap-2">
                <slot name="left-actions" />
                <button v-if="readOnlyFields.length > 0 && readOnlyFields.includes('bookingId')" type="button"
                    @click="showBookingsModal = true"
                    class="bg-secondary hover:bg-hovered-btn text-white px-4 py-2 rounded-xl select-none transition-colors">
                    View Bookings
                </button>
                <button v-if="readOnlyFields.length > 0 && readOnlyFields.includes('eventId')" type="button"
                    @click="showEventsModal = true"
                    class="bg-secondary hover:bg-hovered-btn text-white px-4 py-2 rounded-xl select-none transition-colors">
                    View Events
                </button>
                <button v-if="readOnlyFields.length > 0 && readOnlyFields.includes('requestId')" type="button"
                    @click="showMaintenanceModal = true"
                    class="bg-secondary hover:bg-hovered-btn text-white px-4 py-2 rounded-xl select-none transition-colors">
                    View Maintenance Requests
                </button>
            </div>
            <button type="submit"
                class="bg-primary hover:bg-hovered-btn active:bg-clicked-btn text-white px-4 py-2 rounded-xl select-none transition-colors">
                {{ submitLabel || 'Submit' }}
            </button>
        </div>
    </form>

    <!-- Response Modal -->
    <ResponseModal :data="responseData" :isOpen="showModal" @close="showModal = false" />

    <!-- Bookings Modal -->
    <BookingsModal :is-open="showBookingsModal" :user-id="getUserId()" :fetch-all-bookings="isAdminApproveReject"
        @close="showBookingsModal = false" @booking-selected="onBookingSelected" />

    <!-- Events Modal -->
    <EventsModal :is-open="showEventsModal" :user-id="getUserId()" @close="showEventsModal = false"
        @event-selected="onEventSelected" />

    <!-- Maintenance Modal -->
    <MaintenanceModal :is-open="showMaintenanceModal" :user-id="getUserId()" @close="showMaintenanceModal = false"
        @request-selected="onMaintenanceRequestSelected" />
</template>

<script>
import ResponseModal from './ResponseModal.vue';
import BookingsModal from './BookingsModal.vue';
import EventsModal from './EventsModal.vue';
import MaintenanceModal from './MaintenanceModal.vue';

export default {
    name: "FormBuilder",
    props: {
        schema: { type: Object, required: true },
        submitUrl: { type: String, default: "" },
        method: { type: String, default: "POST" },
        accessToken: { type: String, default: "" },
        submitLabel: { type: String, default: "Submit" },
        readOnlyFields: { type: Array, default: () => [] },
        disabledFields: { type: Array, default: () => [] },
        isAdminApproveReject: { type: Boolean, default: false }
    },
    emits: ["submitted", "error"],
    data() {
        // Initialize form object: map each field.key to its default value (or empty string)
        const initial = {};
        (Array.isArray(this.schema.fields) ? this.schema.fields : []).forEach(f => {
            // Checkboxes start as false, others as empty string
            if (f.type === "checkbox") initial[f.key] = !!f.default;
            else if (f.type === "select") initial[f.key] = f.default ?? "";
            else initial[f.key] = f.default ?? "";
        });
        return { form: initial, errors: {}, showModal: false, responseData: null, showBookingsModal: false, showEventsModal: false, showMaintenanceModal: false };
    },
    methods: {
        getUserId() {
            return localStorage.getItem('userId') || '';
        },
        isReadOnlyField(fieldKey) {
            return this.readOnlyFields.includes(fieldKey);
        },
        isDisabledField(fieldKey) {
            return this.disabledFields && this.disabledFields.includes(fieldKey);
        },
        // Validate form before submission: check required fields and email format
        validate() {
            const errs = {};
            for (const f of this.schema.fields) {
                const v = this.form[f.key];
                // Check if required field is empty (handles "", null, undefined, and whitespace)
                if (f.required && (v === "" || v === null || v === undefined || (typeof v === 'string' && v.trim() === ''))) {
                    errs[f.key] = "This field is required.";
                    continue;
                }
                // Email validation: basic regex check
                if (f.type === 'email' && v) {
                    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                    if (!ok) errs[f.key] = "Please enter a valid email.";
                }
                // Number min/max constraints
                if (f.min && typeof v === 'number' && v < f.min) errs[f.key] = `Minimum is ${f.min}.`;
                if (f.max && typeof v === 'number' && v > f.max) errs[f.key] = `Maximum is ${f.max}.`;
            }
            this.errors = errs;
            return Object.keys(errs).length === 0; // true if no errors
        },
        async handleSubmit() {
            console.log(this.form);
            // Prevent submission if validation fails
            if (!this.validate()) {
                this.$emit('error', { type: 'validation', errors: this.errors });
                return;
            }
            // Merge form data with static metadata (if provided in schema.meta.static)
            const payload = { ...this.form, ...(this.schema.meta?.static || {}) };

            try {
                // If no submitUrl, just emit the form data (let parent handle submission)
                if (!this.submitUrl) {
                    this.$emit('submitted', payload);
                    return;
                }
                // Send form data to backend
                const res = await fetch(this.submitUrl, {
                    method: this.method || "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        // Add auth token if provided
                        ...(this.accessToken ? { 'Authorization': `Bearer ${this.accessToken}` } : {})
                    },
                    body: JSON.stringify(payload)
                });
                // Try parsing response as JSON, fallback to empty object if not JSON
                const data = await res.json().catch(() => ({}));
                // Throw error if response status is not ok
                if (!res.ok) throw new Error(data?.message || res.statusText);
                // Emit success with response data
                this.$emit('submitted', { payload, response: data });
                // Show modal with response
                this.responseData = data;
                this.showModal = true;
            } catch (e) {
                // Emit error if network or response fails
                this.$emit('error', { type: 'network', message: e.message });
            }
        },
        onBookingSelected(booking) {
            // Auto-fill form with selected booking data
            this.form.bookingId = booking.bookingId;
            this.form.roomId = booking.roomId;
            this.form.date = booking.date;
            this.form.startTime = booking.startTime;
            this.form.endTime = booking.endTime;
            if (this.form.status !== undefined) {
                this.form.status = booking.status;
            }
        },
        onEventSelected(event) {
            // Auto-fill form with selected event data
            this.form.eventId = event.eventId;
        },
        onMaintenanceRequestSelected(request) {
            // Auto-fill form with selected maintenance request data
            this.form.requestId = request.requestId;
            if (this.form.status !== undefined) {
                this.form.status = request.status;
            }
            if (this.form.description !== undefined) {
                this.form.description = request.description;
            }
        }
    },
    components: {
        ResponseModal,
        BookingsModal,
        EventsModal,
        MaintenanceModal
    }
};
</script>

<style scoped></style>
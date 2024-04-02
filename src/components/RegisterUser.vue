<template>
  <div class="registration-form">
    <h2>Registration</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="firstname" class="form-label">First name:</label>
        <input type="text" id="firstname" v-model="firstname" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Last name:</label>
        <input type="text" id="lastname" v-model="lastname" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="password_confirmation" class="form-label">Confirm Password:</label>
        <input type="password" id="password_confirmation" v-model="passwordConfirmation" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  },
  methods: {
    async submitForm() {
      if (this.password !== this.passwordConfirmation) {
        // Display error message or prevent form submission
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        // Registration successful
        alert('Registration successful!'); // Show success message
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Registration failed. Please try again.'); // Show error message
      }
    }
  }
};
</script>

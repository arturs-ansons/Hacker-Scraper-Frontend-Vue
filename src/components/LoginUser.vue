<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
    successMessage() {
      return this.$store.getters.successMessage;
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        this.$router.push('/articles');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  }
};
</script>


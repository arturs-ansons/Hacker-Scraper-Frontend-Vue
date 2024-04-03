<template>
  
  <div>
    <nav class="navbar">
      <div class="navbar-right">
        <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
        <span class="separator" v-if="!isLoggedIn">|</span>
        <router-link to="/register" v-if="!isLoggedIn">Register</router-link>
        <div class="logout-button" v-if="isLoggedIn">
          <button @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const router = useRouter()
const store = useStore()

const isLoggedIn = computed(() => store.getters.isAuthenticated)

const logout = () => {
  store.dispatch('logout')
    .then(() => {
      router.push('/login')
    })
    .catch(error => {
      console.error('Logout error:', error)
      router.push('/login')
    })
}
</script>
<style src="@/assets/styles.css"></style>


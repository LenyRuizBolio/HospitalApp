<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Registrarse</h2>
      <form @submit.prevent="signUp" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" 
                 class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                 placeholder="tu@email.com" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input v-model="password" type="password" 
                 class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                 placeholder="Contraseña" required />
        </div>
        <button type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
          Registrarse
        </button>
      </form>
      <p class="text-center mt-6 text-gray-600">
        ¿Ya tienes cuenta? 
        <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-medium">Inicia Sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase.js'

const email = ref('')
const password = ref('')
const router = useRouter()

const signUp = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
  if (error) {
    alert(error.message)
  } else {
    alert('Revisa tu email para confirmar la cuenta')
    router.push('/login')
  }
}
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
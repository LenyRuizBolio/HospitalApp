<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md border border-slate-200">
      <h2 class="text-3xl font-light text-slate-800 mb-8 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-2">Correo Electrónico</label>
          <input v-model="email" type="email" 
                 class="w-full px-4 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50" 
                 placeholder="tu@email.com" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-2">Contraseña</label>
          <input v-model="password" type="password" 
                 class="w-full px-4 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-slate-50" 
                 placeholder="Contraseña" required />
        </div>
        <button type="submit" 
                class="w-full bg-slate-700 hover:bg-slate-800 text-white font-medium py-4 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          Iniciar Sesión
        </button>
      </form>
      <p class="text-center mt-8 text-slate-500">
        ¿No tienes cuenta? 
        <router-link to="/signup" class="text-slate-700 hover:text-slate-800 font-medium transition-colors">Regístrate</router-link>
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

const login = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    alert(error.message)
  } else {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
/* Estilos adicionales si es necesario, pero usando principalmente Tailwind */
</style>
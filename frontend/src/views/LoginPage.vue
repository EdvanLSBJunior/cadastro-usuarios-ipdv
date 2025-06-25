<template>
  <v-container class="fill-height d-flex align-center justify-center" fluid>
    <v-card class="pa-8" width="400" elevation="12" rounded="xl">
      <v-card-title class="text-h5 text-center mb-4">Login</v-card-title>

      <v-form @submit.prevent="handleLogin" ref="form">
        <v-text-field
          v-model="email"
          label="E-mail"
          type="email"
          prepend-inner-icon="mdi-email"
          :rules="[rules.required, rules.email]"
          outlined
          dense
          hide-details="auto"
          class="mb-4"
        />

        <v-text-field
          v-model="password"
          label="Senha"
          type="password"
          prepend-inner-icon="mdi-lock"
          :rules="[rules.required]"
          outlined
          dense
          hide-details="auto"
          class="mb-6"
        />

        <v-btn type="submit" color="primary" block class="text-white" :loading="loading">
          Entrar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
}

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    })

    const token = response.data.token
    localStorage.setItem('token', token)
    router.push('/colaboradores')
  } catch (error) {
    alert('Falha no login. Verifique suas credenciais.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.v-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
}
</style>

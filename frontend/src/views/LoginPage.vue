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
  <v-dialog v-model="dialog" max-width="400">
     <v-card>
      <v-card-title class="text-h6">Erro ao logar</v-card-title>
      <v-card-text>{{ dialogMessage }}</v-card-text>
      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="dialog = false">OK</v-btn>
      </v-card-actions>
     </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import EditUserModal from '@/components/EditUserModal.vue'


const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const dialog = ref(false)
const dialogMessage = ref('')

const rules = {
  required: (value: string) => !!value || 'Campo obrigatório',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'E-mail inválido'
  }
}

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      email: email.value,
      password: password.value,
    })

    const { token, user } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    router.push('/colaboradores')
  } catch (error) {
     dialogMessage.value = 'E-mail ou senha inválidos. Verifique os dados e tente novamente.'
     dialog.value = true

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

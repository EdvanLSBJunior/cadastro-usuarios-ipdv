<template>
  <v-app-bar color="primary" dark>
    <v-toolbar-title class="text-h6">Painel Administrativo - IPDV</v-toolbar-title>

    <v-spacer />

    <v-btn text @click="router.push('/colaboradores')">Colaboradores</v-btn>
    <v-btn text @click="router.push('/roles')">Cargos</v-btn>
    <v-btn text color="red" @click="logout">Sair</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/')
}
</script>

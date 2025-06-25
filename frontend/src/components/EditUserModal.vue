<template>
  <v-dialog :model-value="isOpen" @update:model-value="val => emit('update:isOpen', val)" max-width="500px">
    <v-card>
      <v-card-title class="text-h6">Editar Colaborador</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <v-text-field
            v-model="formData.name"
            label="Nome"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="formData.email"
            label="E-mail"
            :rules="[rules.required, rules.email]"
          />
          <v-select
            v-model="formData.roleId"
            :items="roles"
            item-title="name"
            item-value="id"
            label="Cargo"
            :rules="[rules.required]"
          />
          <v-switch
            v-model="formData.active"
            label="Usuário Ativo"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Cancelar</v-btn>
        <v-btn color="primary" @click="submit" :disabled="!isValid">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps<{ user: any, isOpen: boolean }>()
const emit = defineEmits(['update:isOpen', 'updated'])

const isValid = ref(false)
const form = ref()
const formData = ref({ name: '', email: '', active: true, roleId: null })
const roles = ref([])

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail inválido'
}

watch(() => props.user, (user) => {
  if (user) {
    formData.value = {
      name: user.name,
      email: user.email,
      active: user.active,
      roleId: user.role?.id || null
    }
  }
}, { immediate: true })

const close = () => emit('update:isOpen', false)

const submit = async () => {
  if (!form.value?.validate()) return

  try {
    await axios.put(`http://localhost:3000/api/admin/users/${props.user.id}`, formData.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    emit('updated')
    close()
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err)
  }
}

const fetchRoles = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/roles/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    roles.value = res.data
  } catch (err) {
    console.error('Erro ao buscar cargos:', err)
  }
}

onMounted(fetchRoles)
</script>
<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card>
      <v-card-title class="text-h6">
        {{ role?.id ? 'Editar Cargo' : 'Novo Cargo' }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submitForm" ref="formRef">
          <v-text-field
            v-model="form.name"
            label="Nome do Cargo"
            :rules="[rules.required]"
            required
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="isOpen = false">Cancelar</v-btn>
        <v-btn color="primary" @click="submitForm">
          {{ role?.id ? 'Salvar' : 'Criar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import axios from 'axios'

const props = defineProps<{
  isOpen: boolean
  role: { id?: number; name: string } | null
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'updated'): void
}>()

const isOpen = computed({
  get: () => props.isOpen,
  set: (val) => emit('update:isOpen', val),
})

const formRef = ref()
const form = ref({ name: '' })

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
}

watch(
  () => props.role,
  (newVal) => {
    form.value.name = newVal?.name || ''
  },
  { immediate: true }
)

const submitForm = async () => {
  if (!(await formRef.value.validate())) return

  try {
    if (props.role?.id) {
      await axios.put(`http://localhost:3000/api/roles/${props.role.id}`, form.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
    } else {
      await axios.post('http://localhost:3000/api/roles/', form.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
    }

    emit('updated')
    isOpen.value = false
  } catch (err) {
    console.error('Erro ao salvar cargo:', err)
  }
}
</script>

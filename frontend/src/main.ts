import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vuetify } from './plugins/vuetify'
// import { createUseDialog } from 'vuetify-use-dialog'

import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

// const useDialog = createUseDialog(vuetify)
// app.provide('useDialog', useDialog)

app.use(router)
app.use(vuetify)
// app.use(createVuetifyUseDialog())

app.mount('#app')

import './shared/styles/base.css'
import { QueryClient, VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'

import { createApp } from 'vue'
import App from './App.vue'
import router from './views'

const app = createApp(App)

const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: false,
          retry: false,
        }
      }
    }
  };

app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(router)
app.mount('#app')

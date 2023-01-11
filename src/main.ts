import { createApp } from 'vue'
import App from './App.vue'

import BaseImage from '@/components/base/Image.vue'
import TextBlock from '@/components/base/TextBlock.vue'

const app = createApp(App)

app.component('BaseImage', BaseImage)
app.component('BaseTextBlock', TextBlock)

app.mount('#app')

import { createApp } from 'vue'
import {
  ConfigProvider,
  Layout,
  Row,
  Col,
  Divider,
} from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'

import App from './App.vue'

ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
});

const app = createApp(App)

app.use(Layout)
app.use(Row).use(Col).use(Divider)
app.mount('#app')

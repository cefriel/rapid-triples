import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { brand } from '@/config/branding'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: brand.primary,
          secondary: brand.secondary,
          info: brand.primary,
          error: '#d32f2f',
        },
      },
    },
  },
})

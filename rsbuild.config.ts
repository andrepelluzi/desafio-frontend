import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: 'src/template.html',
    meta: {
      title: 'Diretório de Usuários',
      description:
        'Busca e visualiza usuários na API do jsonplaceholder.typicode.com'
    }
  }
})

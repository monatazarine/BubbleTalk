import { extendTheme } from '@chakra-ui/react';
const theme = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true
  },
  styles: {
    global: {
      body: {
        'margin': '0',
      },
      code: {
        'fontSize': '15px',
        'lineHeight': '135%',
        'padding': '4px 8px',
        'background': 'var(--code-bg)'
      }
    }
  }
}

export default extendTheme(theme);
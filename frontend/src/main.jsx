import { ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
</BrowserRouter>
  </StrictMode>,
)

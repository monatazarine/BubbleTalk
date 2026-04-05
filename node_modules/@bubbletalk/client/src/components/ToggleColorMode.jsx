import { Button, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
const ToggleColorMode = () => {
             const { colorMode, toggleColorMode } = useColorMode();
             return (
                         <Button onClick={()=>toggleColorMode()} pos="absolute" top="1rem" right="1rem" m="1rem">
                          {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                           </Button>
             )
}

export default ToggleColorMode;
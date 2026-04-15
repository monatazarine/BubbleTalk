import React from 'react'
import { Button, Heading, HStack, VStack } from '@chakra-ui/react'
export const Sidebar = () => {
  return (
    <VStack py="l.4rem">
      <HStack justify="space-between" w="100%" px="1.4rem">
             <Heading size="md">Add Friend</Heading>
             <Button>
             
                   <chatIcon color="blue.500" boxSize={5} /> 
             </Button>
      </HStack>
    </VStack>
  )
}

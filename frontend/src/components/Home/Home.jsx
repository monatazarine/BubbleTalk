import React from 'react';
import { Grid,GridItem } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
const Home = () => {
             return(
             <Grid templateColumns="repeat(10,lfr)" h="100vh">
                   <GridItem colSpan="3" borderRight="1px solid gray">
                      <Sidebar/>
                  </GridItem>
                   <GridItem colSpan="7"></GridItem>

             </Grid>            
)

}
export default Home;

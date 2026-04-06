
import {VStack, ButtonGroup,Button, Heading} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import TextField from "./TextField";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {formSchema} from "@bubbletalk/common";
import { useContext,useState } from "react";
import { AccountContext } from "../AccountContext";

const SignUp = () => {
    const [error , setErr] = useState(null);
    const {setAccount} = useContext(AccountContext);
    const navigate = useNavigate();
    return (
    <Formik  initialValues ={{username: '', password: ''}}
             validationSchema = {formSchema}
             onSubmit={(values, actions) => {
                          const vals = {...values};
                           actions.resetForm();
                          fetch("http://localhost:4000/auth/signup", {
                                       method: "POST",
                                       credentials: "include",
                                       headers: {
                                         "content-type": "application/json",
                                       },
                                       body: JSON.stringify(vals)
                                     })
                                       .catch(err => {
                                         return;})
                                         .then(res => {          
                                                     if (!res || !res.ok || res.status >= 400) {
                                                                  return;
                                                     }
                                                                 return res.json();

                                       })
                                       .then(data => {
                                         if (!data ) return;
                                         setAccount(data);

                                         if(data.status ){
                                            setErr(data.message);
                                            return;
                                         }else if(data.loggedIn){
                                         navigate('/home') }       
                                       });
             }}
             >
       
           <VStack as ={Form }  spacing={4} w="100%" maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md" >
             <Heading>Sign Up</Heading>
             <Text as="p" color="red.500"> {error}</Text>
             <TextField label="Username"  name="username" placeholder="Enter your username" autoComplete="off"/>
             <TextField label="Password" name="password" type="password" placeholder="Enter your password" autoComplete="off"/>
          <ButtonGroup>
             <Button colorScheme="teal" type="submit">Sign Up</Button>
             <Button colorScheme="teal" variant="outline" onClick={()=> navigate("/")} leftIcon={<ArrowBackIcon/>}>Back</Button>
             </ButtonGroup>
        </VStack>

        
       </Formik>
             )
}
export default SignUp;

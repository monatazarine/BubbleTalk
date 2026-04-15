import {VStack, ButtonGroup,Button, Heading,Text} from "@chakra-ui/react";
import TextField from "./TextField";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {formSchema} from "@bubbletalk/common";
import { useContext ,useState} from "react";
import { AccountContext } from "../AccountContext";


const Login = () => {
   const [error , setErr] = useState(null);
   const { setAccount } = useContext(AccountContext);
   const navigate = useNavigate();
   // const formik = useFormik({
   //          initialValues: {username: '', password: ''},
   //          validationSchema: Yup.object({
   //              username: Yup.string().required('Username is required').min(6, 'Username must be at least 6 characters'),
   //              password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),}),
   //          onSubmit: (values, actions) => {
   //              alert(JSON.stringify(values, null, 2));
   //                        actions.resetForm();
   //          }
   //      });

    return (
    <Formik  initialValues ={{username: '', password: ''}}
             validationSchema = {formSchema}
             onSubmit={(values, actions) => {
                 const vals = {...values};
                           actions.resetForm();
                          fetch("http://localhost:4000/auth/login", {
                                       method: "POST",
                                       credentials: "include",
                                       headers: {
                                         "content-type": "application/json",
                                       },
                                       body: JSON.stringify(vals)
                                     })
                                       .catch(err => {
                                           console.error(err);
                                          setErr("Server error");;})
                                         .then(res => {          
                                                     if (!res || !res.ok || res.status >= 400) {
                                                                  return;
                                                     }
                                                                 return res.json();

                                       })
                                       .then(data => {
                                         if (!data ) return;
                                         console.log(data);                        
                                         setAccount(data);

                                         if(data.status ){
                                            setErr(data.message);
                                            return;
                                         }else if(data.loggedIn){
                                         navigate('/home') }       
                                       });
             
             }}>
       
           <VStack as ={Form }  spacing={4} w="100%" maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md" >
             <Heading>LOG IN</Heading>
             <Text as="p" color="red.500"> {error}</Text>
             
             <TextField label="Username"  name="username" placeholder="Enter your username" autoComplete="off"/>
             <TextField label="Password" name="password" type="password" placeholder="Enter your password" autoComplete="off"/>
          <ButtonGroup>
             <Button colorScheme="teal" type="submit">Login</Button>
             <Button colorScheme="teal" variant="outline" onClick={()=>navigate("/register")}>Create Account</Button>
             </ButtonGroup>
        </VStack>

        
       </Formik>
             )
}
export default Login;

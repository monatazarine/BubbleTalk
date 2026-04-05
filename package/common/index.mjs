import * as Yup from 'yup';

//the shape of the restriction of the data 
export const formSchema = Yup.object({
    username: Yup.string().required('Username is required').min(6, 'Username must be at least 6 characters'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
});
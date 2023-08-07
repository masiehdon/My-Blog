import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = () => {
  toast.success('Login successful!');
}

  export const toastSignUp = () => {
  toast.success('Signup successful')
}

export const toastError = () => {
  toast.error(`No user with this email found.`);
};

export const toastWarning = () => {
toast.warning(`All fields must be filled in.`)
}

export const toastSignOut = () => {
  toast.success('Sign out was successful')
}

export const toastSuccessDeleteBlog = () => {
toast.success('Blog was deleted')
}
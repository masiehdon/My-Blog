import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify';
 import { toastSuccess, toastError, toastSignUp, toastWarning, toastSignOut } from '../../components/toast/Toast'
 import 'react-toastify/dist/ReactToastify.css';
 

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
   
    if (user) {
      toastSuccess()
      console.log(user)
        setTimeout(() => {
        router.push("/");
       }, '2000')
      
    }
    
  }, [user, router]);

   const registerUser = async (email, password) => {
    try {
     
      // Register the user with Supabase
      const { error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
      });

      if (error) {
        throw new Error(error.message);
      }

      // Insert the user data into the specified table
      await supabaseClient
        .from('users')
        .insert([{ email, password }])
        .select()
      toastSignUp()
      
    } catch (error) {
      toastError();
    }
  };

  return (
    <>
    <ToastContainer />
    <Auth
      redirectTo="http://localhost:3000/"
      appearance={{ theme: ThemeSupa }}
      supabaseClient={supabaseClient}
      providers={[]}
      socialLayout="horizontal"
      registerFunction={registerUser}
      />
    </>
  );
};

export default LoginPage;
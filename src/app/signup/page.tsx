"use client";
import React, { use, useEffect } from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [user , setUser] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async() => {
    
    try {
      setLoading(true);
      await axios.post('/api/users/signup', user);
      toast.success("Signup successful");
      router.push('/login');
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup");
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.name.length > 0){
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>page</div>
  )
}




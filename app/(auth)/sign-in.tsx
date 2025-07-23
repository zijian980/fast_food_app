import {View, Text, Button, Alert} from 'react-native'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import React, {useState} from "react";
import {signIn} from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({email:'',password:''})
    const { fetchAuthenticatedUser } = useAuthStore();

    const submit = async ()=>{
        const { email, password} = form;

        if(!email || !password) return Alert.alert('Error', 'Please Enter valid email and password');

        setIsSubmitting(true)

        try{
            await signIn({email, password});
            // Update authentication state before navigation
            await fetchAuthenticatedUser();
            router.replace('/');
        } catch (error: any){
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text)=>setForm((prev)=>({...form,email:text}))}
                label="Email"
                keyboardType="email-address"
            />
            <CustomInput
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text)=>setForm((prev)=>({...form,password:text}))}
                label="Password"
                secureTextEntry={true}
            />

            <CustomButton
                title="Sign In"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Don't have an account?
                </Text>
                <Link className="base-bold text-primary" href="/sign-up">
                    Sign Up
                </Link>
            </View>
        </View>
    )
}
export default SignIn

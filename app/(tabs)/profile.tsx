import {View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import {images} from "@/constants";
import CustomButton from "@/components/CustomButton";
import {ProfileFieldProps} from "@/type";
import cn from "clsx";
import {useState, useEffect} from 'react';
import {useRouter} from 'expo-router';
import useAuthStore from '@/store/auth.store';

const ProfileField = ({label, value, icon}: ProfileFieldProps )=>(
    <View className="profile-field">
        <View className="profile-field__icon">
            <Image source={icon} className="size-6" resizeMode="contain" />
        </View>
        <View>
            <Text className="body-medium text-gray-500">{label}</Text>
            <Text className="paragraph-semibold text-dark-100">{value}</Text>
        </View>
    </View>
)
const Profile = () => {

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="pb-28 px-5 pt-5">
                <CustomHeader title="Profile" />
                <View className="flex flex-col items-center relative mt-2">
                    <Image source={images.avatar} className=" size-32 rounded-full" resizeMode="contain" />
                </View>

                <View className="mt-6 p-5 ">
                        <ProfileField
                            label="Full Name"
                            value="John Doe"
                            icon={images.user}
                        />
                        <ProfileField
                            label="Email"
                            value="john.doe@example.com"
                            icon={images.envelope}
                        />
                        <ProfileField
                            label="Phone Number"
                            value="+1 234 567 8900"
                            icon={images.phone}
                        />
                        <ProfileField
                            label="Address"
                            value="123 Main Street, City"
                            icon={images.location}
                        />
                        <View className="border-t border-gray-300 my-2" />

                    </View>

                <CustomButton
                    title="Edit Profile"
                    style="bg-primary/20"
                    textStyle="text-primary"
                />
                <CustomButton
                    title="Logout"
                    leftIcon={<Image source={images.logout} className="size-5 mr-2" resizeMode="contain" />}
                    style="bg-error/20"
                    textStyle="text-error"
                />
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile

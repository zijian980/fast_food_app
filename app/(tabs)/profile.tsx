import {View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import {useState, useEffect} from 'react'
import {useRouter} from 'expo-router'
import useAuthStore from '@/store/auth.store'
import CustomHeader from '@/components/CustomHeader'
import CustomButton from '@/components/CustomButton'
import {logout} from '@/lib/appwrite'
import {images} from '@/constants'

const ProfileField = ({label, value, icon}: {label: string, value: string, icon: any}) => {
    return (
        <View className="profile-field">
            <View className="profile-field__icon">
                <Image source={icon} className="size-6" resizeMode="contain" />
            </View>
            <View>
                <Text className="body-medium text-gray-500">{label}</Text>
                <Text className="paragraph-semibold text-dark-100">{value || 'Not provided'}</Text>
            </View>
        </View>
    )
}

const Profile = () => {
    const router = useRouter()
    const {user, isLoading, fetchAuthenticatedUser, setIsAuthenticated, setUser} = useAuthStore()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

   /*useEffect(() => {
        fetchAuthenticatedUser()
    }, [])*/

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)
            await logout()
            setIsAuthenticated(false)
            setUser(null)
            router.replace('/(auth)/sign-in')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setIsLoggingOut(false)
        }
    }

    const handleEditProfile = () => {
        router.push('/edit-profile')
    }

    if (isLoading) {
        return (
            <View className="flex-1 flex-center">
                <ActivityIndicator size="large" color="#FF6B00" />
            </View>
        )
    }

    return (
        <ScrollView className="flex-1 px-4 pt-10 bg-white">
            <CustomHeader title="Profile" />

            <View className="items-center mb-8">
                <View className="profile-avatar">
                    <Image
                        source={images.avatar}//{{uri: user?.avatar}}
                        className="size-28 rounded-full"
                        resizeMode="cover"
                    />
                </View>

            </View>

            <View className="mb-8 mx-3.5">

                <ProfileField
                    label="Full Name"
                    value={user?.name || ''}
                    icon={images.user}
                />
                <ProfileField
                    label="Email"
                    value={user?.email || ''}
                    icon={images.envelope}
                />
                <ProfileField
                    label="Phone Number"
                    value={user?.phone || ''}
                    icon={images.phone}
                />
                <ProfileField
                    label="Address 1 - (Home)"
                    value={user?.address || ''}
                    icon={images.location}
                />
                <ProfileField
                    label="Address 2 - (Office)"
                    value={user?.address || ''}
                    icon={images.location}
                />
            </View>

            <View className="gap-4 mb-10 mx-2">
                <CustomButton
                    title="Edit Profile"
                    onPress={handleEditProfile} //not implemented yet. future feature
                    //leftIcon={<Image source={images.pencil} className="size-5 mr-2" resizeMode="contain" />}
                    style="bg-orange-100 border border-orange-500"
                    textStyle="text-amber-500 text-1xl"
                />
                <CustomButton
                    title="Logout"
                    onPress={handleLogout}
                    isLoading={isLoggingOut}
                    style="bg-red-100 border border-red-500"
                    textStyle="text-red-500 text-1xl"
                    leftIcon={<Image source={images.logout} className="size-5 mr-2" resizeMode="contain" />}
                />
            </View>
        </ScrollView>
    )
}

export default Profile

import "./globals.css"
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl text-center font-bold text-primary font-quicksand">
                Welcome to my react native app!
            </Text>
        </View>
    );
}
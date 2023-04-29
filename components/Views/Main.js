import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import style from "../../style";
import * as MediaLibrary from "expo-media-library";
import { useFonts } from "expo-font";

export default function Main({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
        OpenSansLight: require("../../assets/fonts/OpenSans-Light.ttf"),
    });

    useEffect(() => {
        async function getPermission() {
            let { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") {
                alert("No media permission granted!");
            }
        }
        getPermission();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {fontsLoaded ? (
                <View style={style.main}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Gallery");
                        }}
                    >
                        <Text
                            style={[
                                style.defaultText,
                                {
                                    fontFamily: "OpenSansBold",
                                    fontSize: 54,
                                },
                            ]}
                        >
                            Camera App
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={[
                            style.defaultText,
                            {
                                fontFamily: "OpenSansLight",
                                fontSize: 22,
                                textAlign: "center",
                                padding: 20,
                            },
                        ]}
                    >
                        Manage your gallery, take new photos and more!
                    </Text>
                </View>
            ) : (
                <Text>none</Text>
            )}
        </View>
    );
}

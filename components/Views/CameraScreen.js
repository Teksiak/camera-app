import { View, Text, BackHandler, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import style from "../../style";
import MyButton from "../MyButton";
import BackButton from "../BackButton";
import CircleButton from "../CircleButton";

export default function CameraScreen({ route, navigation }) {
    const [cameraPermission, setCameraPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        async function getCameraPermission() {
            let status = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(status.granted);
        }
        getCameraPermission();
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackPress
            );
        };
    }, []);

    const handleBackPress = () => {
        navigation.goBack();
        return true;
    };

    async function takePhoto() {
        let foto = await this.camera.takePictureAsync();
        await MediaLibrary.createAssetAsync(foto.uri);
        ToastAndroid.showWithGravity(
            `Zapisano zdjęcie!`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {cameraPermission ? (
                <Camera
                    ref={(ref) => {
                        this.camera = ref; // Uwaga: referencja do kamery używana później
                    }}
                    style={{ flex: 1 }}
                    type={cameraType}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ margin: 15 }}>
                            <BackButton
                                passedFunc={() => {
                                    navigation.goBack();
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", paddingRight: 75, position: 'absolute', bottom: 50 }}>
                            <View style={{ width: 75, height: 75 }}>
                                <CircleButton
                                    onPress={() => {
                                        setCameraType((prev) =>
                                            prev == Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}
                                    content={require("../../assets/refresh.png")}
                                />
                            </View>
                            <View style={{ width: 100, height: 100 }}>
                                <CircleButton
                                    onPress={takePhoto}
                                    content={require("../../assets/camera.png")}
                                />
                            </View>
                        </View>
                    </View>
                </Camera>
            ) : (
                <View style={[style.gallery, { justifyContent: "center" }]}>
                    <Text
                        style={[
                            style.defaultText,
                            { fontSize: 32, fontWeight: "bold" },
                        ]}
                    >
                        No camera access granted!
                    </Text>
                </View>
            )}
        </View>
    );
}

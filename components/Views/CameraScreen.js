import { View, Text, BackHandler, ToastAndroid, Animated, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import style from "../../style";
import MyButton from "../MyButton";
import BackButton from "../BackButton";
import CircleButton from "../CircleButton";
import RadioGroup from "../RadioGroup";

const cameraRatios = {
    "16:9": "16:9",
    "4:3": "4:3",
};

export default function CameraScreen({ route, navigation }) {
    const cameraRef = useRef();
    const [cameraPermission, setCameraPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [whiteBalance, setWhiteBalance] = useState(
        Camera.Constants.WhiteBalance.auto
    );
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.auto);
    const [cameraRatio, setCameraRatio] = useState(cameraRatios["4:3"]);
    const [pictureSize, setPictureSize] = useState("320x240");
    const [allSizes, setAllSizes] = useState({});

    const [hidden, setHidden] = useState(true);
    const springAnim = useRef(new Animated.Value(-200)).current;

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

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if(hidden) {
                return
            }
            e.preventDefault()
            showSettings()
        })
        return unsubscribe
    }, [navigation, hidden])

    const showSettings = () => {
        Animated.spring(springAnim, {
            toValue: hidden ? 0 : -200,
            velocity: 1,
            tension: 0,
            friction: 10,
            useNativeDriver: true,
        }).start();

        setHidden((prev) => !prev);
    };

    const handleBackPress = () => {
        navigation.goBack();
        return true;
    };

    async function takePhoto() {
        let foto = await cameraRef.current.takePictureAsync();
        await MediaLibrary.createAssetAsync(foto.uri);
        ToastAndroid.showWithGravity(
            `Zapisano zdjęcie!`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    const getSizes = async () => {
        if (cameraRef.current) {
            const data = await cameraRef.current.getAvailablePictureSizesAsync(cameraRatio);
            setPictureSize(data[0])
            let temp = {}
            data.map(el => {
                temp[el] = el
            })
            setAllSizes(temp)
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {cameraPermission ? (
                <Camera
                    onCameraReady={() => {
                        getSizes()
                    }}
                    ref={(ref) => {
                        cameraRef.current = ref; // Uwaga: referencja do kamery używana później
                    }}
                    style={{ flex: 1 }}
                    type={cameraType}
                    ratio={cameraRatio}
                    whiteBalance={whiteBalance}
                    pictureSize={pictureSize}
                    flashMode={flashMode}
                >
                    <View style={{ flex: 1 }}>
                    <Animated.View
                        style={[
                            style.settings,
                            {
                                transform: [{ translateX: springAnim }],
                            },
                        ]}
                    >
                        <ScrollView style={{zIndex: 5, display: 'flex', flexDirection: 'column', gap: 20}}>
                            <RadioGroup title={"White Balance"} data={Camera.Constants.WhiteBalance} action={setWhiteBalance} option={"auto"}/>
                            <RadioGroup title={"Flash Mode"} data={Camera.Constants.FlashMode} action={setFlashMode} option={"auto"}/>
                            <RadioGroup title={"Camera Ratio"} data={cameraRatios} action={setCameraRatio} option={cameraRatio}/>
                            <RadioGroup title={"Picture Sizes"} data={allSizes} action={setPictureSize} option={pictureSize}/>
                        </ScrollView>
                    </Animated.View>
                        <View style={{ margin: 15 }}>
                            <BackButton
                                passedFunc={() => {
                                    navigation.goBack();
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,
                                width: "100%",
                                position: "absolute",
                                bottom: 50,
                            }}
                        >
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
                            <View style={{ width: 75, height: 75 }}>
                                <CircleButton
                                    onPress={showSettings}
                                    content={require("../../assets/settings.png")}
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

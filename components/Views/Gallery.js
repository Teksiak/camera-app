import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import style from "../../style";
import * as MediaLibrary from "expo-media-library";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";
import BackButton from "../BackButton";
import MyButton from "../MyButton";
import FotoItem from "../FotoItem";

export default function Gallery({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
        OpenSansLight: require("../../assets/fonts/OpenSans-Light.ttf"),
    });
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [wideDisplay, setWideDisplay] = useState(false);

    useEffect(() => {
        getPhotos();
        const refreshGallery = navigation.addListener("focus", () => {
            getPhotos();
        });
        return () => {
            refreshGallery();
        };
    }, []);

    const selectImage = (id) => {
        if (selectedImages.includes(id)) {
            setSelectedImages((prev) => prev.filter((el) => el != id));
        } else {
            setSelectedImages((prev) => [...prev, id]);
        }
    };

    async function getPhotos() {
        const album = await MediaLibrary.getAlbumAsync("DCIM");
        let data = await MediaLibrary.getAssetsAsync({
            album: album,
            first: 20,
            mediaType: "photo",
        });
        setImages(data.assets);
    }

    async function deleteImages() {
        if(selectedImages.length != 0) {
            await MediaLibrary.deleteAssetsAsync(selectedImages);
            ToastAndroid.showWithGravity(
                `Usunięto ${selectedImages.length} zdjęć!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            setSelectedImages([]);
            getPhotos();
        }
        else {
            ToastAndroid.showWithGravity(
                `Please select some images first!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    const uploadPhotos = async () => {
        if(selectedImages.length != 0) {
            const IP = await SecureStore.getItemAsync("IP");
            const PORT = await SecureStore.getItemAsync("PORT");
            try {
                const data = new FormData();
                for(const el of selectedImages) {
                    const image = await MediaLibrary.getAssetInfoAsync(el)
                    data.append("image", {
                        uri: image.uri,
                        name: image.filename,
                        type: 'image/jpg'
                    });
                }
                await fetch(`http://${IP}:${PORT}/upload`, {
                    method: 'POST',
                    body: data
                })
                setSelectedImages([]);
                ToastAndroid.showWithGravity(
                    `Images successfully sent!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            } catch (error) {
                ToastAndroid.showWithGravity(
                    `Something went wrong!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
        }
        else {
            ToastAndroid.showWithGravity(
                `Please select some images first!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {fontsLoaded ? (
                <View style={style.gallery}>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <BackButton
                            passedFunc={() => navigation.navigate("Main", {})}
                        />
                        <Text
                            style={[
                                style.secondaryText,
                                { fontWeight: "bold", fontSize: 36 },
                            ]}
                        >
                            Your Gallery
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 20,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    >
                        <MyButton
                            onPress={() => setWideDisplay((prev) => !prev)}
                            text={"Layout"}
                            bgColor={"#ea1e63"}
                            fgColor={"#fff"}
                        />
                        <MyButton
                            onPress={() =>
                                navigation.navigate("CameraScreen", {})
                            }
                            text={"Camera"}
                            bgColor={"#ea1e63"}
                            fgColor={"#fff"}
                        />
                        <MyButton
                            onPress={deleteImages}
                            text={"Delete"}
                            bgColor={"#ea1e63"}
                            fgColor={"#fff"}
                        />
                    </View>
                    <FlatList
                        data={images}
                        numColumns={wideDisplay ? 1 : 4}
                        key={wideDisplay ? 1 : 4}
                        extraData={[selectedImages, wideDisplay]}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("BigPhoto", {
                                        uri: item.uri,
                                        id: item.id,
                                        height: item.height,
                                        width: item.width,
                                    })
                                }
                                onLongPress={() => selectImage(item.id)}
                                delayLongPress={500}
                            >
                                <FotoItem
                                    uri={item.uri}
                                    id={item.id}
                                    wideDisplay={wideDisplay}
                                    selected={selectedImages.includes(item.id)}
                                ></FotoItem>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    <View
                        style={{
                            marginBottom: 20,
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <MyButton
                            onPress={() => navigation.navigate("Config", {})}
                            text={"Config"}
                            bgColor={"#fff"}
                            fgColor={"#ea1e63"}
                        />
                        <MyButton
                            onPress={uploadPhotos}
                            text={"Upload"}
                            bgColor={"#ea1e63"}
                            fgColor={"#fff"}
                        />
                    </View>
                </View>
            ) : (
                <Text>none</Text>
            )}
        </View>
    );
}

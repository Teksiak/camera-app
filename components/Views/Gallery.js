import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import style from "../../style";
import * as MediaLibrary from "expo-media-library";
import { useFonts } from "expo-font";
import BackButton from "../BackButton";
import MyButton from "../MyButton"
import FotoItem from "../FotoItem";

export default function Gallery({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
        OpenSansLight: require("../../assets/fonts/OpenSans-Light.ttf"),
    });
    const [images, setImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const [wideDisplay, setWideDisplay] = useState(false)

    useEffect(() => {
        getPhotos()
        const focusSubscription = navigation.addListener(
            'focus',
            () => {
              getPhotos();
            }
        )
        return () => {
            focusSubscription()
        }
    }, [])

    const selectImage = (id) => {
        if(selectedImages.includes(id)) {
            setSelectedImages(prev => prev.filter(el => el != id))
        }
        else {
            setSelectedImages(prev => [...prev, id])
        }
    }

    async function getPhotos() {
        const album = await MediaLibrary.getAlbumAsync("DCIM")
        let data = await MediaLibrary.getAssetsAsync({
            album:album,
            first: 20,
            mediaType: 'photo'
        })
        setImages(data.assets)
    }

    async function deleteImages() {
        await MediaLibrary.deleteAssetsAsync(selectedImages)
        getPhotos()
    }

    return (
        <View style={{ flex: 1 }}>
            {fontsLoaded ? (
                <View style={style.gallery}>
                    <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <BackButton passedFunc={() => navigation.navigate("Main", {})}/>
                        <Text style={[style.secondaryText, {fontWeight: "bold", fontSize: 36}]}>Your Gallery</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 20, marginTop: 10}}>
                        <MyButton onPress={() => setWideDisplay(prev => !prev)} text={"Layout"} bgColor={"#ea1e63"} fgColor={"#fff"}/>
                        <MyButton onPress={() => navigation.navigate("CameraScreen", {})} text={"Camera"} bgColor={"#ea1e63"} fgColor={"#fff"}/>
                        <MyButton onPress={deleteImages} text={"Delete"} bgColor={"#ea1e63"} fgColor={"#fff"}/>
                    </View>
                    <FlatList
                        data={images}
                        numColumns={wideDisplay ? 1 : 4}
                        key={wideDisplay ? 1 : 4}
                        extraData={[selectedImages, wideDisplay]}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("BigPhoto", {uri: item.uri, id: item.id})}
                                onLongPress={() => selectImage(item.id)}
                                delayLongPress={500}
                            >
                                <FotoItem uri={item.uri} id={item.id} wideDisplay={wideDisplay} selected={selectedImages.includes(item.id)}></FotoItem>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            ) : (
                <Text>none</Text>
            )}
        </View>
    );
}

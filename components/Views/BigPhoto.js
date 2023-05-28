import { View, Text, Image, ToastAndroid } from 'react-native'
import React from 'react'
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import BackButton from '../BackButton'
import style from '../../style'
import MyButton from '../MyButton'
import * as SecureStore from "expo-secure-store";

export default function BigPhoto({ route, navigation}) {
    async function handleDelete() {
        await MediaLibrary.deleteAssetsAsync([route.params.id])
        navigation.goBack()
    }
    const uploadPhoto = async () => {
        const IP = await SecureStore.getItemAsync("IP");
        const PORT = await SecureStore.getItemAsync("PORT");
        try {
            const data = new FormData();
            data.append("image", {
                uri: route.params.uri,
                name: "name.jpg",
                type: 'image/jpg'
            });
            await fetch(`http://${IP}:${PORT}/upload`, {
                method: 'POST',
                body: data
            })
            ToastAndroid.showWithGravity(
                `Image successfully sent!`,
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
    return (
        <View style={[style.gallery, {paddingTop: 20}]}>
            <BackButton passedFunc={() => {navigation.goBack()}}/>
            <Image style={{width: "90%", height: "70%", borderRadius: 30, marginTop: 20}} source={{uri: route.params.uri}}/>
            <Text style={{color: 'white', fontSize: 36}}>{route.params.height}x{route.params.width}</Text>
            <View style={{flexDirection: "row", gap: 20, marginTop: 30}}>
                <MyButton onPress={() => {Sharing.shareAsync(route.params.uri)}} text={"Share"} bgColor={"#fff"} fgColor={"#202020"}/>
                <MyButton onPress={handleDelete} text={"Delete"} bgColor={"#fff"} fgColor={"#202020"}/>
                <MyButton onPress={uploadPhoto} text={"Upload"} bgColor={"#fff"} fgColor={"#202020"}/>
            </View>
        </View>
    )
}
import { View, Text, Image } from 'react-native'
import React from 'react'
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import BackButton from '../BackButton'
import style from '../../style'
import MyButton from '../MyButton'

export default function BigPhoto({ route, navigation}) {
    async function handleDelete() {
        await MediaLibrary.deleteAssetsAsync([route.params.id])
        navigation.goBack()
    }
    return (
        <View style={[style.gallery, {paddingTop: 20}]}>
            <BackButton passedFunc={() => {navigation.goBack()}}/>
            <Image style={{width: "90%", height: "70%", borderRadius: 30, marginTop: 20}} source={{uri: route.params.uri}}/>
            <View style={{flexDirection: "row", gap: 50, marginTop: 30}}>
                <MyButton onPress={() => {Sharing.shareAsync(route.params.uri)}} text={"Share"} bgColor={"#fff"} fgColor={"#202020"}/>
                <MyButton onPress={handleDelete} text={"Delete"} bgColor={"#fff"} fgColor={"#202020"}/>
            </View>
        </View>
    )
}
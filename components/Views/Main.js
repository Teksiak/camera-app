import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as MediaLibrary from "expo-media-library";

export default function Main() {
    useEffect(() => {
        async function getPermission() {
            let { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('brak uprawnień do czytania image-ów z galerii')
            }
        }
        getPermission()
    }, [])

    return (
        <View>
            <Text>Main</Text>
        </View>
    )
}  
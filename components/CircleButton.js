import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

export default function CircleButton({ onPress, content }) {
    const func = () => onPress();

    return (
            <TouchableOpacity
                style={styles.button}
                onPress={func}
            >
                <Image fir style={{width: "50%", height: "50%"}} source={content}/>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        
    },
});

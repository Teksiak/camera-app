import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function BackButton({ passedFunc }) {
    return (
        <TouchableOpacity onPress={passedFunc}>
            <Image
                style={{
                    width: 25,
                    height: 25,
                }}
                source={require("../assets/back-button.png")}
            ></Image>
        </TouchableOpacity>
    );
}

import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import style from "../style";

export default function FotoItem({ uri, wideDisplay, id, selected }) {
    return (
        <ImageBackground
            imageStyle={{ borderRadius: 10 }}
            style={wideDisplay ? style.wideImage: style.smallImage}
            source={{ uri: uri }}
        >
            {selected ? (
                <View>
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "black",
                            opacity: 0.7,
                            borderRadius: 10,
                        }}
                    ></View>
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 20,
                            height: 20,
                            borderColor: "white",
                            borderWidth: 1,
                            borderRadius: 20,
                            margin: 5,
                            position: "absolute",
                        }}
                    >
                        <View
                            style={{
                                width: 13,
                                height: 13,
                                backgroundColor: "white",
                                borderRadius: 13,
                            }}
                        ></View>
                    </View>
                </View>
            ) : (
                ""
            )}
            <Text
                style={[
                    style.defaultText,
                    {
                        fontWeight: "bold",
                        position: "absolute",
                        bottom: 3,
                        right: 5,
                    },
                ]}
            >
                {id}
            </Text>
        </ImageBackground>
    );
}

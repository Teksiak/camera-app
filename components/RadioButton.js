import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function RadioButton({selected, option}) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
            }}
        >
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    height: 30,
                    borderColor: "#ea1e63",
                    borderWidth: 2,
                    borderRadius: 20,
                    margin: 5,
                }}
            >
                {selected ? (
                    <View
                        style={{
                            width: 16,
                            height: 16,
                            backgroundColor: "#ea1e63",
                            borderRadius: 13,
                        }}
                    ></View>
                ) : (
                    ""
                )}
            </View>
            <View>
                <Text style={{ fontSize: 20, color: "white" }}>
                    {option}
                </Text>
            </View>
        </View>
    );
}

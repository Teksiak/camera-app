import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import RadioButton from "./RadioButton";

export default function RadioGroup({ action, data, title, option }) {
    const [selected, setSelected] = useState(Object.keys(data).indexOf(option));

    useEffect(() => {
        setSelected(Object.keys(data).indexOf(option))
    }, [data])

    return (
        <View>
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 5,
                }}
            >
                {title}
            </Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {Object.entries(data).map(([key,value], i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                setSelected(i);
                                action(value);
                            }}
                        >
                            <RadioButton
                                selected={i === selected}
                                option={key}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

import { View, Text, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import style from "../../style";
import MyButton from "../MyButton";

export default function Config({ route, navigation }) {
    const [IP, setIP] = useState("");
    const [PORT, setPORT] = useState("");

    async function updateData() {
        console.log(IP, PORT);
        await SecureStore.setItemAsync("IP", IP);
        await SecureStore.setItemAsync("PORT", PORT);
        navigation.navigate("Gallery", {});
    }

    async function getData() {
        let tempIP = await SecureStore.getItemAsync("IP");
        let tempPORT = await SecureStore.getItemAsync("PORT");
        setIP(tempIP);
        setPORT(tempPORT);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={[style.gallery, { justifyContent: "center" }]}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Text
                    style={[
                        { fontWeight: "bold", fontSize: 36, color: "#ea1e63" },
                    ]}
                >
                    Server Configuration
                </Text>
            </View>
            <View
                style={{
                    display: "flex",
                    gap: 20,
                    borderWidth: 2,
                    borderColor: "white",
                    padding: 20,
                    borderRadius: 20,
                    marginTop: 20,
                    marginBottom: 10,
                }}
            >
                <View style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Text
                        style={{
                            color: "#ea1e63",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        Server IP
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: "white",
                            width: 200,
                            padding: 3,
                            borderRadius: 10,
                        }}
                        value={IP}
                        placeholder="Server IP"
                        onChangeText={setIP}
                    />
                </View>
                <View style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Text
                        style={{
                            color: "#ea1e63",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        Server PORT
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: "white",
                            width: 200,
                            padding: 3,
                            borderRadius: 10,
                        }}
                        value={PORT}
                        placeholder="Server PORT"
                        onChangeText={setPORT}
                    />
                </View>
            </View>
            <MyButton
                onPress={updateData}
                text={"Update"}
                bgColor={"#fff"}
                fgColor={"#ea1e63"}
            />
        </View>
    );
}

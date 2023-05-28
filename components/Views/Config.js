import { View, Text, TextInput, ToastAndroid } from "react-native";
import Dialog from "react-native-dialog";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import style from "../../style";
import MyButton from "../MyButton";
import BackButton from "../BackButton";

export default function Config({ route, navigation }) {
    const [visible, setVisible] = useState(false);
    const [IP, setIP] = useState("");
    const [PORT, setPORT] = useState("");

    async function updateData() {
        await SecureStore.setItemAsync("IP", IP);
        await SecureStore.setItemAsync("PORT", PORT);
        setVisible(false)
        ToastAndroid.showWithGravity(
            `Server data changed!`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
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
                <View style={{ margin: 15 }}>
                    <BackButton
                        passedFunc={() => {
                            navigation.goBack();
                        }}
                    />
                </View>
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
                            textAlign: 'center'
                        }}
                        editable={false}
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
                            textAlign: 'center'
                        }}
                        editable={false}
                        value={PORT}
                        placeholder="Server PORT"
                        onChangeText={setPORT}
                    />
                </View>
            </View>
            <MyButton
                onPress={() => setVisible(true)}
                text={"Change"}
                bgColor={"#fff"}
                fgColor={"#ea1e63"}
            />
            <Dialog.Container visible={visible}>
                <Dialog.Title>Set server data</Dialog.Title>
                <Dialog.Input value={IP} onChangeText={setIP}></Dialog.Input>
                <Dialog.Input
                    value={PORT}
                    onChangeText={setPORT}
                ></Dialog.Input>
                <Dialog.Button
                    label="Cancel"
                    onPress={() => {
                        setVisible(false);
                    }}
                />
                <Dialog.Button label="Save" onPress={updateData} />
            </Dialog.Container>
        </View>
    );
}

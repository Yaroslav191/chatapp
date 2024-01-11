import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView, TextInput } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}>
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: "600" }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Sign In to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholder="Enter your Email"
              placeholderTextColor={"black"}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholder="Enter your Password"
              placeholderTextColor={"black"}
            />
          </View>
          <Pressable
            style={{
              marginTop: 30,
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}>
              Login
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginTop: 15,
            }}>
            <Text
              style={{
                color: "grey",
                textAlign: "center",
                fontSize: 16,
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useContext, useLayoutEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChatMessagesScreen = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [showEmojiSelector, setEmojiSelector] = useState(false);
  const [message, setMessage] = useState("");
  const route = useRoute();
  const { recepientId } = route.params;

  const handleEmojiPress = () => {
    setEmojiSelector(!showEmojiSelector);
  };

  const handleSend = async (messageType, imageUri) => {
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);

      //if the message type is image or a normal text
      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      const response = await fetch("http://localhost:8000/messages", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("");
        setSelectedImage("");
      }
    } catch (error) {
      console.log("error sending the message", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <ScrollView></ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}>
        <Entypo
          onPress={handleEmojiPress}
          name="emoji-happy"
          style={{ marginRight: 5 }}
          size={24}
          color="black"
        />
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#adddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}>
          <Entypo
            name="camera"
            style={{ marginLeft: 5 }}
            size={24}
            color="gray"
          />
          <Feather
            name="mic"
            style={{ marginLeft: 5 }}
            size={24}
            color="gray"
          />
        </View>

        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#007bff",
            paddingHorizontal: 12,
            borderRadius: 20,
            marginLeft: 10,
          }}>
          <Text style={{ color: "white", fontWeight: "bold", padding: 5 }}>
            Send
          </Text>
        </Pressable>
      </View>
      {showEmojiSelector && (
        <EmojiSelector
          style={{ height: 250 }}
          onEmojiSelected={(emoji) =>
            setMessage((prevMessage) => prevMessage + emoji)
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});

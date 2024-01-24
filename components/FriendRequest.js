import { View, Text, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const FriendRequest = ({ item, requests, setRequests }) => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const acceptRequest = (friendRequestId) => {
    const data = {
      senderId: friendRequestId,
      recepientId: userId,
    };

    console.log(data);

    axios
      .post(`http://localhost:8000/accept`, data)
      .then((response) => {
        console.log(response);
        setRequests(requests.filter((item) => item._id != friendRequestId));
        navigation.navigate("Chats");
      })
      .catch((error) => {
        console.log("error retrieving users", error);
      });
  };

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <Text
        style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 }}>
        {item?.name} sent you a friend request
      </Text>
      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}>
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

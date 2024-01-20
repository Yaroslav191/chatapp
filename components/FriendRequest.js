import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const FriendRequest = ({ item, requests, setRequests }) => {
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
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}>
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

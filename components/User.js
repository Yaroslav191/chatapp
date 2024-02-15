import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useId, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";

const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);

  const sendFriendRequest = (userId, recepientID) => {
    axios
      .post("http://localhost:8000/friend-request", {
        currentUserId: userId,
        selectedUserId: recepientID,
      })
      .then((response) => {
        console.log(response);

        if (response.ok) {
          setRequestSent(true);
        }
        // setUsers(response.data);
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
        marginVertical: 10,
      }}>
      <View>
        <Image
          source={{ uri: item.image }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontSize: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>

      <Pressable
        onPress={() => sendFriendRequest(userId, item._id)}
        style={{
          backgroundColor: "#567189",
          padding: 10,
          borderRadius: 6,
          width: 105,
        }}>
        <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
          Add Friend
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});

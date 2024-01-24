import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import UserChat from "../components/UserChat";

const ChatScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  useEffect(() => {
    const acceptedFriends = async () => {
      try {
        const response = await axios(
          `http://localhost:8000/accepted-freinds/${userId}`
        );

        if (response.status === 200) {
          setAcceptedFriends(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    acceptedFriends();
  }, []);

  console.log(acceptedFriends);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item, index) => {
          return <UserChat key={index} item={item} />;
        })}
      </Pressable>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});

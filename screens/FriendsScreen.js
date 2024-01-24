import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
import FriendRequest from "../components/FriendRequest";

const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/requestedFriends/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const friendRequestData = response.data.map((item) => {
            return {
              _id: item._id,
              name: item.name,
              email: item.email,
              image: item.image,
            };
          });
          setRequests(friendRequestData);
        }
      })
      .catch((error) => {
        console.log("error retrieving users", error);
      });
  }, []);

  console.log(requests);

  return (
    <View style={{ paddingHorizontal: 5 }}>
      {requests.legth > 0 && <Text>You Friend Requests</Text>}
      {requests.map((item, index) => {
        return (
          <FriendRequest
            key={index}
            item={item}
            requests={requests}
            setRequests={setRequests}
          />
        );
      })}
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});

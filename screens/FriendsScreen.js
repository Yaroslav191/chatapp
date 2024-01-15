import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";

const FriendsScreen = () => {
   const { userId, setUserId } = useContext(UserType);
   const [requests, setRequests] = useState([]);

   useEffect(() => {
      axios
         .get(`http://localhost:8000/requestedFriends/${userId}`)
         .then((response) => {
            setRequests(response.data);
         })
         .catch((error) => {
            console.log("error retrieving users", error);
         });
   }, []);

   console.log(requests);

   return (
      <View>
         <Text>FriendsScreen</Text>
      </View>
   );
};

export default FriendsScreen;

const styles = StyleSheet.create({});

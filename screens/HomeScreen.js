import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../components/User";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
          <Text
            style={{ fontSize: 16, fontWeight: "bold", paddingLeft: "5px" }}>
            Swift Chat
          </Text>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingRight: "10px",
            }}>
            <Ionicons
              onPress={() => navigation.navigate("Chats")}
              name="chatbox-ellipses-outline"
              size={24}
              color="black"
            />
            <MaterialIcons
              onPress={() => navigation.navigate("Friends")}
              name="people-outline"
              size={24}
              color="black"
            />
          </View>
        );
      },
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://localhost:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <View>
      <View style={{ padding: 10, marginHorizontal: 12 }}>
        {users.map((item) => {
          return <User key={item._id} item={item} />;
        })}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

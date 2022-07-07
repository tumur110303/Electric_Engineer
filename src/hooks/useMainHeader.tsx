import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { MainNavigationParams } from "../navigations/MainNavigation";
import { dark, light, main, w500 } from "../constants";

type MainHeaderType = (route: {
  route: RouteProp<MainNavigationParams, keyof MainNavigationParams>;
  navigation: any;
}) => DrawerNavigationOptions;

const useMainHeader: MainHeaderType = (options) => {
  return {
    sceneContainerStyle: {
      backgroundColor: "#f6f6f6",
    },
    headerStyle: {
      backgroundColor: dark,
      shadowColor: "transparent",
    },
    headerTitleStyle: {
      display: "none",
    },
    headerLeft: () => {
      return (
        <TouchableOpacity style={css.left} activeOpacity={0.6}>
          <Text style={css.name}>{options.route.name}</Text>
        </TouchableOpacity>
      );
    },
    headerRight: () => {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            options.navigation.openDrawer();
          }}
          style={css.menu}
        >
          <Ionicons name="menu" size={25} color={light} />
        </TouchableOpacity>
      );
    },
  };
};

export default useMainHeader;

const css = StyleSheet.create({
  left: {
    flexDirection: "row",
    marginLeft: 15,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    color: light,
    textTransform: "uppercase",
    fontFamily: w500,
    paddingTop: 3,
    paddingBottom: 1,
  },
  menu: {
    marginRight: 10,
    padding: 5,
  },
});

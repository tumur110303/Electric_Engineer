import { FC, useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  dark,
  gray,
  white,
  main,
  w400,
  headerText,
  green,
  blue,
  red,
  mainBackground,
  headerBackground,
  mainText,
  orange,
  w500,
} from "../constants";

type ContentType = {
  title: string;
  navigationName: string;
  icon: any;
  subtitle: string;
};

const HomeScreen: FC = () => {
  const navigation = useNavigation();

  const contents: ContentType[] = [
    {
      title: "Simple Calculator",
      navigationName: "Simple Calculator",
      icon: "calculator-variant",
      subtitle: "Electrical circuit calculations",
    },
  ];

  return (
    <View style={css.container}>
      <FlatList
        data={contents}
        keyExtractor={(item) => item.navigationName}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            style={css.item}
            onPress={() => navigation.navigate(item.navigationName as any)}
          >
            <View style={css.text}>
              <Text style={css.title}>{item.title}</Text>
              <Text style={css.subtitle}>{item.subtitle}</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={35}
              color={blue}
              style={css.chevron}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const css = StyleSheet.create({
  container: {
    backgroundColor: gray,
    paddingVertical: 10,
    flex: 1,
  },
  item: {
    backgroundColor: mainBackground,
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,

    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    marginLeft: 10,
    color: mainText,
  },
  chevron: {
    position: "absolute",
    right: 10,
  },
  title: {
    fontFamily: w500,
    color: mainText,
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: w400,
    color: blue,
  },
});

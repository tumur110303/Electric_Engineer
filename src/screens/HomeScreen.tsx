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

import { dark, gray, light, main, w400 } from "../constants";

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
      title: "Тооцоолох",
      navigationName: "Тооцоолол",
      icon: "calculator-variant",
      subtitle: "Цахилгаан ачаалал тооцох програм",
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
            <MaterialCommunityIcons
              name={item.icon}
              size={20}
              color={light}
              style={css.icon}
            />
            <View style={css.text}>
              <Text style={css.title}>{item.title}</Text>
              <Text style={css.subtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const css = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    flex: 1,
  },
  item: {
    backgroundColor: light,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,

    flexDirection: "row",
    alignItems: "center",

    borderLeftColor: main,
    borderLeftWidth: 3,
  },
  icon: {
    backgroundColor: main,
    padding: 10,
    borderRadius: 1000,
  },
  text: {
    marginLeft: 10,
  },
  title: {
    fontFamily: w400,
    color: dark,
    fontSize: 16,
    textTransform: "uppercase",
  },
  subtitle: {
    fontFamily: w400,
    color: gray,
  },
});

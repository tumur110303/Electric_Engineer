import { FC, useContext } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  w400,
  blue,
  green,
  mainText,
  mainBackground,
  white,
  main,
  gray,
} from "../constants";
import { useNavigation } from "@react-navigation/native";

type ContentType = {
  title: string;
  navigationName: string;
  icon: any;
  color: string;
};

const CalculatorScreen: FC = () => {
  const navigation = useNavigation();
  const contents: ContentType[] = [
    {
      title: "power to voltage",
      navigationName: "Power to voltage",
      icon: "lightning-bolt",
      color: blue,
    },
    {
      title: "Power to Amps",
      navigationName: "Power to Amps",
      icon: "lightning-bolt",
      color: green,
    },
    {
      title: "Power calculator",
      navigationName: "Power calculator",
      icon: "lightning-bolt",
      color: blue,
    },
  ];
  return (
    <View style={css.container}>
      <FlatList
        keyExtractor={(item) => item.navigationName}
        data={contents}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            style={css.item}
            onPress={() => navigation.navigate(item.navigationName as any)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={26}
              color={item.color}
            />
            <Text
              style={{
                flexDirection: "row",
                width: "90%",
                flexWrap: "wrap",
              }}
            >
              <Text style={css.title}>{item.title}</Text>
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color={blue}
              style={css.chevron}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CalculatorScreen;

const css = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: gray,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: mainBackground,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderBottomColor: green,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: w400,
    textTransform: "uppercase",
    marginLeft: 10,
    color: mainText,
    marginRight: 10,
  },
  chevron: {
    position: "absolute",
    right: 10,
  },
  overlay: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  overlayContainer: {
    backgroundColor: white,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  overlayWrapper: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

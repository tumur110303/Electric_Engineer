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
import { dark, light, main, w400, blue, green } from "../constants";
import { useNavigation } from "@react-navigation/native";
import Modal from "../components/Modal";

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
      title: "Орон сууцны барилга тооцох",
      navigationName: "Орон сууц",
      icon: "home-city-outline",
      color: blue,
    },

    {
      title: "Гэрэлтүүлгийн тооцооны ашиглалтын коэффициентийн арга",
      navigationName: "Ашиглалтын коэффициентийн арга",
      icon: "lightbulb-cfl",
      color: green,
    },
    {
      title: "Гэрэлтүүлгийн тооцооны хувийн чадлын арга",
      navigationName: "Хувийн чадлын арга",
      icon: "lightbulb-on",
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
              color={main}
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  line: {
    height: "100%",
    width: 2,
    backgroundColor: main,
    marginRight: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: light,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,

    borderRadius: 5,
  },
  title: {
    fontFamily: w400,
    textTransform: "uppercase",
    marginLeft: 10,
    color: dark,
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
    backgroundColor: light,
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

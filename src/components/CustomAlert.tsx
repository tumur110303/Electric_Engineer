import { FC } from "react";
import {
  View,
  StyleSheet,
  Modal as ReactNativeModal,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { blue, gray, main, mainBackground, mainText, w500 } from "../constants";
import Button from "./Button";

type Props = {
  title?: string;
  visible?: boolean;
  setVisible?: (state: boolean) => void;
};

const CustomAlert: FC<Props> = ({
  children,
  title = "Note :",
  visible,
  setVisible = () => {},
}) => {
  return (
    <ReactNativeModal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <TouchableOpacity
        style={css.overlay}
        activeOpacity={0.35}
        onPress={() => {
          setVisible(false);
        }}
      ></TouchableOpacity>
      <ScrollView style={css.wrapper}>
        <Text style={css.title}>{title}</Text>
        {children}
        <Button onPress={() => setVisible(false)}>Close</Button>
        <View style={{ marginBottom: 40 }}></View>
      </ScrollView>
    </ReactNativeModal>
  );
};

export default CustomAlert;

const css = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: main,
    opacity: 0.4,
  },
  title: {
    fontFamily: w500,
    textTransform: "uppercase",
    fontSize: 18,
    color: mainBackground,
    textAlign: "center",
  },
  wrapper: {
    backgroundColor: blue,
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 20,

    paddingVertical: 20,
    paddingHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

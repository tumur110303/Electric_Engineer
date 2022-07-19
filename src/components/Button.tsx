import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { mainBackground, mainText, orange, w500, white } from "../constants";

type Props = {
  children?: string;
  disable?: boolean;
  onPress?: () => void;
};

const Button: FC<Props> = ({ children = "button", onPress, disable }) => {
  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : 0.7}
      onPress={() => {
        if (!disable && onPress) {
          onPress();
        }
      }}
    >
      <View style={disable ? [css.container, css.disable] : [css.container]}>
        <Text style={disable ? [css.text, css.disableText] : [css.text]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: orange,
    borderWidth: 2,
    marginHorizontal: 60,
    borderColor: "#ffffff",
    height: 37,
    borderRadius: 5,
  },
  text: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: w500,
    color: mainBackground,
    fontSize: 13,
  },
  disable: {
    backgroundColor: mainBackground,
  },
  disableText: {
    color: mainText,
  },
});

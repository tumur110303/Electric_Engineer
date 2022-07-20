import { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";

import {
  headerText,
  mainBackground,
  mainText,
  orange,
  red,
  w400,
  w500,
} from "../constants";

type Props = {
  label?: string;
  onPress: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  unit?: boolean;
  unitText?: string | [string, string];
};

const Textfield: FC<Props> = ({ label, style, unit, unitText, onPress }) => {
  return (
    <View style={[css.container, style]}>
      {label && <Text style={css.title}>{label}</Text>}
      <View style={css.switchContainer}>
        <TouchableOpacity
          style={{
            width: "48%",
            height: 30,
            backgroundColor: unit ? mainText : orange,
            marginLeft: 5,
            borderRadius: 5,
            justifyContent: "center",
          }}
          onPress={() => onPress(false)}
        >
          <Animatable.View animation="pulse" duration={500}>
            <Text
              style={{
                fontFamily: unit ? w400 : w500,
                textAlign: "center",
                color: mainBackground,
              }}
            >
              {unitText ? unitText[0] : ""}
            </Text>
          </Animatable.View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "48%",
            height: 30,
            backgroundColor: unit ? orange : mainText,
            marginLeft: 5,
            borderRadius: 5,
            justifyContent: "center",
          }}
          onPress={() => onPress(true)}
        >
          <Animatable.View animation="pulse" duration={500}>
            <Text
              style={{
                fontFamily: unit ? w500 : w400,
                textAlign: "center",
                color: mainBackground,
              }}
            >
              {unitText ? unitText[1] : ""}
            </Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Textfield;

const css = StyleSheet.create({
  // Агуулж буй view хэлбэржүүлэлт...
  container: { flex: 1, alignItems: "center" },
  title: {
    textTransform: "uppercase",
    fontFamily: w400,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 3,
    color: mainText,
  },
  wrapper: {
    flexDirection: "row",
    position: "relative",
  },
  icon: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: 5,
    transform: [{ translateY: -12 }],
  },

  // Input хэлбэржүүлэлт...
  input: {
    backgroundColor: mainText,
    height: 37,
    color: headerText,
    fontFamily: w500,
    paddingTop: Platform.OS === "android" ? 5 : 10,
    paddingBottom: Platform.OS === "android" ? 4 : 9,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  error: {
    color: red,
    fontFamily: w400,
  },

  //   Switch-ийн хэлбэржүүлэлт...
  switchContainer: {
    flex: 1,
    flexDirection: "row",
    width: "50%",
    height: 37,
    backgroundColor: mainText,
    marginLeft: 5,
    paddingVertical: 3,
    paddingRight: 5,
    borderRadius: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

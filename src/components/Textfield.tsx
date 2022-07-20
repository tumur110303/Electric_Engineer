import { FC } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  Text,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import {
  blue,
  headerText,
  mainText,
  orange,
  red,
  w400,
  w500,
} from "../constants";

type Props = {
  label?: string;
  keyboardType?:
    | KeyboardTypeOptions
    | [KeyboardTypeOptions, KeyboardTypeOptions];
  value?: string | [string, string];
  disabled?: boolean;
  onChangeText?: (value: string) => void;
  secure?: boolean;
  style?: StyleProp<ViewStyle>;
  bigUnit?: boolean;
  unitText?: string | [string, string];
  error?: {
    text: string;
    show?: boolean;
  };
};

const Textfield: FC<Props> = ({
  label,
  keyboardType = "default",
  value,
  disabled,
  onChangeText,
  secure,
  style,
  error,
}) => {
  return (
    <View style={[css.container, style]}>
      {label && <Text style={css.title}>{label}</Text>}
      <View style={css.wrapper}>
        <TextInput
          onChangeText={
            typeof onChangeText === "object" ? onChangeText[0] : onChangeText
          }
          secureTextEntry={secure}
          value={typeof value === "object" ? value[0] : value}
          keyboardType={
            typeof keyboardType === "object" ? keyboardType[0] : keyboardType
          }
          style={{
            ...css.input,
            opacity: disabled ? 0.4 : 1,
          }}
          editable={!disabled}
        />
        {error && error.show && (
          <Animatable.View animation="pulse" duration={500}>
            <MaterialCommunityIcons
              name="alert-remove-outline"
              size={22}
              color="#DE4839"
              style={css.checkIcon}
            />
          </Animatable.View>
        )}
        {error && !error.show && (
          <Animatable.View animation="pulse" duration={500}>
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              size={21}
              color={blue}
              style={css.checkIcon}
            />
          </Animatable.View>
        )}
      </View>
      {error && error.show && (
        <Animatable.Text
          animation="fadeInLeft"
          duration={500}
          style={css.error}
        >
          {error.text}
        </Animatable.Text>
      )}
    </View>
  );
};

export default Textfield;

const css = StyleSheet.create({
  // Агуулж буй view хэлбэржүүлэлт...
  container: {},
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
  checkIcon: {
    marginRight: 10,
    position: "absolute",
    zIndex: 2,
    top: "50%",
    right: 5,
    transform: [{ translateY: -11 }],
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

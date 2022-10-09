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
  keyboardType?:
    | KeyboardTypeOptions
    | [KeyboardTypeOptions, KeyboardTypeOptions];
  value?: string | [string, string];
  disabled?: boolean;
  onChangeText?: (value: string) => void;
  onPress: (value: boolean) => void;
  secure?: boolean;
  style?: StyleProp<ViewStyle>;
  bigUnit?: boolean;
  unitText?: string | [string, string];
};

const Textfield: FC<Props> = ({
  label,
  keyboardType = "default",
  value,
  disabled,
  onChangeText,
  secure,
  style,
  bigUnit,
  unitText,
  onPress,
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
        <View style={css.switchContainer}>
          <TouchableOpacity
            style={{
              width: "48%",
              height: 31,
              backgroundColor: bigUnit ? mainText : orange,
              marginLeft: 5,
              borderRadius: 5,
              justifyContent: "center",
            }}
            onPress={() => onPress(false)}
          >
            <Animatable.View animation="pulse" duration={500}>
              <Text
                style={{
                  fontFamily: bigUnit ? w400 : w500,
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
              height: 31,
              backgroundColor: bigUnit ? orange : mainText,
              marginLeft: 5,
              borderRadius: 5,
              justifyContent: "center",
            }}
            onPress={() => onPress(true)}
          >
            <Animatable.View animation="pulse" duration={500}>
              <Text
                style={{
                  fontFamily: bigUnit ? w500 : w400,
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
    </View>
  );
};

export default Textfield;

const css = StyleSheet.create({
  // Агуулж буй view хэлбэржүүлэлт...
  container: {},
  title: {
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

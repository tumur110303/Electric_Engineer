import { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { mainBackground, mainText, orange, w400, w500 } from "../constants";

type Props = {
  label?: string;
  result?: number;
  onPress: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  bigUnit?: boolean;
  unitText?: string | [string, string];
};

const OutputUnit: FC<Props> = ({
  label,
  style,
  bigUnit,
  unitText,
  onPress,
  result,
}) => {
  return (
    <View style={[css.container, style]}>
      {label && <Text style={css.title}>{label}</Text>}
      <View style={css.wrapper}>
        <View style={css.resultContainer}>
          <Text style={{ textAlign: "center", fontFamily: w500 }}>
            {result ? Math.round(result * 1000000) / 1000000 : undefined}
          </Text>
        </View>

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

export default OutputUnit;

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
    backgroundColor: mainBackground,
    flexDirection: "row",
    position: "relative",
  },
  //   Switch-ийн хэлбэржүүлэлт...
  switchContainer: {
    flex: 1,
    flexDirection: "row",
    height: 37,
    backgroundColor: mainText,
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 3,
    paddingRight: 5,
    borderRadius: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
  resultContainer: {
    flex: 1,
    flexDirection: "row",
    height: 37,
    backgroundColor: mainText,
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 3,
    paddingRight: 5,
    borderRadius: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

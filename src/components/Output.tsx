import { FC } from "react";
import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";

import { mainText, orange, w400, w500 } from "../constants";

type Props = {
  label?: string;
  result?: number;
  style?: StyleProp<ViewStyle>;
};

const Output: FC<Props> = ({ label, style, result }) => {
  return (
    <View style={[css.container, style]}>
      {label && <Text style={css.title}>{label}</Text>}
      <View style={css.resultContainer}>
        <Text style={{ textAlign: "center", fontFamily: w500 }}>{result}</Text>
      </View>
    </View>
  );
};

export default Output;

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

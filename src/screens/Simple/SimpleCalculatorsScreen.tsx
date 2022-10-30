import { FC, useContext } from "react";
import {
  FlatList,
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
  gray,
} from "../../constants";
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
      title: "power & current to voltage",
      navigationName: "power & current to voltage",
      icon: "lightning-bolt",
      color: blue,
    },
    {
      title: "Power & voltage to Amps",
      navigationName: "Power & voltage to Amps",
      icon: "lightning-bolt",
      color: green,
    },
    {
      title: "Power to Resistance & Amps",
      navigationName: "Power to Resistance & Amps",
      icon: "lightning-bolt",
      color: blue,
    },
    {
      title: "Power to Resistance & Voltage",
      navigationName: "Power to Voltage",
      icon: "lightning-bolt",
      color: green,
    },
    {
      title: "Power to Amps & Voltage",
      navigationName: "Power to Voltage & Amps",
      icon: "lightning-bolt",
      color: blue,
    },
    {
      title: "Active Power to Apparent Power",
      navigationName: "Active Power to Apparent Power",
      icon: "lightning-bolt",
      color: green,
    },
    {
      title: "Apparent power to Active Power",
      navigationName: "Apparent power to Active Power",
      icon: "lightning-bolt",
      color: blue,
    },
    {
      title: "Active power to Reactive Power",
      navigationName: "Active power to Reactive Power",
      icon: "lightning-bolt",
      color: green,
    },
    {
      title: "Apparent power to Reactive Power",
      navigationName: "Apparent power to Reactive Power",
      icon: "lightning-bolt",
      color: blue,
    },
    {
      title: "Active & Reactive to Apparent power",
      navigationName: "Active & Reactive to Apparent power",
      icon: "lightning-bolt",
      color: green,
    },
    {
      title: "Apparent to Active or Reactive power",
      navigationName: "Active or Reactive power",
      icon: "lightning-bolt",
      color: blue,
    },
    {
      title: "Power factor calculator",
      navigationName: "Power factor calculator",
      icon: "lightning-bolt",
      color: green,
    },
    {
      title: "Power calculator",
      navigationName: "Power calculator",
      icon: "lightning-bolt",
      color: blue,
    },
    {
      title: "Resistance to Voltage",
      navigationName: "Resistance to Voltage",
      icon: "resistor",
      color: green,
    },
    {
      title: "Resistance to Current",
      navigationName: "Resistance to Current",
      icon: "resistor",
      color: blue,
    },
    {
      title: "Resistance & Voltage to Power",
      navigationName: "Resistance & Voltage to Power",
      icon: "resistor",
      color: green,
    },
    {
      title: "Resistance & Current to Power",
      navigationName: "Resistance & Current to Power",
      icon: "resistor",
      color: blue,
    },
    {
      title: "Resistance calculator",
      navigationName: "Resistance calculator",
      icon: "resistor",
      color: green,
    },
    {
      title: "Inductive Reactance",
      navigationName: "Inductive Reactance calculator",
      icon: "wave",
      color: blue,
    },
    {
      title: "Capacitive Reactance",
      navigationName: "Capacitive Reactance calculator",
      icon: "math-norm",
      color: green,
    },
    {
      title: "Resonant Frequency",
      navigationName: "Resonant Frequency",
      icon: "waveform",
      color: blue,
    },
    {
      title: "Capacitor Sizing Equation",
      navigationName: "Capacitor Sizing Equation",
      icon: "equal",
      color: green,
    },
    {
      title: "Inductor Sizing Equation",
      navigationName: "Inductor Sizing Equation",
      icon: "wave",
      color: blue,
    },
    {
      title: "Characteristic Impedance (Parallel)",
      navigationName: "Characteristic Impedance (Parallel)",
      icon: "drag-horizontal-variant",
      color: green,
    },
    {
      title: "Characteristic Impedance (Coaxial)",
      navigationName: "Characteristic Impedance (Coaxial)",
      icon: "adjust",
      color: blue,
    },
    {
      title: "Horse Power",
      navigationName: "Horse Power",
      icon: "currency-php",
      color: green,
    },
    {
      title: "Energy Storage (resistance)",
      navigationName: "Energy Storage (resistance)",
      icon: "battery-charging",
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 5,
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

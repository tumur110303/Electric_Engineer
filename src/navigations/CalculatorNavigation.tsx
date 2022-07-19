import { createStackNavigator } from "@react-navigation/stack";
import useMainHeader from "../hooks/useMainHeader";

import CalculatorScreen from "../screens/CalculatorsScreen";
import PowerToVoltageCalculatorScreen from "../screens/PowerToVoltageCalculatorScreen";
import PowerToAmpCalculatorScreen from "../screens/PowerToAmpCalculatorScreen";
import PowerCalculatorScreen from "../screens/PowerCalculatorScreen";

export type StackNavigationParams = {
  [name: string]: undefined;
};

const Stack = createStackNavigator<StackNavigationParams>();

const CalculatorNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={(options) => useMainHeader(options)}
      initialRouteName="Calculator"
    >
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
      <Stack.Screen
        name="Power to voltage"
        component={PowerToVoltageCalculatorScreen}
      />
      <Stack.Screen
        name="Power to Amps"
        component={PowerToAmpCalculatorScreen}
      />
      <Stack.Screen name="Power calculator" component={PowerCalculatorScreen} />
    </Stack.Navigator>
  );
};

export default CalculatorNavigation;

import { createStackNavigator } from "@react-navigation/stack";
import useMainHeader from "../hooks/useMainHeader";

// Screens...
import CalculatorScreen from "../screens/Calculators";
import PowerToVoltageCalculator from "../screens/PowerToVoltageCalculator";
import PowerToAmpCalculator from "../screens/PowerToAmpCalculator";
import PowerCalculator from "../screens/PowerCalculator";
import PowerFactorCalculator from "../screens/PowerFactorCalculator";
import ResistanceToVoltageCalculator from "../screens/ResistanceToVoltageCalculator";
import PowerToResistanceAmpsCalculator from "../screens/PowerToResistanceAmpsCalculator";
import PowerToCapacityCalculator from "../screens/PowerToCapacityCalculator";
import CapacityToPowerCalculator from "../screens/CapacityToPowerCalculator";

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
        component={PowerToVoltageCalculator}
      />
      <Stack.Screen name="Power to Amps" component={PowerToAmpCalculator} />
      <Stack.Screen
        name="Power to Resistance and Amps"
        component={PowerToResistanceAmpsCalculator}
      />
      <Stack.Screen
        name="Power to Capacity"
        component={PowerToCapacityCalculator}
      />
      <Stack.Screen
        name="Capacity to Power"
        component={CapacityToPowerCalculator}
      />
      <Stack.Screen
        name="Powerfactor calculator"
        component={PowerFactorCalculator}
      />
      <Stack.Screen name="Power calculator" component={PowerCalculator} />
      <Stack.Screen
        name="Resistance to Voltage"
        component={ResistanceToVoltageCalculator}
      />
    </Stack.Navigator>
  );
};

export default CalculatorNavigation;

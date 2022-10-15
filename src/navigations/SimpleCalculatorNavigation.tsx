import { createStackNavigator } from "@react-navigation/stack";
import useMainHeader from "../hooks/useMainHeader";

// Screens...
import CalculatorScreen from "../screens/Simple/SimpleCalculatorsScreen";
import PowerToVoltageCalculator from "../screens/Simple/PowerToVoltageCalculator";
import PowerToAmpCalculator from "../screens/Simple/PowerToAmpCalculator";
import PowerCalculator from "../screens/Simple/PowerCalculator";
import PowerFactorCalculator from "../screens/Simple/PowerFactorCalculator";
import ResistanceToVoltageCalculator from "../screens/Simple/ResistanceToVoltageCalculator";
import PowerToResistanceAmpsCalculator from "../screens/Simple/PowerToResistanceAmpsCalculator";
import PowerToCapacityCalculator from "../screens/Simple/PowerToCapacityCalculator";
import CapacityToPowerCalculator from "../screens/Simple/CapacityToPowerCalculator";
import ResistanceToAmpsCalculator from "../screens/Simple/ResistanceToAmpsCalculator";
import PowerToReactiveCalculator from "../screens/Simple/PowerToReactiveCalculator";
import CapacityToReactiveCalculator from "../screens/Simple/CapacityToReactiveCalculator";
import PowerReactiveToCapacity from "../screens/Simple/PowerReactiveToCapacity";
import CapacityPowerToPower from "../screens/Simple/CapacityPowerToPower";
import ResistanceVoltageToPowerCalculator from "../screens/Simple/ResistanceVoltageToPowerCalculator";
import ResistanceAmpsToPowerCalculator from "../screens/Simple/ResistanceAmpsToPowerCalculator";
import PowerToResistanceVoltageCalculator from "../screens/Simple/PowerToResistanceVoltageCalculator";
import PowerToVoltageAmps from "../screens/Simple/PowerToVoltageAmps";
import ResistanceCalculator from "../screens/Simple/ResistanceCalculator";
import InductiveReactanceCalculator from "../screens/Simple/InductiveReactanceCalculator";
import CapacitiveReactanceCalculator from "../screens/Simple/CapacitiveReactanceCalculator";
import ResonantFrequency from "../screens/Simple/ResonantFrequency";
import CapacitorSizer from "../screens/Simple/CapacitorSizer";
import InductorSizer from "../screens/Simple/InductorSizer";
import CharacteristicImpedanceParallel from "../screens/Simple/CharacteristicImpedanceParallel";

export type StackNavigationParams = {
  [name: string]: undefined;
};

const Stack = createStackNavigator<StackNavigationParams>();

const SimpleCalculatorNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={(options) => useMainHeader(options)}
      initialRouteName="Simple Calculator"
    >
      <Stack.Screen name="Simple Calculator" component={CalculatorScreen} />
      <Stack.Screen
        name="power & current to voltage"
        component={PowerToVoltageCalculator}
      />
      <Stack.Screen
        name="Power & voltage to Amps"
        component={PowerToAmpCalculator}
      />
      <Stack.Screen
        name="Power to Resistance & Amps"
        component={PowerToResistanceAmpsCalculator}
      />
      <Stack.Screen
        name="Power to Voltage"
        component={PowerToResistanceVoltageCalculator}
      />
      <Stack.Screen
        name="Power to Voltage & Amps"
        component={PowerToVoltageAmps}
      />
      <Stack.Screen
        name="Active Power to Apparent Power"
        component={PowerToCapacityCalculator}
      />
      <Stack.Screen
        name="Apparent power to Active Power"
        component={CapacityToPowerCalculator}
      />
      <Stack.Screen
        name="Active power to Reactive Power"
        component={PowerToReactiveCalculator}
      />
      <Stack.Screen
        name="Apparent power to Reactive Power"
        component={CapacityToReactiveCalculator}
      />
      <Stack.Screen
        name="Active & Reactive to Apparent power"
        component={PowerReactiveToCapacity}
      />
      <Stack.Screen
        name="Active or Reactive power"
        component={CapacityPowerToPower}
      />
      <Stack.Screen
        name="Power factor calculator"
        component={PowerFactorCalculator}
      />
      <Stack.Screen name="Power calculator" component={PowerCalculator} />
      <Stack.Screen
        name="Resistance to Voltage"
        component={ResistanceToVoltageCalculator}
      />
      <Stack.Screen
        name="Resistance to Current"
        component={ResistanceToAmpsCalculator}
      />
      <Stack.Screen
        name="Resistance & Voltage to Power"
        component={ResistanceVoltageToPowerCalculator}
      />
      <Stack.Screen
        name="Resistance & Current to Power"
        component={ResistanceAmpsToPowerCalculator}
      />
      <Stack.Screen
        name="Resistance calculator"
        component={ResistanceCalculator}
      />
      <Stack.Screen
        name="Inductive Reactance calculator"
        component={InductiveReactanceCalculator}
      />
      <Stack.Screen
        name="Capacitive Reactance calculator"
        component={CapacitiveReactanceCalculator}
      />
      <Stack.Screen name="Resonant Frequency" component={ResonantFrequency} />
      <Stack.Screen
        name="Capacitor Sizing Equation"
        component={CapacitorSizer}
      />
      <Stack.Screen name="Inductor Sizing Equation" component={InductorSizer} />
      <Stack.Screen
        name="Characteristic Impedance (Parallel)"
        component={CharacteristicImpedanceParallel}
      />
    </Stack.Navigator>
  );
};

export default SimpleCalculatorNavigation;

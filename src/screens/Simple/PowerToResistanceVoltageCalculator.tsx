import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";

import Button from "../../components/Button";
import TextfieldSwitch from "../../components/TextfieldSwitch";
import FormPicker from "../../components/FormPicker";
import { mainBackground, mainText, w400, w500, orange } from "../../constants";
import Textfield from "../../components/Textfield";
import FormSwitch from "../../components/FormSwitch";

type Value = {
  power?: number;
  current?: number;
  powerFactor?: number;
  currentType: "DC" | "AC1";
};

type Error = {
  power?: boolean;
  current?: boolean;
  powerFactor?: boolean;
  currentType: boolean;
};

const PowerToResistanceVoltageCalculator: FC = () => {
  // ########################## Өгөгдлүүд & Options #########################
  // Үндсэн өгөгдөл...
  const [value, setValue] = useState<Value>({
    currentType: "DC",
  });

  // Туслах өгөгдлүүд...
  const [bigUnitPower, setBigUnitPower] = useState<boolean>(false);
  const [smallUnitResistance, setSmallUnitResistance] =
    useState<boolean>(false);

  // Туслах states...
  const [error, setError] = useState<Error>({ currentType: false });
  const [disabled, setDisabled] = useState<boolean>(false);

  // Options...
  const currentTypeOptions = [
    { label: "Direct Current", value: "DC" },
    { label: "Alternating Current", value: "AC1" },
  ];

  // Гаралт (хариу)...
  const [result, setResult] = useState<any>();

  // ############################# Functions ##############################
  // Reset function...
  const reset = () => {
    setValue({ currentType: "DC" });
    setResult(0);
    setBigUnitPower(false);
  };

  useEffect(() => {
    let disable: boolean = false;

    if (error.powerFactor) {
      disable =
        (value.currentType !== "DC" && !value.powerFactor) ||
        !value.power ||
        !value.current ||
        error.powerFactor;
    } else {
      disable =
        (value.currentType !== "DC" && !value.powerFactor) ||
        !value.power ||
        !value.current;
    }

    setDisabled(disable);
  }, [value, error]);

  // Бутархай тоон утга авах функц...
  const valueChangerButarhai = (
    text: string,
    id: keyof Value,
    validation?: [number, number]
  ) => {
    const key = typeof id === "object" ? id[0] : id;
    if (text !== "") {
      // Error state шалгах хэсэг...
      if (validation) {
        const number = parseFloat(text);
        if (number < validation[0] || validation[1] < number) {
          setError((state) => {
            state[key] = true;
            return state;
          });
        } else {
          setError((state) => {
            state[key] = false;
            return state;
          });
        }
      } else {
        setError((state) => {
          state[key] = false;
          return state;
        });
      }

      // Утга олгох хэсэг...
      setValue((value) => {
        const copy: any = { ...value };
        copy[key] = text;

        return copy;
      });
    } else {
      setValue((value) => {
        const copy: any = { ...value };
        copy[key] = undefined;

        return copy;
      });
    }
  };

  // Үндсэн тооцооны функц...
  const calc = () => {
    const current = value.current ? value.current : 0;
    const power = value.power ? value.power : 0;
    const powerFactor = value.powerFactor ? value.powerFactor : 1;

    let voltage = 0;
    let resistance = 0;
    let impedance: number | null = 0;

    if (!bigUnitPower) {
      if (value.currentType === "DC") {
        voltage = power / current;
        resistance = voltage / current;
        impedance = null;
      } else if (value.currentType === "AC1") {
        const huwaari = current * powerFactor;
        voltage = power / huwaari;
        impedance = voltage / current;
        resistance = impedance * powerFactor;
      }
    } else {
      const powerkW = power * 1000;

      if (value.currentType === "DC") {
        voltage = powerkW / current;
        resistance = voltage / current;
        impedance = null;
      } else if (value.currentType === "AC1") {
        const huwaari = current * powerFactor;
        voltage = powerkW / huwaari;
        impedance = voltage / current;
        resistance = impedance * powerFactor;
      }
    }

    if (smallUnitResistance) {
      resistance = 1000 * resistance;
      impedance ? (impedance = 1000 * impedance) : null;
    } else {
      resistance = resistance;
      impedance = impedance;
    }

    setResult([voltage, resistance, impedance]);
  };

  return (
    <ScrollView style={css.container}>
      <View style={css.inputFiled}>
        <Text style={css.title}>Input : </Text>
        <FormPicker
          label="Current type"
          options={currentTypeOptions}
          onValueChange={(value: any) => {
            setValue((state) => {
              const copyState = { ...state };
              copyState.currentType = value;
              return copyState;
            });
          }}
          value={value.currentType}
        />
        <TextfieldSwitch
          label={bigUnitPower ? "Power ( P ), kW" : "Power ( P ), W"}
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "power")}
          value={value.power ? value.power + "" : ""}
          unitText={["W", "kW"]}
          bigUnit={bigUnitPower}
          onPress={(value) => setBigUnitPower(value)}
        />
        <Textfield
          label="Current ( I ), A"
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "current")}
          value={value.current ? value.current + "" : ""}
        />
        {value.currentType !== "DC" ? (
          <Textfield
            label="Power factor (Cosφ)"
            keyboardType="numeric"
            onChangeText={(value) =>
              valueChangerButarhai(value, "powerFactor", [0.1, 1])
            }
            value={value.powerFactor ? value.powerFactor + "" : ""}
            error={{
              text: "Please enter a value between 0.1 and 1",
              show: error.powerFactor,
            }}
          />
        ) : null}
      </View>

      <View style={css.output}>
        <View>
          <Text style={css.title}>Output : </Text>

          <View>
            <View>
              <Text style={css.label}>Voltage ( V ), V</Text>
              <View style={css.switchContainer}>
                <Text style={{ textAlign: "center", fontFamily: w500 }}>
                  {result ? Math.round(result[0] * 1000) / 1000 : null}
                </Text>
              </View>
            </View>

            <FormSwitch
              onPress={(value) => setSmallUnitResistance(value)}
              label="unit of resistance and impedance"
              unitText={["Ω", "mΩ"]}
              unit={smallUnitResistance}
            />

            <View>
              <Text style={css.label}>Resistance ( R )</Text>
              <View style={css.switchContainer}>
                <Text style={{ textAlign: "center", fontFamily: w500 }}>
                  {result ? Math.round(result[1] * 1000) / 1000 : null}
                </Text>
              </View>
            </View>
            {value.currentType !== "DC" ? (
              <View>
                <Text style={css.label}>Impedance ( Z )</Text>
                <View style={css.switchContainer}>
                  <Text style={{ textAlign: "center", fontFamily: w500 }}>
                    {result ? Math.round(result[2] * 1000) / 1000 : null}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <View style={{ marginVertical: 10 }}>
        <Button disable={disabled} onPress={calc}>
          calculate
        </Button>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button onPress={reset}>clear</Button>
      </View>
      <View style={{ marginBottom: 20 }}></View>
    </ScrollView>
  );
};

export default PowerToResistanceVoltageCalculator;

const css = StyleSheet.create({
  container: {
    backgroundColor: mainBackground,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  Icon: {},
  label: {
    fontFamily: w400,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 3,
    color: mainText,
  },
  inputFiled: {
    marginBottom: 5,
    paddingBottom: 30,
    borderBottomWidth: 3,
    borderBottomColor: orange,
  },
  title: {
    fontFamily: w500,
    textTransform: "uppercase",
    fontSize: 16,
    color: mainText,
    marginLeft: 7,
    alignSelf: "center",
    paddingHorizontal: 3,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: w500,
    textTransform: "uppercase",
    fontSize: 16,
    color: mainText,
  },
  output: {
    marginTop: 5,
    marginBottom: 30,
    paddingBottom: 30,
    borderBottomWidth: 3,
    borderBottomColor: orange,
  },
  switchContainer: {
    flex: 1,
    flexDirection: "row",
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

import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";

import Button from "../../components/Button";
import FormPicker from "../../components/FormPicker";
import { mainBackground, mainText, w400, w500, orange } from "../../constants";
import Textfield from "../../components/Textfield";
import Output from "../../components/Output";
import FormSwitch from "../../components/FormSwitch";

type Value = {
  voltage?: number;
  current?: number;
  powerFactor?: number;
  currentType: "DC" | "AC1";
};

type Error = {
  voltage?: boolean;
  current?: boolean;
  powerFactor?: boolean;
  currentType: boolean;
};

const ResistanceCalculator: FC = () => {
  // ########################## Өгөгдлүүд & Options #########################
  // Үндсэн өгөгдөл...
  const [value, setValue] = useState<Value>({
    currentType: "DC",
  });

  // Туслах states...
  const [error, setError] = useState<Error>({ currentType: false });
  const [disabled, setDisabled] = useState<boolean>(false);
  const [smallUnit, setSmallUnit] = useState<boolean>(false);

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
  };

  useEffect(() => {
    let disable: boolean = false;

    if (error.powerFactor) {
      disable =
        (value.currentType !== "DC" && !value.powerFactor) ||
        !value.voltage ||
        !value.current ||
        error.powerFactor;
    } else {
      disable =
        (value.currentType !== "DC" && !value.powerFactor) ||
        !value.voltage ||
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
    const voltage = value.voltage ? value.voltage : 0;
    const powerFactor = value.powerFactor ? value.powerFactor : 1;

    let resistance = 0;
    let impedance: number | null = 0;

    if (value.currentType === "DC") {
      resistance = voltage / current;
      impedance = null;
    } else if (value.currentType === "AC1") {
      impedance = voltage / current;
      resistance = impedance * powerFactor;
    }

    if (smallUnit) {
      resistance = resistance * 1000;
      impedance = impedance ? impedance * 1000 : null;
    } else {
      resistance = resistance;
      impedance = impedance;
    }

    setResult([resistance, impedance]);
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

        <Textfield
          label="V ( Voltage, V )"
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "voltage")}
          value={value.voltage ? value.voltage + "" : ""}
        />
        <Textfield
          label="I ( Current, A )"
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "current")}
          value={value.current ? value.current + "" : ""}
        />
        {value.currentType !== "DC" ? (
          <Textfield
            label="Cosф (power factor)"
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
        <Text style={css.title}>Output : </Text>
        <FormSwitch
          onPress={(value) => setSmallUnit(value)}
          unitText={["Ω", "mΩ"]}
          unit={smallUnit}
          label="unit of resistance and impedance"
        />
        <Output
          label="R ( resistance )"
          result={result ? result[0] : undefined}
        />
        {value.currentType !== "DC" ? (
          <Output
            label="Z ( impedance )"
            result={result ? result[1] : undefined}
          />
        ) : null}
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

export default ResistanceCalculator;

const css = StyleSheet.create({
  container: {
    backgroundColor: mainBackground,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  label: {
    textTransform: "uppercase",
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
    marginBottom: 10,
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

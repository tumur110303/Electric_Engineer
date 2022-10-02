import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";

import Button from "../../components/Button";
import TextfieldSwitch from "../../components/TextfieldSwitch";
import { mainBackground, mainText, w400, w500, orange } from "../../constants";
import Textfield from "../../components/Textfield";
import OutputUnit from "../../components/OutputUnit";

type Value = {
  inputValue?: number;
  powerFactor?: number;
};

type Error = {
  inputValue?: boolean;
  powerFactor?: boolean;
};

const CapacityToPowerCalculator: FC = () => {
  // ########################## Өгөгдлүүд & Options #########################
  // Үндсэн өгөгдөл...
  const [value, setValue] = useState<Value>({});

  // Туслах өгөгдлүүд...
  const [bigUnitPower, setBigUnitPower] = useState<boolean>(false);
  const [bigUnitCapacity, setBigUnitCapacity] = useState<boolean>(false);

  // Туслах states...
  const [error, setError] = useState<Error>({});
  const [disabled, setDisabled] = useState<boolean>(false);

  // Гаралт (хариу)...
  const [result, setResult] = useState<number>();

  // ############################# Functions ##############################
  // Reset function...
  const reset = () => {
    setValue({});
    setResult(undefined);
    setBigUnitPower(false);
  };

  useEffect(() => {
    let disable: boolean = false;

    if (error.powerFactor) {
      disable = !value.powerFactor || !value.inputValue || error.powerFactor;
    } else {
      disable = !value.powerFactor || !value.inputValue;
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
    let inputValue = 0;
    const secondValue = value.powerFactor ? value.powerFactor : 0;

    if (value.inputValue) {
      if (bigUnitPower) inputValue = value.inputValue * 1000;
      else inputValue = value.inputValue;
    } else inputValue = 0;

    const result = bigUnitCapacity
      ? (inputValue * secondValue) / 1000
      : inputValue * secondValue;

    setResult(result);
  };

  return (
    <ScrollView style={css.container}>
      <View style={css.inputFiled}>
        <Text style={css.title}>Input : </Text>
        <TextfieldSwitch
          label={bigUnitPower ? "S ( capacity, kVA )" : "S ( capacity, VA )"}
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "inputValue")}
          value={value.inputValue ? value.inputValue + "" : ""}
          unitText={["VA", "kVA"]}
          bigUnit={bigUnitPower}
          onPress={(value) => setBigUnitPower(value)}
        />
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
      </View>

      <View>
        <Text style={css.title}>Output : </Text>
        <OutputUnit
          onPress={(value) => setBigUnitCapacity(value)}
          bigUnit={bigUnitCapacity}
          label="P ( power )"
          unitText={["W", "kW"]}
          result={result}
        />
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

export default CapacityToPowerCalculator;

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

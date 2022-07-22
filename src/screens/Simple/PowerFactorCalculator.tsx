import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";

import Button from "../../components/Button";
import TextfieldSwitch from "../../components/TextfieldSwitch";
import {
  mainBackground,
  mainText,
  w400,
  w500,
  orange,
  red,
} from "../../constants";
import Output from "../../components/Output";
import CustomAlert from "../../components/CustomAlert";

type Value = {
  inputValue?: number;
  secondValue?: number;
};

const PowerFactorCalculator: FC = () => {
  // ########################## Өгөгдлүүд & Options #########################
  // Үндсэн өгөгдөл...
  const [value, setValue] = useState<Value>({});

  // Туслах өгөгдлүүд...
  const [bigUnitPower, setBigUnitPower] = useState<boolean>(false);

  // Туслах states...
  const [disabled, setDisabled] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

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

    disable = !value.secondValue || !value.inputValue;

    setDisabled(disable);
  }, [value]);

  // Бутархай тоон утга авах функц...
  const valueChangerButarhai = (text: string, id: keyof Value) => {
    const key = typeof id === "object" ? id[0] : id;
    if (text !== "") {
      // Error state шалгах хэсэг...

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
    let secondValue = 0;

    if (value.inputValue) {
      if (bigUnitPower) inputValue = value.inputValue * 1000;
      else inputValue = value.inputValue;
    } else inputValue = 0;

    if (value.secondValue) {
      if (bigUnitPower) secondValue = value.secondValue * 1000;
      else if (!bigUnitPower) secondValue = value.secondValue;
    } else secondValue = 1;

    const result = inputValue / secondValue;

    if (result > 1) {
      setAlertVisible(true);
      reset();
    } else {
      setResult(result);
    }
  };

  return (
    <ScrollView style={css.container}>
      <CustomAlert
        title="wrong input value"
        visible={alertVisible}
        setVisible={setAlertVisible}
      >
        <View style={css.alert}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ color: red, fontFamily: w500, fontSize: 16 }}>
              Error Text :{" "}
            </Text>
            <Text
              style={{ color: mainBackground, fontFamily: w400, fontSize: 16 }}
            >{`The value P > S is not allowed.`}</Text>
          </View>
        </View>
      </CustomAlert>
      <View style={css.inputFiled}>
        <Text style={css.title}>Input : </Text>
        <TextfieldSwitch
          label={bigUnitPower ? "P ( Power )" : "P ( Power )"}
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "inputValue")}
          value={value.inputValue ? value.inputValue + "" : ""}
          unitText={["W", "kW"]}
          bigUnit={bigUnitPower}
          onPress={(value) => setBigUnitPower(value)}
        />
        <TextfieldSwitch
          label="S ( Capacity )"
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "secondValue")}
          value={value.secondValue ? value.secondValue + "" : ""}
          unitText={["VA", "kVA"]}
          bigUnit={bigUnitPower}
          onPress={(value) => setBigUnitPower(value)}
        />
      </View>

      <View>
        <Text style={css.title}>Output : </Text>
        <Output label="Cosф (power factor)" result={result} />
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

export default PowerFactorCalculator;

const css = StyleSheet.create({
  container: {
    backgroundColor: mainBackground,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
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
  alert: {
    alignItems: "center",
    marginVertical: 25,
  },
});

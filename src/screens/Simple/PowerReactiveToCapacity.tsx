import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";

import Button from "../../components/Button";
import TextfieldSwitch from "../../components/TextfieldSwitch";
import { mainBackground, mainText, w400, w500, orange } from "../../constants";
import OutputUnit from "../../components/OutputUnit";
import CalcContext from "../../context/CalcContext";

type Value = {
  inputValue?: number;
  secondValue?: number;
};

const PowerReactiveToCapacity: FC = () => {
  const calcContext = useContext(CalcContext);

  // ########################## Өгөгдлүүд & Options #########################
  // Үндсэн өгөгдөл...
  const [value, setValue] = useState<Value>({});

  // Туслах өгөгдлүүд...
  const [bigUnitPower, setBigUnitPower] = useState<boolean>(false);
  const [bigUnitCapacity, setBigUnitCapacity] = useState<boolean>(false);

  // Туслах states...
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
    if (calcContext) {
      let inputValue = 0;
      let secondValue = 0;

      if (value.inputValue) {
        if (bigUnitPower) inputValue = value.inputValue * 1000;
        else inputValue = value.inputValue;
      } else inputValue = 0;

      if (value.secondValue) {
        if (bigUnitPower) secondValue = value.secondValue * 1000;
        else secondValue = value.secondValue;
      } else secondValue = 0;

      const resultReal = calcContext.complexNumber(
        inputValue,
        secondValue,
        true
      );

      const result = bigUnitCapacity ? resultReal / 1000 : resultReal;

      setResult(result);
    }
  };

  return (
    <ScrollView style={css.container}>
      <View style={css.inputFiled}>
        <Text style={css.title}>Input : </Text>
        <TextfieldSwitch
          label="P ( Active power )"
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "inputValue")}
          value={value.inputValue ? value.inputValue + "" : ""}
          unitText={["W", "kW"]}
          bigUnit={bigUnitPower}
          onPress={(value) => setBigUnitPower(value)}
        />
        <TextfieldSwitch
          label="Q ( Reactive power )"
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "secondValue")}
          value={value.secondValue ? value.secondValue + "" : ""}
          unitText={["VAr", "kVAr"]}
          bigUnit={bigUnitPower}
          onPress={(value) => setBigUnitPower(value)}
        />
      </View>

      <View style={css.output}>
        <Text style={css.title}>Output : </Text>
        <OutputUnit
          onPress={(value) => setBigUnitCapacity(value)}
          bigUnit={bigUnitCapacity}
          label="S ( apparent power )"
          unitText={["VA", "kVA"]}
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

export default PowerReactiveToCapacity;

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

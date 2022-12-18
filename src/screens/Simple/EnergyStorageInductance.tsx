import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";

import Button from "../../components/Button";
import TextfieldSwitch from "../../components/TextfieldSwitch";
import { mainBackground, mainText, w400, w500, orange } from "../../constants";
import Textfield from "../../components/Textfield";
import CalcContext from "../../context/CalcContext";
import Output from "../../components/Output";

type Value = {
  current?: number;
  inductance?: number;
};

type Error = {
  current?: boolean;
  inductance?: boolean;
};

const EnergyStorageInductance: FC = () => {
  const calcContext = useContext(CalcContext);

  // ########################## Өгөгдлүүд & Options #########################
  // Үндсэн өгөгдөл...
  const [value, setValue] = useState<Value>({});

  // Туслах өгөгдлүүд...
  const [bigUnit, setBigUnit] = useState<boolean>(false);

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
    setBigUnit(false);
  };

  useEffect(() => {
    let disable: boolean = false;

    if (error.current) {
      disable = !value.current || !value.inductance || error.current;
    } else {
      disable = !value.current || !value.inductance;
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
    if (calcContext) {
      let inductance = 0;
      const current = value.current ? value.current : 0;

      if (value.inductance) {
        if (bigUnit) inductance = value.inductance;
        else inductance = value.inductance / 1000;
      } else inductance = 0;

      const result = (current * current * inductance) / 2;

      setResult(result);
    }
  };

  return (
    <ScrollView style={css.container}>
      <View style={css.inputFiled}>
        <Text style={css.title}>Input : </Text>
        <Textfield
          label="Current (I), A"
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "current")}
          value={value.current ? value.current + "" : ""}
        />
        <TextfieldSwitch
          label={
            bigUnit ? "Inductance ( L ), Henry" : "Inductance ( L ), milliHenry"
          }
          keyboardType="numeric"
          onChangeText={(value) => valueChangerButarhai(value, "inductance")}
          value={value.inductance ? value.inductance + "" : ""}
          unitText={["milliHenry", "Henry"]}
          bigUnit={bigUnit}
          onPress={(value) => setBigUnit(value)}
        />
      </View>

      <View style={css.output}>
        <Text style={css.title}>Output : </Text>
        <Output label="Energy Storage ( J ), Joules" result={result} />
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

export default EnergyStorageInductance;

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

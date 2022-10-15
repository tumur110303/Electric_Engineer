import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";

import CalcContext from "../../context/CalcContext";
import Button from "../../components/Button";
import FormPicker from "../../components/FormPicker";
import { mainBackground, mainText, w400, w500, orange } from "../../constants";
import Textfield from "../../components/Textfield";

type Value = {
  distance?: number;
  radius?: number;
  permittivity?: number;
};

type Error = {
  distance?: boolean;
  radius?: boolean;
  permittivity?: boolean;
};

const CharacteristicImpedanceParallel: FC = () => {
  const calcContext = useContext(CalcContext);

  // ########################## Өгөгдлүүд & Options #########################
  // Үндсэн өгөгдөл...
  const [value, setValue] = useState<Value>({});

  // Туслах states...
  const [error, setError] = useState<Error>({});
  const [disabled, setDisabled] = useState<boolean>(false);

  // Гаралт (хариу)...
  const [result, setResult] = useState<number>();

  // ############################# Functions ##############################
  // Reset function...
  const reset = () => {
    setValue({});
    setResult(0);
  };

  useEffect(() => {
    let disable: boolean = false;

    if (error.permittivity) {
      disable = !value.distance || !value.radius || error.permittivity;
    } else {
      disable = !value.distance || !value.radius;
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
    const radius = value.radius ? value.radius : 0;
    const distance = value.distance ? value.distance : 0;
    const permittivity = value.permittivity ? value.permittivity : 0;

    const ksqrt = Math.sqrt(permittivity);

    const parameter1 = 276 / ksqrt;
    const logarifm = distance / radius;
    const parameter2 = Math.log10(logarifm);

    const impedance = parameter1 * parameter2;

    setResult(impedance);
  };

  return (
    <ScrollView style={css.container}>
      <View style={css.inputFiled}>
        <Text style={css.title}>Input : </Text>

        <Textfield
          label="Distance between conductor centers ( d ), mm"
          keyboardType="numeric"
          onChangeText={(value) =>
            valueChangerButarhai(value, "distance", [0, 100000000])
          }
          value={value.distance ? value.distance + "" : ""}
          error={{
            text: "Please enter a value between 0 and 100000000",
            show: error.distance,
          }}
        />
        <Textfield
          label="Conductor radius ( r ), mm"
          keyboardType="numeric"
          onChangeText={(value) =>
            valueChangerButarhai(value, "radius", [0, 100000000])
          }
          value={value.radius ? value.radius + "" : ""}
          error={{
            text: "Please enter a value between 0 and 100000000",
            show: error.radius,
          }}
        />
        <Textfield
          label="Relative Permittivity of Insulation ( k )"
          keyboardType="numeric"
          onChangeText={(value) =>
            valueChangerButarhai(value, "permittivity", [0, 100000000])
          }
          value={value.permittivity ? value.permittivity + "" : ""}
          error={{
            text: "Please enter a value between 0 and 100000000",
            show: error.permittivity,
          }}
        />
      </View>

      <View style={css.output}>
        <Text style={css.title}>Output : </Text>
        <View>
          <Text style={css.label}>
            Characteristic Impedance of line ( Zo ), Ω
          </Text>
          <View style={css.switchContainer}>
            <Text style={{ textAlign: "center", fontFamily: w500 }}>
              {result ? Math.round(result * 1000) / 1000 : null}
            </Text>
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

export default CharacteristicImpedanceParallel;

const css = StyleSheet.create({
  container: {
    backgroundColor: mainBackground,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
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

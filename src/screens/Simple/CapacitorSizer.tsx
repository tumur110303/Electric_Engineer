import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";

import Button from "../../components/Button";
import { mainBackground, mainText, w400, w500, orange } from "../../constants";
import Textfield from "../../components/Textfield";
import FormSwitch from "../../components/FormSwitch";

type Value = {
  permittivity?: number;
  area?: number;
  distance?: number;
};

type Error = {
  permittivity?: boolean;
  area?: boolean;
  distance?: boolean;
};

const CapacitorSizer: FC = () => {
  // ########################## Өгөгдлүүд & Options #########################
  // Үндсэн өгөгдөл...
  const [value, setValue] = useState<Value>({});

  // Туслах states...
  const [bigUnit, setBigUnit] = useState<boolean>(false);
  const [error, setError] = useState<Error>({});
  const [disabled, setDisabled] = useState<boolean>(false);

  // Гаралт (хариу)...
  const [result, setResult] = useState<number | null>();

  // ############################# Functions ##############################
  // Reset function...
  const reset = () => {
    setValue({});
    setResult(null);
  };

  useEffect(() => {
    const disable: boolean = !value.permittivity || !value.area;

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
    const permittivity = value.permittivity ? value.permittivity : 0;
    const area = value.area ? value.area : 0;
    const distance = value.distance ? value.distance : 0;

    const hurtwer = permittivity * area;
    const capacitanceByFarad = hurtwer / distance;
    const capacity = bigUnit
      ? capacitanceByFarad * 1000000
      : capacitanceByFarad * 1000000000;

    setResult(capacity);
  };

  return (
    <ScrollView style={css.container}>
      <View style={css.inputFiled}>
        <Text style={css.title}>Input : </Text>

        <Textfield
          label="e ( permittivity,  Farad/meter )"
          keyboardType="numeric"
          onChangeText={(value) =>
            valueChangerButarhai(value, "permittivity", [0, 1000000])
          }
          value={value.permittivity ? value.permittivity + "" : ""}
          error={{
            text: "Please enter a value between 0 and 1000000",
            show: error.permittivity,
          }}
        />
        <Textfield
          label="A ( area of plate overlap,  sq.meter )"
          keyboardType="numeric"
          onChangeText={(value) =>
            valueChangerButarhai(value, "area", [0, 1000000])
          }
          value={value.area ? value.area + "" : ""}
          error={{
            text: "Please enter a value between 0 and 1000000",
            show: error.area,
          }}
        />
        <Textfield
          label="d ( distance of plates, meter )"
          keyboardType="numeric"
          onChangeText={(value) =>
            valueChangerButarhai(value, "distance", [0, 1000000])
          }
          value={value.distance ? value.distance + "" : ""}
          error={{
            text: "Please enter a value between 0 and 1000000",
            show: error.distance,
          }}
        />
      </View>

      <View style={css.output}>
        <Text style={css.title}>Output : </Text>
        <FormSwitch
          onPress={(value) => setBigUnit(value)}
          unitText={["nano F", "micro F"]}
          unit={bigUnit}
          label="unit of capacitance"
        />
        <View>
          <Text style={css.label}>C ( Capacitance )</Text>
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

export default CapacitorSizer;

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

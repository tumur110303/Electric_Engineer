import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";

import CalcContext from "../context/CalcContext";
import Button from "../components/Button";
import Textfield from "../components/Textfield";
import FormPicker from "../components/FormPicker";
import { dark, light, main, w400, w500 } from "../constants";
import Modal from "../components/ResultModal";
import useIncreaseCount from "../hooks/useIncreaseCount";

type Value = {
  floor: boolean;
  people?: number;
  lighting?: string;
  firePump?: string;
  pump?: {
    quantity?: number;
    load?: string;
  };
  fan?: {
    quantity?: number;
    load?: string;
  };
  heater?: {
    quantity?: number;
    load?: string;
  };
  lift?: {
    quantity?: number;
    load?: string;
  };
  cable: "AC1" | "AC2";
};
type Error = {
  floor?: boolean;
  people?: boolean;
  lighting?: boolean;
  firePump?: boolean;
  pump?: boolean;
  fan?: boolean;
  heater?: boolean;
  lift?: boolean;
  cable?: boolean;
};

const ApartmentCalculator: FC = () => {
  const calcContext = useContext(CalcContext);

  const [value, setValue] = useState<Value>({
    floor: false,
    cable: "AC1",
  });
  const cables = [
    { label: "АВБбШв", value: "AC1" },
    { label: "АВВГ", value: "AC2" },
  ];
  const [error, setError] = useState<Error>({
    floor: false,
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const [power, setPower] = useState<number>();
  const [result, setResult] = useState<any>();
  const [section, setSection] = useState<string | number>();
  const [resultEmergency, setResultEmergency] = useState<any>();
  const [sectionFire, setSectionFire] = useState<string | number>();

  useEffect(() => {
    // Товч идэвхитэй, идэвхигүйг тодорхойлно.
    let disabled = true;
    disabled = !Object.values(error).every((el) => el !== true);
    if (!value.people) {
      disabled = true;
    }

    if (
      (value.fan?.load && !value.fan.quantity) ||
      (!value.fan?.load && value.fan?.quantity)
    )
      disabled = true;
    else if (
      (value.heater?.load && !value.heater.quantity) ||
      (!value.heater?.load && value.heater?.quantity)
    )
      disabled = true;
    else if (
      (value.pump?.load && !value.pump.quantity) ||
      (!value.pump?.load && value.pump?.quantity)
    )
      disabled = true;
    else if (
      (value.lift?.load && !value.lift.quantity) ||
      (!value.lift?.load && value.lift?.quantity)
    )
      disabled = true;
    else disabled = false;

    // Disabled variable оноох...
    setDisabled(disabled);
  }, [value, error]);

  const numberTab = [
    3, 4, 5, 6, 9, 12, 15, 18, 24, 40, 60, 100, 200, 400, 600, 1000,
  ];
  const privLoadTab = [
    10, 7.5, 6, 5.1, 3.8, 3.2, 2.8, 2.6, 2.2, 1.95, 1.7, 1.5, 1.36, 1.27, 1.23,
    1.19,
  ];

  const reset = () => {
    setValue({
      floor: false,
      cable: "AC1",
    });
    setResult(undefined);
    setResultEmergency(undefined);
    setSectionFire(undefined);
    setVisible(false);
    setSection(undefined);
    setPower(undefined);
  };

  const valueChanger = (
    text: string,
    id: keyof Value | [keyof Value, "quantity"],
    validation?: [number, number]
  ) => {
    const key = typeof id === "object" ? id[0] : id;
    if (text !== "") {
      const number = parseInt(text);
      if (validation) {
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
      if (key === "floor") {
        if (number > 24 || number < 0) {
          setValue((state) => {
            const copy = { ...state };
            copy[key] = true;

            return copy;
          });
        }
      } else {
        if (
          key === "heater" ||
          key === "pump" ||
          key === "fan" ||
          key === "lift"
        ) {
          setValue((value) => {
            const copy: any = { ...value };
            if (typeof id === "object") {
              if (!copy[key]) copy[key] = {};

              if (id[1] === "quantity") {
                copy[key].quantity = number;
              } else {
                copy[key].load = number;
              }
            }

            return copy;
          });
        } else {
          setValue((value) => {
            const copy: any = { ...value };
            copy[key] = number;

            return copy;
          });
        }
      }
    } else {
      setValue((value) => {
        const copy: any = { ...value };
        copy[key] = undefined;

        return copy;
      });
    }
  };
  const valueChangerButarhai = (
    text: string,
    id: keyof Value | [keyof Value, "load"],
    validation?: [number, number]
  ) => {
    const key = typeof id === "object" ? id[0] : id;
    if (text !== "") {
      const number = text;
      if (validation) {
        if (
          parseInt(number) < validation[0] ||
          validation[1] < parseInt(number)
        ) {
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
      if (
        key === "heater" ||
        key === "pump" ||
        key === "fan" ||
        key === "lift"
      ) {
        setValue((value) => {
          const copy: any = { ...value };
          if (typeof id === "object") {
            if (!copy[key]) copy[key] = {};

            copy[key].load = number;
          }

          return copy;
        });
      } else {
        setValue((value) => {
          const copy: any = { ...value };
          copy[key] = number;

          return copy;
        });
      }
    } else {
      setValue((value) => {
        const copy: any = { ...value };
        copy[key] = undefined;

        return copy;
      });
    }
  };

  const publicCalc = async (
    huviinChadal: any,
    coeff: any,
    coeffElevator: any
  ) => {
    const { lighting, pump, fan, firePump, people, cable, heater, lift } =
      value;
    if (people && cable && calcContext) {
      let pumpLoadValue = 0;
      let funLoadValue = 0;
      let heaterLoadValue = 0;
      let elevatorLoadValue = 0;
      let lightLoadValue = 0;
      let firePumpLoadValue = 0;

      let quantityHeater = 0;
      let quantityFun = 0;
      let quantityPump = 0;

      // null undefined or 0
      if (!lighting) {
        lightLoadValue = 0;
      } else if (parseFloat(lighting) < 11) {
        lightLoadValue = 0;
      } else {
        lightLoadValue = parseFloat(lighting) - 10;
      }

      if (!pump?.quantity || !pump.load) {
        pumpLoadValue = 0;
        quantityPump = 0;
      } else {
        pumpLoadValue = parseFloat(pump.load);
        quantityPump = pump.quantity;
      }

      if (!fan?.quantity || !fan.load) {
        funLoadValue = 0;
        quantityFun = 0;
      } else {
        funLoadValue = parseFloat(fan.load);
        quantityFun = fan.quantity;
      }

      if (!heater?.quantity || !heater.load) {
        heaterLoadValue = 0;
        quantityHeater = 0;
      } else {
        heaterLoadValue = parseFloat(heater.load);
        quantityHeater = heater.quantity;
      }

      if (!lift?.quantity || !lift.load) {
        elevatorLoadValue = 0;
      } else {
        elevatorLoadValue = parseFloat(lift.load);
      }

      // Хэвийн үеийн тооцоо...
      let loadHousingValue = people * huviinChadal;

      const powerToContext =
        loadHousingValue +
        0.9 *
          (coeff * (pumpLoadValue + funLoadValue + heaterLoadValue) +
            elevatorLoadValue * coeffElevator) +
        lightLoadValue * 0.8;

      // Сантехникийн ялгаатай cosф...
      // ################ DDOS ##################
      const shaardCoeffHeater = calcContext.calcPlumbCoeff(quantityHeater);
      const shaardCoeffPlumb = calcContext.calcPlumbCoeff(
        quantityFun + quantityPump
      );
      console.log(
        "publicCalcaas : ",
        shaardCoeffPlumb,
        funLoadValue + pumpLoadValue
      );
      const heaterLoadContext = heaterLoadValue * shaardCoeffHeater * 0.9;
      const plumbLoadContext =
        shaardCoeffPlumb * 0.9 * (funLoadValue + pumpLoadValue);

      // Гүйдлийг тодорхойлохыг тулд context рүү дамжуулна...
      const loadToContext = [];
      const pfToContext = [];
      const loadEmergencyToContext = [];
      const pfEmergencyToContext = [];

      loadToContext.push(
        loadHousingValue,
        heaterLoadContext,
        plumbLoadContext,
        elevatorLoadValue * coeffElevator * 0.9,
        lightLoadValue * 0.8
      );

      pfToContext.push(0.98, 0.98, 0.8, 0.65, 0.9);

      pfEmergencyToContext.push(0.8);

      const normalResult = calcContext.currentCalc(
        powerToContext,
        loadToContext,
        pfToContext,
        cable
      );

      const turRes = Object.entries(normalResult);

      // Утасны хөндлөн огтлол:
      let sectionRes = turRes[turRes.length - 1][1];

      turRes.splice(turRes.length - 1, 1);

      setPower(powerToContext);
      setResult([powerToContext, ...turRes.map((e) => e[1])]);
      setSection(sectionRes);

      if (firePump) {
        firePumpLoadValue = parseFloat(firePump);
        loadEmergencyToContext.push(firePumpLoadValue);

        const emergencyResult = calcContext?.currentCalc(
          firePumpLoadValue,
          loadEmergencyToContext,
          pfEmergencyToContext,
          "CCF"
        );
        const turEmerRes = Object.entries(emergencyResult);
        let sectionEmerRes = turEmerRes[turEmerRes.length - 1][1];
        turEmerRes.splice(1, 2);
        turEmerRes.splice(turEmerRes.length - 1, 1);

        setResultEmergency([firePumpLoadValue, ...turEmerRes.map((e) => e[1])]);
        setSectionFire(sectionEmerRes);
      }

      setVisible(true);
    }
  };

  const calc = () => {
    if (!value.people) {
      Alert.alert("Та сууцны тоог оруулна уу!");
      setVisible(false);
    } else {
      setVisible(true);
    }

    const totalNumberC1 =
      Math.round(value.pump && value.pump.quantity ? value.pump.quantity : 0) +
      Math.round(value.fan && value.fan.quantity ? value.fan.quantity : 0) +
      Math.round(
        value.heater && value.heater.quantity ? value.heater.quantity : 0
      );

    // errorShow.text && Alert.alert("Та талбаруудын утгыг бүрэн оруулна уу!");

    // Ослын үеийн тооцоо...
    // Тухайлсан ачааллуудыг тодорхойлохын тулд context руу дамжууллаа.
    const coeffElevator = calcContext?.elevatorCoeff(
      Math.round(
        Math.abs(
          value.lift ? (value.lift.quantity ? value.lift.quantity : 0) : 0
        )
      ),
      value.floor
    );
    const calcPlumbCoeff = calcContext?.calcPlumbCoeff(totalNumberC1);

    if (value.people) {
      const interpolation = calcContext?.interpolation(
        value.people,
        numberTab,
        privLoadTab
      );

      publicCalc(interpolation, calcPlumbCoeff, coeffElevator);
    }
  };

  return (
    <ScrollView style={css.container}>
      <Modal
        visible={visible}
        setVisible={setVisible}
        title="Тооцооны хариу"
        reset={reset}
      >
        <Text style={css.subtitle}>Өгөгдөл</Text>
        {(() => {
          const data = [
            {
              label: "Сууцны тоо",
              value: value.people,
              unit: null,
            },
            {
              label: "Гэрэлтүүлгийн суурилагдсан чадал",
              value: value.lighting,
              unit: "кВт",
            },
            {
              label: "Сэнсний суурилагдсан чадал",
              value: value.fan?.load,
              unit: "кВт",
            },
            {
              label: "Насосны суурилагдсан чадал",
              value: value.pump?.load,
              unit: "кВт",
            },
            {
              label: "Халаах төхөөрөмжийн суурилагдсан чадал",
              value: value.heater?.load,
              unit: "кВт",
            },
            {
              label: "Галын насос, сэнсний суурилагдсан чадал",
              value: value.firePump,
              unit: "кВт",
            },
            {
              label: "Лифтний суурилагдсан чадал",
              value: value.lift?.load,
              unit: "кВт",
            },
          ];
          return (
            <>
              {data
                .filter((item) => item.value !== undefined)
                .map(({ label, value, unit }, i) => (
                  <View key={i} style={css.modalItem}>
                    <Text
                      style={{
                        flexDirection: "row",
                        width: "90%",
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: w400,
                          color: main,
                          marginRight: 5,
                          flexWrap: "wrap",
                        }}
                      >
                        {label}:{" "}
                      </Text>
                      <Text style={{ fontFamily: w400, flexWrap: "wrap" }}>
                        {value} {unit}
                      </Text>
                    </Text>
                  </View>
                ))}
            </>
          );
        })()}
        <Text style={css.subtitle}>Үр дүн</Text>
        {(() => {
          const data = [
            {
              label: "Тооцооны чадал",
              unit: "кВт",
            },
            {
              label: "Тооцооны гүйдэл",
              unit: "А",
            },
            {
              label: "Бүрэн чадал, кВА",
              unit: "кВА",
            },
            {
              label: "Дундаж чадлын коэффициент",
              unit: null,
            },
            {
              label: "Автомат таслуурын гүйдэл",
              unit: "A",
            },
            {
              label: "Кабель ",
              value: `${
                cables.find((item) => item.value === value.cable)?.label
              } ${section}`,
            },
          ];
          return (
            <>
              {data.map(({ label, unit, value }, i) => {
                return (
                  <View key={i} style={css.modalItem}>
                    <Text
                      style={{
                        flexDirection: "row",
                        width: "90%",
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: w400,
                          color: main,
                          marginRight: 5,
                          flexWrap: "wrap",
                        }}
                      >
                        {label}:{" "}
                      </Text>
                      {value && (
                        <Text style={{ fontFamily: w400, flexWrap: "wrap" }}>
                          {value}
                        </Text>
                      )}
                      {result && (
                        <Text style={{ fontFamily: w400, flexWrap: "wrap" }}>
                          {result[i] && Math.round(result[i] * 1000) / 1000}{" "}
                          {unit}
                        </Text>
                      )}
                    </Text>
                  </View>
                );
              })}
            </>
          );
        })()}
        <Text style={css.subtitle}>Галын үед ажиллах төхөөрөмжүүд</Text>
        {(() => {
          const data = [
            {
              label: "Суурилагдсан чадал",
              unit: " кВт",
            },
            {
              label: "Хэвийн гүйдэл",
              unit: "A",
            },
            {
              label: "Автомат таслуурын гүйдэл",
              unit: "A",
            },
          ];
          return (
            <View>
              <View style={css.modalItem}>
                <Text style={{ fontFamily: w400, color: main, marginRight: 5 }}>
                  ЦХНА-ны зэрэглэл :
                </Text>
                <Text style={{ fontFamily: w400 }}>I</Text>
              </View>
              {data.map(({ label, unit }, i) => {
                if (resultEmergency && resultEmergency[i]) {
                  return (
                    <View key={i} style={css.modalItem}>
                      <Text
                        style={{
                          fontFamily: w400,
                          color: main,
                          marginRight: 5,
                          flexWrap: "wrap",
                        }}
                      >
                        {label}:
                      </Text>
                      <Text style={{ fontFamily: w400, flexWrap: "wrap" }}>
                        {Math.round(resultEmergency[i] * 100) / 100} {unit}
                      </Text>
                    </View>
                  );
                }
              })}
              <View style={css.modalItem}>
                <Text style={{ fontFamily: w400, color: main, marginRight: 5 }}>
                  Кабель :
                </Text>
                <Text style={{ fontFamily: w400 }}>
                  ВВГнг-(A)-LS {sectionFire}
                </Text>
              </View>
            </View>
          );
        })()}
      </Modal>
      <Text style={css.title}>Ерөнхий өгөгдөл</Text>
      <Textfield
        label="Барилгын давхрын тоог оруулна уу"
        placeholder="24-өөс бага тоо оруулна уу"
        icon="office-building"
        keyboardType="numeric"
        onChangeText={(value) => valueChanger(value, "floor", [1, 24])}
        error={{
          text: "Та 1-24 хүртэлх бүхэл тоо оруулна уу",
          show: error.floor,
        }}
      />
      <Textfield
        label="Сууцны тоог оруулна уу"
        placeholder="1000-аас бага тоо оруулна уу"
        icon="home-city"
        keyboardType="numeric"
        value={value.people ? value.people + "" : ""}
        onChangeText={(value) => valueChanger(value, "people", [1, 1000])}
        error={{
          text: "Та 1-1000 хүртэлх бүхэл тоо оруулна уу",
          show: error.people,
        }}
      />
      <Textfield
        label="Гэрэлтүүлгийн чадлыг оруулна уу"
        placeholder="50-аас бага тоо оруулна уу"
        icon="lightbulb-on"
        keyboardType="numeric"
        value={value.lighting ? value.lighting + "" : ""}
        onChangeText={(value) =>
          valueChangerButarhai(value, "lighting", [1, 50])
        }
        error={{
          text: "Та 1-50кВт хүртэл чадлын утга оруулна уу",
          show: error.lighting,
        }}
      />
      <Text style={{ ...css.title, marginTop: 15 }}>
        Хүчний төхөөрөмжийн өгөгдөл
      </Text>
      <Textfield
        label="Галын үед ажиллах сэнс, насосууд"
        placeholder="Нийт чадал, кВт"
        icon="fire-extinguisher"
        keyboardType="numeric"
        value={value.firePump ? value.firePump + "" : ""}
        onChangeText={(value) =>
          valueChangerButarhai(value, "firePump", [1, 200])
        }
        error={{
          text: "Та 1-200кВт хүртэл чадлын утга оруулна уу",
          show: error.firePump,
        }}
      />
      <Textfield
        label="Галын бус насоснууд"
        placeholder={["Нийт тоо, ш", "Нийт чадал, кВт"]}
        icon={["water-pump", "lightning-bolt"]}
        keyboardType="numeric"
        check
        value={[
          value.pump
            ? value.pump.quantity
              ? value.pump.quantity + ""
              : ""
            : "",
          value.pump ? (value.pump.load ? value.pump.load + "" : "") : "",
        ]}
        onChangeText={(value) =>
          valueChanger(value, ["pump", "quantity"], [1, 200])
        }
        checkChangeText={(value) =>
          valueChangerButarhai(value, ["pump", "load"], [1, 200])
        }
        error={{
          text: "Та 1-200кВт хүртэл чадлын утга оруулна уу",
          show: error.pump,
        }}
      />
      <Textfield
        label="Агааржуулах сэнс, кондиционер"
        placeholder={["Нийт тоо, ш", "Нийт чадал, кВт"]}
        icon={["fan", "lightning-bolt"]}
        keyboardType="numeric"
        check
        value={[
          value.fan ? (value.fan.quantity ? value.fan.quantity + "" : "") : "",
          value.fan ? (value.fan.load ? value.fan.load + "" : "") : "",
        ]}
        onChangeText={(value) =>
          valueChanger(value, ["fan", "quantity"], [1, 200])
        }
        checkChangeText={(value) =>
          valueChangerButarhai(value, ["fan", "load"], [1, 200])
        }
        error={{
          text: "Та 1-200кВт хүртэл чадлын утга оруулна уу",
          show: error.fan,
        }}
      />
      <Textfield
        label="Агаар халаагч, цахилгаан халаах элементүүд"
        placeholder={["Нийт тоо, ш", "Нийт чадал, кВт"]}
        icon={["air-filter", "lightning-bolt"]}
        keyboardType="numeric"
        check
        value={[
          value.heater
            ? value.heater.quantity
              ? value.heater.quantity + ""
              : ""
            : "",
          value.heater ? (value.heater.load ? value.heater.load + "" : "") : "",
        ]}
        onChangeText={(value) =>
          valueChanger(value, ["heater", "quantity"], [1, 600])
        }
        checkChangeText={(value) =>
          valueChangerButarhai(value, ["heater", "load"], [1, 600])
        }
        error={{
          text: "Та 1-600кВт хүртэл чадлын утга оруулна уу",
          show: error.heater,
        }}
      />
      <Textfield
        label="Лифт"
        placeholder={["Нийт тоо, ш", "Нийт чадал, кВт"]}
        icon={["elevator-passenger", "lightning-bolt"]}
        keyboardType="numeric"
        check
        value={[
          value.lift
            ? value.lift.quantity
              ? value.lift.quantity + ""
              : ""
            : "",
          value.lift ? (value.lift.load ? value.lift.load + "" : "") : "",
        ]}
        onChangeText={(value) =>
          valueChanger(value, ["lift", "quantity"], [1, 200])
        }
        checkChangeText={(value) =>
          valueChangerButarhai(value, ["lift", "load"], [1, 200])
        }
        error={{
          text: "Та 1-200кВт хүртэл чадлын утга оруулна уу",
          show: error.lift,
        }}
      />
      <FormPicker
        label="Кабелийн маяг"
        icon="google-circles-communities"
        options={cables}
        onValueChange={(value: any) => {
          setValue((state) => {
            const copyState = { ...state };
            copyState.cable = value;
            return copyState;
          });
        }}
        value={value.cable}
      />
      <Button disable={disabled} onPress={calc}>
        Тооцоолох
      </Button>
      <View style={{ marginBottom: 20 }}></View>
    </ScrollView>
  );
};

export default ApartmentCalculator;

const css = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  title: {
    fontFamily: w500,
    textTransform: "uppercase",
    fontSize: 16,
    color: main,
    marginLeft: 7,
    alignSelf: "center",
    paddingHorizontal: 3,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: w500,
    textTransform: "uppercase",
    fontSize: 16,
    color: dark,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: light,
    marginVertical: 3,
    padding: 7,
    borderRadius: 5,
  },
});

import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import FormPicker from "../components/FormPicker";
import CalcContext from "../context/CalcContext";
import { dark, light, main, w500 } from "../constants";

const PrivatePowerScreen = () => {
  type Value = {
    length?: string;
    width?: string;
    height?: string;
  };

  type Error = {
    length?: boolean;
    width?: boolean;
    height?: boolean;
  };

  const calcContext = useContext(CalcContext);
  // ##############################   ХУВЬСАГЧУУД   #########################################
  const [value, setValue] = useState<Value>({});
  const [error, setError] = useState<Error>({});
  const [privateLuminosity, setPrivateLuminosity] = useState<number>();
  const [numberLight, setNumberLight] = useState<number>(1);
  // Туслах өгөгдлүүд...
  const [type, setType] = useState<string>("люминесцент");
  const [roomType, setRoomType] = useState<string>("0");
  const [lightType, setLightType] = useState<string>("0");
  const [twoRoom, setTwoRoom] = useState<boolean>(false);
  const [ro, setRo] = useState<string>("0");

  const [chadlaar, setChadlaar] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  // Өрөө тасалгааны өгөгдлүүдийн options
  const roomTypesOptions = [
    { label: "Механик цех", value: "0" },
    { label: "Төмрийн цех", value: "1" },
    { label: "Бэлтгэл цех", value: "3" },
    { label: "Гагнуурын цех", value: "4" },
    { label: "Металл өнгөлгөөний хэсэг", value: "5" },
    { label: "Аппарат хэрэгслийн засварын цех", value: "6" },
    { label: "Трансформаторын засварын хэсэг", value: "7" },
    { label: "Цахилгаан засварын хэсэг", value: "8" },
    { label: "Хатаалгын цех", value: "9" },
    { label: "Мод боловсруулах цех", value: "10" },
    { label: "Будгийн цех", value: "11" },
    { label: "Химийн лаборатори", value: "12" },
    { label: "Засвар үйлчилгээний газар", value: "13" },
    { label: "Автомашины дулаан зогсоол", value: "14" },
    { label: "Түлшний аппарат, засвар", value: "15" },
    { label: "Акумуляторын өрөө", value: "16" },
    { label: "Хүчилтөрөгчийн өрөө", value: "17" },
    { label: "Цавууны цех", value: "18" },
    { label: "Зуухан цех", value: "19" },
    { label: "Салхивчийн өрөө", value: "20" },
    { label: "Хими, ус цэвэрлэгээний өрөө", value: "21" },
    { label: "Түлш дамжуулах өрөө", value: "22" },
    { label: "Жижүүртэй цахилгааны самбарын өрөө", value: "23" },
    { label: "Диспетчерийн өрөө", value: "24" },
    { label: "Трансформаторын өрөө", value: "25" },
    { label: "Дэд станцын хуваарилах байгууламжийн өрөө", value: "26" },
    { label: "Сантехникийн узелийн өрөө", value: "27" },
  ];

  return (
    <ScrollView style={css.container}>
      <FormPicker
        label="Өрөөний зориулалт"
        icon="blur"
        options={roomTypesOptions}
        onValueChange={(value) => setRoomType(value)}
        value={roomType ? roomType : "0"}
      />
      {console.log(roomType)}
    </ScrollView>
  );
};

export default PrivatePowerScreen;

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

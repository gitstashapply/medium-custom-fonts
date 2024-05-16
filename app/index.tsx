import { SafeAreaView, View } from "react-native";
import { useFonts as useExpoFonts } from "expo-font";
import { CustomFont } from "./CustomFont/CustomFont";

export default () => {
  useExpoFonts({
    "Anek-Bold": require("../assets/fonts/AnekLatin-Bold.ttf"),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <CustomFont style={{ fontSize: 40 }} text={"Hello RN Community"} />
        <CustomFont
          style={{ fontSize: 24 }}
          text={"Thank you for reading this article!"}
        />
        <CustomFont style={{ fontSize: 14 }} text={"@gitstashapply"} />
      </View>
    </SafeAreaView>
  );
};

import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: 150,
    height: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "contain",
  },
});

import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  carousel: {
    position: "absolute",
    height: "20%",

    bottom: 30,

    borderRadius: 20,
  },
  button: {
    position: "absolute",
    top: -75,
    right: 15,
    backgroundColor: "#007AFF",
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  slide: {
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
  },
  slideContent: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  textContainer: {
    width: "65%",
    height: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "35%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

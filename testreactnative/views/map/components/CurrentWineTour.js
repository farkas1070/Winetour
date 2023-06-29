import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styles } from "./CurrentWineTourStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CurrentWineTour = ({currentTour}) => {
  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <Text style={styles.buttonText}>Jelenlegi Bortúra: {currentTour.name}</Text>
        <TouchableOpacity style={styles.cancelbutton} >
          <MaterialCommunityIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CurrentWineTour;

import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState, useContext } from "react";
import { Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./EventsStyle";
import Card from "./components/Card";
import moment from "moment";
import { EventsContext } from "../../context/GlobalContext.js";
import SearchBar from "./components/Search";
import { SafeAreaView } from "react-native-safe-area-context";
const Events = () => {
  const [showListFirst, setShowListFirst] = useState(true);
  const [currentDate, setCurrentDate] = useState("2023-06-20");
  const [events, setEvents] = useContext(EventsContext);
  const [searchText, setSearchText] = useState("");

  function showDifferentLayout() {
    setShowListFirst(!showListFirst);
  }

  const filterItems = () => {
    return events.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  function getDatesInRange(startDate, endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    const dates = [];
    let currentDate = start.clone();

    while (currentDate.isSameOrBefore(end, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }

    return dates;
  }

  return (
    <SafeAreaView style={styles.maincontainer}>
      <View style={{ paddingRight: 10, flexDirection: "row" }}>
        <SearchBar onSearch={setSearchText} />
      </View>
      
        
        
        <View style={{width:'100%',flexGrow:1}}>
        {showListFirst? <TouchableOpacity style={styles.changeButton}>
          <Ionicons
            name="calendar"
            size={30}
            color="white"
            
            onPress={() => {
              showDifferentLayout();
            }}
          />
        </TouchableOpacity> : 
        <TouchableOpacity style={styles.changeButton}> 
        <Ionicons
          name="list"
          size={30}
          color="white"
          
          onPress={() => {
            showDifferentLayout();
          }}
        />
      </TouchableOpacity>
        }
      {showListFirst ? (
  
        <ScrollView style={{marginBottom:70}}>
          
          {filterItems().map((item, index) => {
            return <Card item={item} index={index} key={index} />;
          })}
        </ScrollView>
      ) : (
        <View style={{width:'100%',flexGrow:1}}>
        <Agenda
          selected={currentDate}
          items={events.reduce((acc, event) => {
            const { start_date, end_date, title, image } = event;
            const dateRange = getDatesInRange(
              start_date.originalStartDate,
              end_date.originalEndDate
            );
            dateRange.forEach((date) => {
              const formattedDate = moment(date).format("YYYY-MM-DD");
              if (!acc[formattedDate]) {
                acc[formattedDate] = [];
              }
              acc[formattedDate].push({
                name: title,
                image: image,
                start_date: start_date,
                end_date: end_date,
              });
            });
            return acc;
          }, {})}
          renderItem={(item, isFirst) => (
            <TouchableOpacity style={styles.item}>
              <View style={styles.card}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.dateText}>
                  {item.start_date.originalStartDate} -{" "}
                  {item.end_date.originalEndDate}
                </Text>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            </TouchableOpacity>
          )}
          showClosingKnob={true}
          renderEmptyData={() => {
            return (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ textAlign: "center" }}>
                  Nincsenek események ezen a napon.
                </Text>
              </View>
            );
          }}
        />
        </View>
      )}
      </View>
    </SafeAreaView>
  );
};

export default Events;

import {
  View,
  TouchableOpacity,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Carousel from "react-native-snap-carousel-v4";
import { styles } from "./MapStyle";
import { Mapstyle } from "./CustomMapStyle";
import VineyardImage from "../../assets/marker.png";
import SightImage from "../../assets/yellowmarker.png";
import ActiveMarker from "../../assets/active_marker.png";
import { get } from "../../controllers/PointOfInterestController";

const Map = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const carouselRef = useRef(null);
  const { width } = useWindowDimensions();
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(0);
  const [pointsOfInterest, setpointsOfInterest] = useState([]);
  const [position, setPosition] = useState({
    latitude: 47.6828354,
    longitude: 16.5813035,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [filter, setFilter] = useState("all");

  const handleMarkerPress = (index) => {
    setActiveMarkerIndex(index);
    carouselRef.current.snapToItem(index);
  };

  const handleResetLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  function returnMarkerIcon(type) {
    switch (type) {
      case "sight":
        return SightImage;
      case "vineyard":
        return VineyardImage;
    }
  }

  const filterMarkers = (type) => {
    if (type === "sight") {
      return pointsOfInterest.filter((poi) => poi.type === "sight");
    } else if (type === "vineyard") {
      return pointsOfInterest.filter((poi) => poi.type === "vineyard");
    } else {
      return pointsOfInterest;
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const foregroundSubscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        (location) => {
          let cor = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setPosition(cor);
        }
      );

      return () => {
        foregroundSubscription.remove();
      };
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await get();
      response.data.forEach((element) => {
        setpointsOfInterest((oldArray) => [...oldArray, element.attributes]);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const jumpToPointOfInterest = () => {
      if (pointsOfInterest.length > 0 && mapRef.current) {
        const coordinates = pointsOfInterest.map((marker) => ({
          latitude: marker.latitude,
          longitude: marker.longitude,
        }));

        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    };
    jumpToPointOfInterest();
  }, [pointsOfInterest]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        customMapStyle={Mapstyle}
      >
        {filterMarkers(filter).map((poi, index) => {
          return (
            <Marker
              id={index}
              ref={markerRef}
              key={index}
              coordinate={{
                latitude: poi.latitude,
                longitude: poi.longitude,
              }}
              resizeMode="contain"
              icon={
                activeMarkerIndex === index
                  ? ActiveMarker
                  : returnMarkerIcon(poi.type)
              }
              onPress={() => {
                handleMarkerPress(index);
              }}
            >
              <Callout style={styles.callout}>
                <Text>{poi.name}</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity
          style={
            filter === "vineyard"
              ? styles.filterButtonActive
              : styles.filterButton
          }
          onPress={() => {
            filter !== "vineyard" ? setFilter("vineyard") : setFilter("all");
          }}
        >
          <Text style={styles.buttonText}>
            <MaterialIcons name="wine-bar" size={28} color="#FFF" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            filter === "sight" ? styles.filterButtonActive : styles.filterButton
          }
          onPress={() => {
            filter !== "sight" ? setFilter("sight") : setFilter("all");
          }}
        >
          <Text style={styles.buttonText}>
            <MaterialIcons name="wb-shade" size={28} color="#FFF" />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.carousel}>
        <TouchableOpacity style={styles.button} onPress={handleResetLocation}>
          <Text style={styles.buttonText}>
            <MaterialIcons name="my-location" size={28} color="#FFF" />
          </Text>
        </TouchableOpacity>
        <Carousel
          ref={carouselRef}
          layout="default"
          data={filterMarkers(filter)}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.slide}>
                <View style={styles.slideContent}>
                  <Image style={styles.image} source={{ uri: item.image }} />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{"description"}</Text>
                  </View>
                </View>
              </View>
            );
          }}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => {
            mapRef.current.animateToRegion({
              latitude: filterMarkers(filter)[index].latitude,
              longitude: filterMarkers(filter)[index].longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
            setActiveMarkerIndex(index);
          }}
        />
      </View>
    </View>
  );
};

export default Map;
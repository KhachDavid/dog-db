import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "./styles.scss";
import "leaflet/dist/leaflet.css";
import "leaflet-area-select";
import { useSelector, useDispatch } from "react-redux";
import { selectUserLat, selectUserLng, selectGeoBoundingBox } from "../../store/sagas/selectors";
import {
  setGeoboundingBox,
} from "../../store/actions/location.actions";


const CustomMap = () => {
  const lat = useSelector(selectUserLat);
  const lng = useSelector(selectUserLng);
  const dispatch = useDispatch();
  const geoBoundingBox = useSelector(selectGeoBoundingBox);

  function updateRectangleBounds(currentBounds) {
    const { lat: swLat, lng: swLng } = currentBounds._southWest;
    const { lat: neLat, lng: neLng } = currentBounds._northEast;
    const geoBoundingBox = {
      bottom_left: { lat: swLat, lon: swLng },
      top_right: { lat: neLat, lon: neLng },
    };
    // Assuming you have a dispatch function for Redux, you can put it in Redux now
    dispatch(setGeoboundingBox(geoBoundingBox));
  }

  function Drag() {
    const map = useMapEvents({
      dragend: (e) => {
        //console.log("mapCenter", e.target.getCenter())
        updateRectangleBounds(map.getBounds());
      },
      moveend: (e) => {
        updateRectangleBounds(map.getBounds());
      },
    });

    useEffect(() => {
      if (!geoBoundingBox.bottom_left) {
          updateRectangleBounds(map.getBounds());
      }
    }, []);

    return <></>
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={10}
      scrollWheelZoom
      style={{ width: "550px", height: "75vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Drag />
    </MapContainer>
  );
};

export default CustomMap;

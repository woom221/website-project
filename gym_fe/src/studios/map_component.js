import React, { useState, useEffect } from "react";
import Map from "./Map/Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat } from "ol/proj";
import { Controls, FullScreenControl } from "./Controls";

import mapConfig from "./config.json";
import { useLocation } from "react-router-dom";

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const MapComponent = ( {markers} ) => {
  useEffect(() => {
    setFeatures(addMarkers(markers));
  }, [markers])

  let latlon = []
  const [center, setCenter] = useState([0, 0]);
  navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    latlon = [lon, lat]
    setCenter(latlon)
  });
  
  const [zoom, setZoom] = useState(12);
  
  const [features, setFeatures] = useState(addMarkers(markers));
  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom} clickable={false}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer source={vector({ features })} />
        </Layers>
      </Map>
    </div>
  );
};

export default MapComponent;

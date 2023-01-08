import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Map from "./Map/Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat } from "ol/proj";
import { transform } from 'ol/proj';
import Nav from '../nav.js';
import mapConfig from "./config.json";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, CssBaseline } from "@mui/material";
import image from '../background.jpg';

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

let clicked = []

const MapClickable = () => {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([])

  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(true);
    }
  }, [])

  const onClick = (evt) => {
    clicked = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
    let mkr = []
    mkr.push(clicked)
    setMarkers(mkr)
  }

  useEffect(() => {
    const val = addMarkers(markers)
    setFeatures(addMarkers([clicked,]));
    
  }, [markers])
  
  const submitPin = (e) => {
    e.preventDefault()
    if (markers.length == 0) {
      document.getElementsByClassName('pin-err')[0].innerHTML = 'Please choose a location'
    }
    else {
      const lat = markers[0][0]
      const lon = markers[0][1]
      const latlon = lon + ', ' + lat
      // navigate to all_studios (studios_page) with lat lon info
      navigate('/all_studios', {state: {origin: latlon, type:'latlon'}})
    }
  }
  let latlon = []
  const [center, setCenter] = useState([0, 0]);
  navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    latlon = [lon, lat]
    setCenter(latlon)
  });
  
  const [zoom, setZoom] = useState(12);
  const [features, setFeatures] = useState(...addMarkers(markers));
  return (
    <ThemeProvider>
      <Nav isAuthenticated={auth}/>
      <CssBaseline/>
      <Box sx={{height: '100vh',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',}}>
        <Container>
          <Map center={fromLonLat(center)} zoom={zoom} onClick={onClick} clickable={true}>
            <Layers>
              <TileLayer source={osm()} zIndex={0} />
              <VectorLayer source={vector({ features })} />
            </Layers>
          </Map>
          <Button onClick={(e) => submitPin(e)} fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>Submit Pin</Button>
          <p className="pin-err" color="secondary"></p>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MapClickable;

import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import { Vector } from "ol/layer";
import { Vector as VecSource} from "ol/source";
import { Style, Icon } from "ol/style";
import { Point } from "ol/geom";
import { transform } from 'ol/proj';
import mapConfig from '../config.json'
const Map = ({ children, zoom, center, onClick, clickable }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);

	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);
		return () => mapObject.setTarget(undefined);
	}, []);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)
	}, [center])

	useEffect(() => {
		if (map && clickable) {
			map.on('click', function(evt){
				onClick(evt);
				map.getLayers().getArray().slice().forEach(layer => {
					if (layer && layer.get('name') === 'MyMarker') {
						map.removeLayer(layer);
					}
				});
				const feature = new ol.Feature(new Point(evt.coordinate));
				const pinLayer = new Vector ({
					source: new VecSource ({
						features: [feature]
					}),
					style: new Style ({
						image: new Icon({
						anchorXUnits: "fraction",
						anchorYUnits: "pixels",
						src: mapConfig.markerImage32,
						}),
					}),
					name: 'MyMarker'
				});
				map.addLayer(pinLayer);
			});
		}
	}, [map])
	

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import Popup from '../../Components/Popup';
import CustomTooltip from '../../Components/Tooltip';

import { addPoint } from '../../Reducers/Layers/actions';
import { layers3d, mapCongig, customMapSourse, customMapLayer } from './constants';

import './style.css';


function MapPage() {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const TooltipContainer = useRef(new mapboxgl.Popup({offset: 15}));
  const [map, setMap] = useState(null);
  const [popUp, setPopUp] = useState({
    open: false,
    points: [],
  });
  const layer = useSelector(state => state.layer);

  const mapClickHandle = (e) => {
    const hasRandomPoints = map.queryRenderedFeatures(e.point, {layers: ['random-points-layer']});
    const isBuilding = map.queryRenderedFeatures(e.point, {layers: ['building']});

    if (hasRandomPoints.length || !isBuilding.length) return;

    if (e.point) {
      const {lat, lng} = e.lngLat;
      setPopUp({open: true, points: [lng, lat]});
    }
  };

  const mapHoverAdd = (e) => {
    if (e.point) {
      const point = e.lngLat;
      const {properties} = e.features[0];
      const TooltipNode = document.createElement('div');

      ReactDOM.render(<CustomTooltip {...properties}/>, TooltipNode);
      TooltipContainer.current.setLngLat(point).setDOMContent(TooltipNode).addTo(map);
    }
  };

  const mapHoverRemove = () => {
    if (TooltipContainer && TooltipContainer.current) TooltipContainer.current.remove();
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    const initializeMap = ({setMap, mapContainer}) => {
      const map = new mapboxgl.Map(mapCongig(mapContainer.current));

      map.on('load', async () => {
        map.addSource('random-points-data', customMapSourse);
        map.addLayer(customMapLayer);

        const layers = map.getStyle().layers;
        let labelLayerId;
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
          }
        }

        map.addLayer(layers3d, labelLayerId);
        setMap(map);
        map.resize();
      });
    };

    if (map) {
      if (layer && layer.features && layer.features.length) {
        map.getSource('random-points-data').setData(layer);
      }
      map.on('click', mapClickHandle);
      map.on('mouseover', 'random-points-layer', mapHoverAdd);
      map.on('mouseout', 'random-points-layer', mapHoverRemove);
    }

    if (!map) initializeMap({setMap, mapContainer});
  }, [map]);

  const handleClosePopUp = () => {
    setPopUp({open: false, points: []});
  };

  const addPointTest = async (data) => {
    dispatch(addPoint({points: popUp.points, properties: {...data, id: 'test'}}));
    handleClosePopUp();
  };

  useEffect(() => {
    if (map && layer) {
      map.getSource('random-points-data').setData(layer);
    }
  }, [layer]);

  return (
    <>
      <div className="map-container" ref={mapContainer}/>
      {popUp.open && <Popup {...popUp} handleClose={handleClosePopUp} addPoint={addPointTest}/>}
    </>);
}

export default MapPage;

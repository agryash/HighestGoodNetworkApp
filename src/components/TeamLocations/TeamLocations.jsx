import React from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../utils/URL';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './TeamLocations.css';
const TeamLocations = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  useEffect(() => {
    async function getUserProfiles() {
      const users = await axios.get(ENDPOINTS.USER_PROFILES);
      setUserProfiles(users.data);
    }
    getUserProfiles();
  }, []);
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
  // return userProfiles.map(profile => {
  //   return (
  //     <div>
  //       <div>{`Name: ${profile.firstName} ${profile.lastName}`}</div>
  //       <div>{`Title: ${profile.jobTitle}`}</div>
  //       <div>{`Location: ${profile.location}`}</div>
  //     </div>
  //   );
  // });
};

export default TeamLocations;

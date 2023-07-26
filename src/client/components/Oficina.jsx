import '../styles/Oficina.css';
import GoogleMapReact from 'google-map-react';
import Footer from './Footer'


const Oficina = () => {
  
    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
        position: { lat: -1.66959, lng: -78.65313 },
        map,
        title: 'Renta Car Riobamba!, Carabobo 22-35 y, Riobamba-Chimborazo-Ecuador, telf. 0995351646'
        });
        return marker;
       };
  
  
    return (
    <div className="containermaps" >
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD1lRe4gzlJ59MrUuFYIdMIN2GFKxi7WiA' }} // Reemplaza 'YOUR_GOOGLE_MAPS_API_KEY' con tu clave de API de Google Maps
        defaultCenter={{lat: -1.66959 , lng: -78.65313}}
        defaultZoom={20}
        mapMinHeight="100vh"
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >
      </GoogleMapReact>
      <Footer/>
    </div>
  );
};

export default Oficina;

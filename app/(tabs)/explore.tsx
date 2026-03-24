import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

const NOUAKCHOTT_LAT = 18.0735;
const NOUAKCHOTT_LNG = -15.9582;

const leafletHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl: true, attributionControl: false })
      .setView([${NOUAKCHOTT_LAT}, ${NOUAKCHOTT_LNG}], 13);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19 }
    ).addTo(map);

    L.marker([${NOUAKCHOTT_LAT}, ${NOUAKCHOTT_LNG}])
      .addTo(map)
      .bindPopup('<b>Nouakchott</b><br>Capital of Mauritania')
      .openPopup();
  </script>
</body>
</html>
`;

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.mapCard}>
        <ThemedText type="subtitle" style={styles.mapTitle}>Nouakchott — Satellite View</ThemedText>
        <ThemedText style={styles.description}>
          Nouakchott is the capital and largest city of Mauritania, located on the Atlantic coast of West Africa.
        </ThemedText>
        <View style={styles.mapContainer}>
          <WebView
            source={{ html: leafletHTML }}
            style={styles.map}
            scrollEnabled={false}
            javaScriptEnabled
          />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  mapCard: {
    borderRadius: 14,
    overflow: 'hidden',
    padding: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  mapTitle: {
    marginBottom: 2,
  },
  description: {
    opacity: 0.7,
    fontSize: 14,
  },
  mapContainer: {
    height: 260,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});

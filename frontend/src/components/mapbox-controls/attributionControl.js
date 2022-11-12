import mapboxgl from 'mapbox-gl'
const attrControl = new mapboxgl.AttributionControl({
  compact: true,
  customAttribution:
    '<b><a style="color: #FEC503"  href="https://anagraph.io/" target="_blank">Anagraph</a></b>'
})

export default attrControl

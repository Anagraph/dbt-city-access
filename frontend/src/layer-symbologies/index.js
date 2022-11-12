// IMPORT THE SYMBOLOGY JSON FILES IF THE LAYER IS GOING TO BE RANGED OR CATEGORIZED
// import firstLayerSymbology from './first-layer-symbology'
import randomPointsDesjardins from './random-points-desjardins'
export default [
  /* ,
  {
    id: 'firs-layer-id', // Must be same as the layer id in the config file
    property: 'COLUMN NAME OF THE TABLE',
    geometryType: 'MAPBOX GEOMETRY TYPE (fill,line,circle ...)',
    symbologyType: 'categories / ranges',
    symbologyItems: firstLayerSymbology,
    defaultColor: 'black'
  } */
  {
    id: 'fake-vpn-connections',
    property: 'colored',
    geometryType: 'circle',
    symbologyType: 'categories',
    symbologyItems: randomPointsDesjardins,
    defaultColor: 'black'
  }
]

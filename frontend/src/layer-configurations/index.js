import randompointsdesjardins from './randompointsdesjardins.json'

// Layer config is an array of layer group objects. Each layer group can contain multiple layers
// Layer group object has 'id' and 'layers' properties
// 'id' property is used to identify layer group object and to name the checkbox labels
// 'layers' property is an array of layer objects

// - Layer object represent the layer on the map
// - It has id,source,style,before (or after) properties
// - 'id' property is a string and it's used to identify the layer
// - 'source' property is an object. Properties are 'type' and 'tiles' for a Vector Layer
// and 'type' and 'data' for GeoJSON Layer
// - 'style' property is an object to add mapbox styles. It has 'type' (Mapbox geometry type),
// 'source-layer' (To make sure layers are referencing the correct source layers, layer
// object also needs to include a source-layer), 'paint' (Mapbox Styles),
// 'minzoom' and 'maxzoom' (If adding multiple layers in a layer group) properties.
// - 'before','after' properties are string and they take the layer id of any layer on the map.
// It's used to adjust the order of the layers on the map

export default [
  /* {
    id: 'First Layer Group Id',
    layers: [
      {
        id: 'first-layer-id',
        source: {
          type: 'vector',
          tiles: [
            'https://pilote.anagraph.io/EXAMPLE/dbt.TABLE_NAME_1/{z}/{x}/{y}.pbf'
          ]
        },
        style: {
          type: 'GEOMETRY TYPE (circle,fill,line ...)',
          'source-layer': 'dbt.TABLE_NAME_1',
          paint: {
            // Mapbox Layer Styles //
            'fill-opacity': 0.8
          },
          // IF THERE ARE MORE THAN ONE LAYERS IN A LAYER GROUP //
          // ADD 'minzoom','maxzoom' TO TOGGLE THEM ON THE MAP  //
          minzoom: 1,
          maxzoom: 6
        }
      },
      {
        id: 'second-layer-id',
        source: {
          type: 'GEOMETRY TYPE (circle,fill,line ...)',
          tiles: [
            'https://pilote.anagraph.io/EXAMPLE/dbt.TABLE_NAME_2/{z}/{x}/{y}.pbf'
          ]
        },
        style: {
          type: 'GEOMETRY TYPE',
          'source-layer': 'dbt.TABLE_NAME_2',
          paint: {
            //  Mapbox Layer Styles //
            'fill-opacity': 0.8
          },
          minzoom: 6,
          maxzoom: 15
        }
      }
    ]
  },
  {
    id: 'Second Layer Group Id',
    layers: [
      {
        id: 'third-layer-id',
        source: {
          type: 'vector',
          data: importedGeoJsonFile
        },
        style: {
          type: 'GEOMETRY TYPE (circle,fill,line ...)',
          'source-layer': 'dbt.TABLE_NAME_3',
          paint: {
            // Mapbox Layer Styles //
            'fill-opacity': 0.8
          },
          // IF THERE ARE MORE THAN ONE LAYERS IN A LAYER GROUP //
          // ADD 'minzoom','maxzoom' TO TOGGLE THEM ON THE MAP  //
        }
      }
    ]
  }, */
  {
    id: 'Fake Vpn Connections',
    layers: [
      {
        id: 'fake-vpn-connections',
        source: {
          type: 'geojson',
          data: randompointsdesjardins
        },
        style: {
          type: 'circle',
          paint: {
            'circle-color': ['get', 'colored'],
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              [
                'case',
                ['boolean', ['==', ['get', 'colored'], 'red'], true],
                1,
                0.3
              ],
              12,
              1
            ],
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              [
                'case',
                ['boolean', ['==', ['get', 'colored'], 'red'], true],
                3,
                1
              ],
              12,
              [
                'case',
                ['boolean', ['==', ['get', 'colored'], 'red'], true],
                6,
                3
              ],
              14,
              [
                'case',
                ['boolean', ['==', ['get', 'colored'], 'red'], true],
                12,
                4
              ]
            ]
          }
        }
      }
    ]
  }
]

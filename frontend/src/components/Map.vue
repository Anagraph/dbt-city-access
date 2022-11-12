<template>
  <div>
    <gl-map
      ref="mapRef"
      :init-map-position="options"
      :logo-control="logoControl"
      :attr-control="attrControl"
    />
  </div>
</template>

<script>
import GlMap from '@anagraph/gl-map'
import { useToggleLayers } from '../commons/lib/useToggleLayers'
import { shallowRef, onMounted, toRef, watch } from 'vue'
import AttributionControl from '@/components/mapbox-controls/attributionControl'
import LogoControl from '@/components/mapbox-controls/logoControl'

export default {
  components: {
    GlMap
  },
  props: {
    token: {
      type: String,
      default: null
    },
    layersStyledConfig: {
      type: Array,
      default: () => []
    },
    visibleLayerGroups: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => null
    }
  },
  emits: ['loaded', 'update-category-widgets'],
  setup(props, { emit }) {
    const filter = toRef(props, 'filter')
    const mapRef = shallowRef(null)
    const visibleLayerGroups = toRef(props, 'visibleLayerGroups')
    const attrControl = AttributionControl
    const logoControl = LogoControl
    useToggleLayers(mapRef, props.layersStyledConfig, visibleLayerGroups)
    onMounted(() => {
      const map = mapRef.value.map
      map.on('load', () => {
        watch(filter, newVal => {
          if (!newVal) return
          newVal.map(({ layerId, filter: mapboxFilter }) => {
            mapRef.value.map.setFilter(layerId, mapboxFilter)
          })
        })
        watch(visibleLayerGroups, () => {
          props.layersStyledConfig.forEach(layerGroup =>
            layerGroup.layers.forEach(layer =>
              mapRef.value.map.setFilter(layer.id, ['all'])
            )
          )
        })
        emit('loaded', true)
      })
      map.on('idle', () => {
        const map = mapRef.value.map
        const layers = visibleLayerGroups.value.map(g => g.layers).flat()
        const layerIds = layers.map(l => l.id)
        const features = map.queryRenderedFeatures({
          layers: layerIds
        })
        emit('update-category-widgets', features)
      })
    })
    const transformRequest = (url, resourceType) => {
      if (!process.env.VUE_APP_PROTECTED_TILES_URL) return
      if (
        resourceType === 'Tile' &&
        url.startsWith(process.env.VUE_APP_PROTECTED_TILES_URL)
      ) {
        return {
          url: url,
          headers: { Authorization: `Bearer ${props.token}` }
        }
      }
    }
    return {
      mapRef,
      options: {
        center: { lng: -73.7394, lat: 45.5547 },
        zoom: 9,
        transformRequest,
        hash: process.env.NODE_ENV === 'development',
        ...props.config
      },
      attrControl,
      logoControl
    }
  }
}
</script>

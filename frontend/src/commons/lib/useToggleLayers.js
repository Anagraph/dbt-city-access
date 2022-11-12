import { onMounted, watch } from 'vue'

export const useToggleLayers = (
  mapRef,
  layersStyledConfig,
  visibleLayerGroups
) => {
  onMounted(() => {
    const map = mapRef.value.map
    map.on('load', () => {
      layersStyledConfig.forEach(layerGroup => {
        layerGroup.layers.forEach(({ id, source, style, before }) => {
          const sourceId = `${id}-source`
          const layerId = id
          map.addSource(sourceId, source)
          map.addLayer(
            {
              ...style,
              id: layerId,
              source: sourceId,
              layout: {
                ...style.layout,
                visibility: visibleLayerGroups.value
                  .map(layerGroup => layerGroup.id)
                  .includes(layerGroup.id)
                  ? 'visible'
                  : 'none'
              }
            },
            before
          )
        })
      })
    })
  })
  watch(visibleLayerGroups, (newVal, oldVal) => {
    const layerGroupsToShow = newVal.filter(g => !oldVal.includes(g))
    const layerGroupsToHide = oldVal.filter(g => !newVal.includes(g))

    layerGroupsToShow.forEach(layerGroup => {
      layerGroup.layers.forEach(layer => {
        mapRef.value.map.setLayoutProperty(layer.id, 'visibility', 'visible')
      })
    })
    layerGroupsToHide.forEach(layerGroup => {
      layerGroup.layers.forEach(layer => {
        mapRef.value.map.setLayoutProperty(layer.id, 'visibility', 'none')
      })
    })
  })
  return {
    mapRef
  }
}

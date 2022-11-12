import symbologyBuilder from '@/commons/lib/symbologyBuilder'

export function addLayersSymbologies(layerGroups, symbologies) {
  return layerGroups.map(group => {
    const layers = group.layers.map(layer => {
      const symbology = symbologies.find(s => s.id === layer.id)
      if (symbology) {
        const symbologyPaint = symbologyBuilder(symbology)
        return {
          ...layer,
          style: {
            ...layer.style,
            paint: { ...layer.style.paint, ...symbologyPaint }
          }
        }
      } else {
        return layer
      }
    })
    return {
      ...group,
      layers
    }
  })
}

export function getCategoryWidgetItems(visibleLayers, symbologies, features) {
  const visibleSymbologies = visibleLayers.map(layer =>
    symbologies.find(symbology => symbology.id === layer.id)
  )

  const reducers = {
    categories: (acc, curr) => {
      const featurePropertyNames = Object.keys(curr.properties)
      const symbology = symbologies.find(s =>
        featurePropertyNames.includes(s.property)
      )
      const featurePropertyValue = curr.properties[symbology.property]
      const item = acc.find(accItem => accItem.id === featurePropertyValue)
      if (!item) {
        const symbologyItem = symbology.symbologyItems.find(
          i => i.value === featurePropertyValue
        )
        const { value: id, label: name, color } = symbologyItem
        return [...acc, { id, name, color, value: 1 }]
      } else {
        item.value++
        return acc
      }
    },
    ranges: (acc, curr) => {
      const symbology = symbologies.find(
        symbology => symbology.id === curr.layer.id
      )
      const featurePropertyValue = curr.properties[symbology.property]
      const range = symbology.symbologyItems.find(
        i => i.min <= featurePropertyValue && i.max > featurePropertyValue
      )
      if (!range) {
        return acc
      }
      const rangeItem = acc.find(i => i.id === range.value)
      rangeItem.value++
      return acc
    }
  }

  const filteredSymbologies = visibleSymbologies.filter(
    symbology => symbology && reducers[symbology.symbologyType]
  )

  const result = filteredSymbologies.map(symbology => {
    const symbologyWidgetItems = symbology.symbologyItems.map(
      ({ color, label: name, value }) => ({
        id: value,
        name,
        color,
        value: 0
      })
    )
    const initialWidgetItems =
      symbology.symbologyType === 'categories'
        ? [...symbologyWidgetItems]
        : symbologyWidgetItems

    const filteredFeatures = features.filter(
      feature => feature.layer.id === symbology.id
    )

    return {
      id: symbology.id,
      items: filteredFeatures.reduce(
        reducers[symbology.symbologyType],
        initialWidgetItems
      )
    }
  })
  return result
}

export function createLayerFilter(filter, layerId, symbologies) {
  const filterBuilder = {
    categories: filter => {
      if (filter === 'others-value') {
        const symbologyValues = symbology.symbologyItems.map(s => s.value)
        return [
          '!',
          [
            'any',
            ['in', ['get', symbology.property], ['literal', symbologyValues]]
          ]
        ]
      }
      if (filter) {
        return [
          'any',
          ...filter.map(f => [
            'any',
            ['==', ['get', symbology.property], ['literal', f]]
          ])
        ]
      } else {
        return ['all']
      }
    },
    ranges: filter => {
      if (filter) {
        const rangeItems = filter.map(f =>
          symbology.symbologyItems.find(i => i.label === f || i.value === f)
        )

        return [
          'any',
          ...rangeItems.map(rangeItem => [
            'all',
            [
              '>=',
              ['to-number', ['get', symbology.property]],
              parseFloat(rangeItem.min)
            ],
            [
              '<',
              ['to-number', ['get', symbology.property]],
              parseFloat(rangeItem.max)
            ]
          ])
        ]
      } else {
        return ['all']
      }
    }
  }
  const symbology = symbologies.find(s => s.id === layerId)
  if (!symbology) return []
  const filterFunction = filterBuilder[symbology.symbologyType]
  if (!filterFunction) return []
  return [{ layerId, filter: filterFunction(filter) }]
}

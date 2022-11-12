export function buildVectorLayerConfig(src, layerConfig = {}) {
  const sourceLayer = src.url.split('/').pop()
  const id = src.id
  const source = {
    type: 'vector',
    tiles: [`${src.url}/{z}/{x}/{y}.pbf`]
  }
  const layer = {
    id,
    type: src.type,
    source: id,
    'source-layer': sourceLayer,
    ...layerConfig
  }
  return { id, source, layer }
}

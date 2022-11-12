/**
 *  build mapbox paint expression for category symbology
 * @param {String} property the layer property to target
 * @param {Array} symbology a symbology array of objects with properties value and color
 * @param {String} defaultColor a fallback color
 * @returns {Array}
 */
export function buildCategoriesPaintExpression(
  property,
  symbology,
  defaultColor
) {
  const matchCases = [
    ...symbology.map(({ value, color }) => [value, color]).flat(),
    defaultColor
  ]
  return ['match', ['get', property], ...matchCases]
}

/**
 *  build mapbox paint expression for ranges symbology
 * @param {String} property the layer property to target
 * @param {Array} symbology a symbology array of objects { label, color }
 * @param {String} defaultColor a fallback color
 * @returns {Array}
 */
export function buildRangesPaintExpression(property, symbology, defaultColor) {
  const interpolateCases = [
    ...symbology.map(({ max, color }) => [color, max]).flat()
  ]
  return [
    'step',
    ['to-number', ['get', property]],
    ...interpolateCases,
    defaultColor
  ]
}

export default {
  ranges: buildRangesPaintExpression,
  categories: buildCategoriesPaintExpression
}

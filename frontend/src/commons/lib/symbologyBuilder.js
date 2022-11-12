import expressionBuilder from './expressionBuilder'
const paintBuilder = {
  fill: expression => ({ 'fill-color': expression }),
  line: expression => ({ 'line-color': expression }),
  circle: expression => ({ 'circle-color': expression })
}

export default function (symbologyParams) {
  const {
    property,
    geometryType,
    symbologyType,
    symbologyItems,
    defaultColor
  } = symbologyParams
  const expression = expressionBuilder[symbologyType](
    property,
    symbologyItems,
    defaultColor
  )
  return paintBuilder[geometryType](expression)
}

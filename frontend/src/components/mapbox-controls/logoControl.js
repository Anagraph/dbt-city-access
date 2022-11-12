class LogoControl {
  onAdd(map) {
    this._map = map
    this._container = document.createElement('span')
    this._container.style = 'margin-bottom: 5px;'
    this._container.className = 'mapboxgl-ctrl'
    this._container.innerHTML = `<a target="_blank" href="http://anagraph.io/">
                                    <img src="anagraph_dark.png" height="20px">
                                </a>`
    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }
}

export default new LogoControl()

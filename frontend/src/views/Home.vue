<template>
  <main>
    <left-panel-layout
      v-model:selected-tab="currentTab"
      :is-left-panel-open="mapLoaded"
      :tabs="tabs"
    >
      <template #left-panel>
        <div v-if="mapLoaded && layersStyledConfig && visibleLayerGroups">
          <div class="left-panel__container">
            <div v-if="currentTab === 'layers'">
              <!-- <h1 class="left-panel__title">{{ $t('home.title') }}</h1>  -->
              <Selector
                :layers-styled-config="layersStyledConfig"
                :visible-layer-groups="visibleLayerGroups"
                @updateVisibleLayerGroups="
                  checkedGroups => (visibleLayerGroups = checkedGroups)
                "
              />
              <Dropdown
                :category-widgets="categoryWidgets"
                :active-category-widget="activeCategoryWidget"
                @update:active-category-widget="
                  selected => (activeCategoryWidget = selected)
                "
              />
              <CategoryWidget
                v-for="categoryWidget in categoryWidgets"
                v-show="categoryWidget.id === activeCategoryWidget"
                :key="categoryWidget.id"
                :ref="setCategoryWidgets"
                :items="categoryWidget.items"
                filter-type="multi-filters"
                @filter="applyFilter"
              />
            </div>
            <div v-else>another tab</div>
          </div>
        </div>
        <div v-else>loading ...</div>
      </template>
      <template #map>
        <Map
          v-if="layersStyledConfig"
          :token="token"
          :config="mapConfig"
          :layers-styled-config="layersStyledConfig"
          :visible-layer-groups="visibleLayerGroups"
          :filter="mapFilter"
          @loaded="mapLoaded = true"
          @update-category-widgets="updateCategoryWidgets"
        />
      </template>
    </left-panel-layout>
    <!-- <panel class="home__right-panel" /> -->
  </main>
</template>

<script>
import LeftPanelLayout from '@anagraph/left-panel-layout'
import Dropdown from '@/components/Dropdown.vue'
import CategoryWidget from '@anagraph/category-widget'
import Map from '@/components/Map'
import Selector from '@/components/Selector'
import _ from 'lodash'
import {
  addLayersSymbologies,
  getCategoryWidgetItems,
  createLayerFilter
} from '@/symbologiesHelper.js'
import { getToken } from '@/commons/auth/firebase-auth'
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
const tabs = [
  { id: 'layers', icon: 'fa-map' },
  { id: 'analysis', icon: 'fa-chart-bar' }
]
async function getJsonData(type) {
  if (!process.env.VUE_APP_DISTANT_DATA) {
    if (type === 'layer-configurations') {
      return (await import('@/layer-configurations')).default
    }
    if (type === 'layer-symbologies') {
      return (await import('@/layer-symbologies')).default
    }
    if (type === 'map-configuration') {
      return (await import('@/map-configuration')).default
    }
  } else {
    return axios
      .get(`${process.env.VUE_APP_LAYERS_API}/configurations/${type}.json`)
      .then(r => r?.data || [])
  }

  // }
}
export default {
  name: 'Home',
  components: {
    LeftPanelLayout,
    Map,
    Selector,
    Dropdown,
    CategoryWidget
  },
  setup() {
    const visibleLayerGroups = ref([])
    const activeCategoryWidget = ref(null)
    const layersStyledConfig = ref(null)
    const layerSymbologies = ref(null)
    const mapConfig = ref(null)
    onMounted(async () => {
      console.log('mounted')
      token.value = await getToken()
      const layersDefaultConfig = await getJsonData('layer-configurations')
      layerSymbologies.value = await getJsonData('layer-symbologies')
      mapConfig.value = await getJsonData('map-configuration')
      layersStyledConfig.value = addLayersSymbologies(
        layersDefaultConfig,
        layerSymbologies.value
      )
      visibleLayerGroups.value = [layersStyledConfig.value[0]]
      activeCategoryWidget.value = layersStyledConfig.value.find(
        layerGroup => layerGroup.id === visibleLayerGroups.value[0].id
      ).layers[0].id
    })

    watch(visibleLayerGroups, () => {
      if (widgetsRef.value) {
        widgetsRef.value.forEach(widget => {
          if (widget?.$refs?.filters) widget.$refs.filters.reset()
        })
      }
    })

    const mapLoaded = ref(false)
    const token = ref(null)
    const visibleLayers = computed(() =>
      visibleLayerGroups.value?.map(group => group.layers).flat()
    )
    const categoryWidgets = ref([])
    const widgetsRef = ref([])
    const mapFilter = ref([])

    const currentTab = ref('layers')

    const setCategoryWidgets = categoryWidget => {
      widgetsRef.value.push(categoryWidget)
    }

    const updateCategoryWidgets = features => {
      if (!visibleLayers.value) return
      const oldWidgetsWithValue = categoryWidgets.value.filter(widget =>
        widget.items.find(item => item.value)
      )
      categoryWidgets.value = getCategoryWidgetItems(
        visibleLayers.value,
        layerSymbologies.value,
        features
      )
      const newWidgetsWithValue = categoryWidgets.value.filter(widget =>
        widget.items.find(item => item.value)
      )

      const newWidgetsWithValueIds = newWidgetsWithValue.map(w => w.id)
      const oldWidgetsWithValueIds = oldWidgetsWithValue.map(w => w.id)

      if (
        categoryWidgets.value.length &&
        !_.isEqual(newWidgetsWithValueIds, oldWidgetsWithValueIds)
      ) {
        activeCategoryWidget.value = categoryWidgets.value.find(widget =>
          widget.items.find(item => item.value)
        ).id
      }
    }

    const applyFilter = filter => {
      mapFilter.value = createLayerFilter(
        Array.isArray(filter) || filter === null ? filter : [filter],
        activeCategoryWidget.value,
        layerSymbologies.value
      )
    }
    return {
      token,
      mapLoaded,
      layersStyledConfig,
      visibleLayerGroups,
      categoryWidgets,
      activeCategoryWidget,
      setCategoryWidgets,
      updateCategoryWidgets,
      applyFilter,
      mapFilter,
      tabs,
      currentTab,
      mapConfig
    }
  }
}
</script>

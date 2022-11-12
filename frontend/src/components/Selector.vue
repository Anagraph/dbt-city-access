<template>
  <div class="selector">
    <div
      v-for="layerGroup in layersStyledConfig"
      :key="layerGroup.id"
      class="selector__item"
    >
      <input
        :id="layerGroup.id"
        v-model="picked"
        class="selector__input"
        type="checkbox"
        :value="layerGroup"
      />
      <label class="selector__label" :for="layerGroup.id">{{
        layerGroup.id
      }}</label>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    layersStyledConfig: {
      type: Array,
      default: () => []
    },
    visibleLayerGroups: {
      type: Array,
      default: () => ['one']
    }
  },
  emits: ['update-visible-layer-groups'],
  setup(props, { emit }) {
    const picked = ref(props.visibleLayerGroups)

    watch(picked, () => {
      emit('update-visible-layer-groups', picked.value)
    })

    return { picked }
  }
}
</script>

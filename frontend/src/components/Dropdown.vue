<template>
  <select
    v-if="options.length > 1"
    class="dropdown"
    :value="activeCategoryWidget"
    @input="$emit('update:activeCategoryWidget', $event.target.value)"
  >
    <option
      v-for="categoryWidget in options"
      :key="categoryWidget.id"
      :value="categoryWidget.id"
    >
      {{ formattedLabel(categoryWidget.id) }}
    </option>
  </select>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    categoryWidgets: {
      type: Array,
      default: () => []
    },
    activeCategoryWidget: {
      type: String,
      default: ''
    }
  },
  emits: ['update:activeCategoryWidget'],
  setup(props) {
    const options = computed(() => {
      const widgetsWithValue = props.categoryWidgets.filter(widget =>
        widget.items.find(item => item.value)
      )
      return widgetsWithValue
    })
    const formattedLabel = id => {
      const lowerCaseLabel = id.split('-').join(' ')
      const capitalizedLabel =
        lowerCaseLabel.charAt(0).toUpperCase() + lowerCaseLabel.slice(1)
      return capitalizedLabel
    }
    return { options, formattedLabel }
  }
}
</script>

<style></style>

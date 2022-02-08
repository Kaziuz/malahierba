<template>
  <l-map
    v-model="zoom"
    v-model:zoom="zoom"
    ref="map"
    :center="[lat, lng]"
    :zoomAnimation="true"
    @ready="mapReady()"
    :options="{
      zoomControl:false,
      attributionControl: false
    }"
  >
    <l-control-zoom></l-control-zoom>
    <l-tile-layer
      url="https://api.mapbox.com/styles/v1/malahierba/cjlbfarsj5d4k2smenuvqzrwo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFsYWhpZXJiYSIsImEiOiJjamxiY2FsM3IxOWlnM3huNm42Zm5qd2t0In0.jlnFRW6UUPvWAxigw9aTPg"
      layer-type="base"
      name="mapBox"
    ></l-tile-layer>
    <l-marker
      v-for="point of informationTransform"
      :key="`marker-${point.id}`"
      :lat-lng="point.location"
      @click="clickMoveMap(point)"
    >
      <l-icon
        :icon-size="[15, 15]"
        :class-name="`w-3.5 h-3.5 marker-${point.id}`"
        :icon-url="require(`@/assets/images/marker.png`)"
      />
      <l-tooltip :id="`tooltip-${point.id}`">
        <p class="text-sm font-bold px-1">
          {{ point.placeDrawer }}
        </p>
        <p class="text-sm font-mono px-1">
          {{ point.artistModal }}
        </p>
      </l-tooltip>
    </l-marker>
  </l-map>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LIcon,
  LControlZoom
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'map-view',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LIcon,
    LControlZoom
  },
  setup (props, context) {
    const store = useStore()
    const zoom = computed({
      get: () => store.state.zoom,
      set: val => val
    })
    const informationTransform = computed(() => store.getters.informationTransform)
    const lat = computed(() => store.state.lat)
    const lng = computed(() => store.state.lng)
    return {
      zoom,
      informationTransform,
      lat,
      lng
    }
  },
  methods: {
    mapReady () {
      this.$store.dispatch('setMap', this.$refs.map)
      const { id } = this.$route.params
      if (id) {
        setTimeout(() => {
          // Show tootlip
          document.querySelector(`.marker-${id}`).click()
          this.setPoint()
        }, 100)
      }
    },
    clickMoveMap ({ id, location }) {
      this.$router.push({ path: `/p/${id}` })
      const coords = [location[0], location[1]]
      setTimeout(() => {
        this.$store.dispatch('moveCamera', coords)
        this.$store.dispatch('openPopup', { id, delay: 1000 })
      }, 500)
      // Show tootlip
      document.querySelector(`.marker-${id}`).click()
    },
    setPoint () {
      const coords = [
        this.information[this.$route.params.id].location[0],
        this.information[this.$route.params.id].location[1]
      ]
      this.$store.dispatch('moveCamera', coords)
    }
  }
}
</script>

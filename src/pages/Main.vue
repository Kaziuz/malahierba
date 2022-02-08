<template>
  <div class="w-full h-screen">
    <Drawer
      :direction="'left'"
      :exist="true"
      ref="drawer"
    >
      <ContentDrawer />
    </Drawer>
    <NavigationMenu :openMenu="openMenu" />
    <Map />
    <Popup />
  </div>
</template>

<script>
import Map from '../components/Map.vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import Drawer from '../components/Drawer.vue'
import ContentDrawer from '../components/ContentDrawer.vue'
import Popup from '../components/Popup.vue'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

export default {
  name: 'main-view',
  components: {
    Map,
    NavigationMenu,
    Drawer,
    ContentDrawer,
    Popup
  },
  setup (props, context) {
    const drawer = ref(null)
    const store = useStore()
    onMounted(() => {
      // Put drawer ref in store
      store.dispatch('setDrawer', drawer.value)
    })
    return { drawer }
  },
  methods: {
    openMenu () {
      if (this.drawer.active) {
        this.drawer.close()
      } else {
        this.drawer.open()
      }
    }
  },
  mounted () {
    this.$store.dispatch('loadInformation')
  }
}
</script>

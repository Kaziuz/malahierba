<template>
  <div
    class="sub__container cursor-pointer"
    v-for="item in informationTransform"
    :key="`disco-${item.name}`"
  >
    <img
      :src="require(`@/assets/images/${item.urlImage}`)"
      :alt="item.artistModal"
      class="block h-auto w-full image-cover"
    />
    <div
      class="container-overlay flex flex-col justify-start font-serif font-light pt-6 pl-3 text-malahierba-violet"
      @click.prevent="closeDrawerRedirect(item)"
    >
      <p>{</p>
      <p class="">
        #{{ parseInt(item.id) + 1 }}
      </p>
      <p>{{ item.placeDrawer }}</p>
      <p>{{ item.artistDrawer }}</p>
      <p>{{ item.location[0] }},{{ item.location[1] }}</p>
      <p>}</p>
      <div
        class="flex justify-end w-full"
        v-if="item.id === 12"
      >
        <p class="font-serif text-xss bg-malahierba-green pl-1 pr-4 relative -bottom-32 lg:-bottom-16 md:-bottom-8 sm:-bottom-20 sm:scale-50">
          documental!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'post-brief-view',
  setup (props) {
    const store = useStore()
    const drawer = computed(() => store.getters.drawer)
    const informationTransform = computed(() => store.getters.informationTransform)
    const map = computed(() => store.state.map)
    return { drawer, map, informationTransform }
  },
  methods: {
    closeDrawerRedirect ({ id, location }) {
      const close = setTimeout(() => this.drawer.close(), 10)
      clearTimeout(close)
      // Generate phantom click for icon drawer change to open icon
      document.querySelector('#navi-toggle').click()
      document.querySelector(`.marker-${id}`).click()
      this.$router.push({ path: `/p/${id}` })
      const coords = [location[0], location[1]]
      setTimeout(() => {
        this.$store.dispatch('moveCamera', coords)
        this.$store.dispatch('openPopup', { id, delay: 1000 })
      }, 500)
    }
  }
}
</script>

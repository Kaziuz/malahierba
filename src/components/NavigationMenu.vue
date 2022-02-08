<template>
  <aside class="navigation">
    <div>
      <input
        @click="openMenu"
        type="checkbox"
        class="navigation__checkbox"
        id="navi-toggle"
        style="{border:1px solid black}"
      >
      <transition name="hamburguerToX">
        <label for="navi-toggle" class="navigation__button">
          <span class="navigation__icon">&nbsp;</span>
        </label>
      </transition>
      <div class="navigation__wrap">
        <router-link
          to="/info"
          class="font-JetBrains font-normal antialiased rotate-90 text-malahierba-violet hover:text-malahierba-green cursor-pointer"
        >
          : info :
        </router-link>
        <span
          class="font-JetBrains font-normal antialiased rotate-90 text-malahierba-violet hover:text-malahierba-green cursor-pointer"
          @click.prevent="setRandomView()"
        >
          Random
        </span>
      </div>
    </div>
    <a href="https://www.instagram.com/malahierba.tropical/" target="_blank">
      <img
        :src="instagram"
        class="navigator__instagram cursor-pointer"
        alt="instagram_icon"
      />
    </a>
  </aside>
</template>

<script>
import instagram from '../assets/instagram.svg'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'navigation-view',
  props: ['openMenu'],
  setup () {
    const store = useStore()
    const drawer = computed(() => store.getters.drawer)
    const information = computed(() => store.state.information)
    const map = computed(() => store.state.map)
    return { instagram, drawer, information, map }
  },
  methods: {
    setRandomView () {
      const information = [...this.information]
      const randomPoints = information.sort(() => Math.random() - 0.5)
      const { id, location } = randomPoints[0]
      this.$router.push({ path: `/p/${id}` })
      this.$store.dispatch('moveCamera', location)
      this.$store.dispatch('openPopup', { id, delay: 800 })
      setTimeout(() => {
        document.querySelector(`.marker-${id}`).click()
      }, 10)
    }
  }
}
</script>

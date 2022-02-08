<template v-if="information.length > -1">
  <div>
    <div
      v-for="item in information"
      :key="`popup-${item.id}`"
      class="popup hidden"
      :class="`popup-${item.id}`"
    >
      <div
        :key="`popup-${item.location}`"
        class="wrap-popup overflow-y-hidden overflow-x-hidden cursor-pointer"
      >
        <div>
          <a
            v-if="item && item.src"
            target="_blank"
            class="collaboration"
            :href="item.upload.src"
          >
            {{ item.upload.hasOwnProperty('title') ? item.upload.title : ''}}
          </a>
        </div>
        <iframe
          v-if="item.urlAudio"
          :id="`iframe-audio-${item.id}`"
          width="91"
          height="60"
          class="iframe-audio"
          :src="item.urlAudio"
          bordercolor="#ffffff"
          frameborder="0"
        ></iframe>
        <iframe
          v-if="item.urlVideo"
          :id="`iframe-video-${item.id}`"
          class="iframe-video"
          :src="item.urlVideo"
          width="640"
          height="360"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
        ></iframe>
        <div class="bg-white d-flex justify-center relative -mt-2">
          <p
            v-if="item && item.upload"
            :class="{
              'hidden': item.upload.hasOwnProperty('title'),
            }"
          >
            :
          </p>
        </div>
        <div class="song pt-4">
          {{ information[item.id].description }}
        </div>
        <img
          v-if="!item.urlVideo"
          class="w-full"
          :src="require(`@/assets/images/${information[item.id].urlImage}`)"
          :alt="information[item.id].placeModal"
        >
        <div class="names">
          <p>{{ information[item.id].placeDrawer }}---</p>
          <p>--{{ information[item.id].artistModal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'popup-view',
  setup () {
    const store = useStore()
    const information = computed(() => store.state.information)
    return { information }
  }
}
</script>

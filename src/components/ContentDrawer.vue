<template>
  <div class="bg-mala bg-no-repeat bg-center w-full fixed h-full cursor-default overflow-x-hidden overflow-scroll bg-malahierba-white">
    <div class="w-full h-full pl-16 pt-2">
      <div
        class="relative mt-6 pb-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-1 text-2xl font-normal sm:text-sm md:text-xss lg:text-sm"
        style="width: 98.3%"
      >
        <PostBriefCard />
      </div>
    </div>
  </div>
</template>

<script>
import PostBriefCard from '../components/PostBriefCard.vue'
export default {
  name: 'content-drawer-view',
  components: {
    PostBriefCard
  }
}
</script>

import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    zoom: 3,
    information: [],
    lat: 6.260,
    lng: -75.6547737121582,
    drawer: {},
    map: {}
  },
  getters: {
    informationTransform: state => {
      const informationCopy = [...state.information]
      return informationCopy.reverse()
    },
    drawer: state => {
      return state.drawer
    }
  },
  mutations: {
    information (state, information) {
      state.information = information
    },
    drawer (state, drawer) {
      state.drawer = drawer
    },
    map (state, map) {
      state.map = map
    }
  },
  actions: {
    async loadInformation ({ commit }) {
      try {
        const res = await axios({
          method: 'get',
          url: 'https://mh.parallelo.ai/api/p',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
          }
        })
        commit('information', res.data)
      } catch (e) {
        console.log('error load data information', e)
      }
    },
    openPopup ({ commit }, { id, delay }) {
      // Close pre open popup
      Array.from(document.querySelectorAll('.popup')).map(
        l => { l.style.display = 'none' }
      )
      setTimeout(() => {
        // Open popup after close drawer
        document.querySelector(`.popup-${id}`).style.display = 'block'
      }, delay)
    },
    moveCamera ({ state }, coords) {
      state.map.leafletObject.setView([coords[0], coords[1]], 12)
    },
    setDrawer ({ commit }, drawer) {
      commit('drawer', drawer)
    },
    setMap ({ commit }, map) {
      commit('map', map)
    }
  },
  modules: {
  }
})

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '../config/service';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    login: false,
    pageTitle: '',
    cartList: [],
    showMore: false,
    showBack: true,
    showModal: false,
    songList: [],
    playIndex: 0,
    audio: {
      songUrl: '',
      imgUrl: '/static/head.png',
      title: '',
      singer: '',
      currentLength: 0,
      songLength: 0
    }
  },
  getters: {
    getLoginStatus: state => state.login,
    pageTitle: state => state.pageTitle,
    cartCount: state => state.cartList.length,
    showMore: state => state.showMore,
    showBack: state => state.showBack,
    showModal: state => state.showModal,
    songList: state => state.songList,
    audio: state => state.audio,
    playIndex: state => state.playIndex
  },
  mutations: {
    updateLoginStatus(state, login) {
      state.login = login;
    },
    setPageTitle(state, title) {
      state.pageTitle = title;
    },
    add2Cart(state, pItem) {
      let cartList = state.cartList || [];
      let i = 0,
        len = cartList.length;
      if (len > 0) {
        for (; i < len; i++) {
          if (cartList[i].code == pItem.code) {
            cartList[i].count += pItem.count;
          } else {
            cartList.push(pItem);
          }
        }
      } else {
        cartList.push(pItem);
      }
      state.cartList = cartList;
    },
    showRight(state, r) {
      state.showMore = r;
    },
    showLeft(state, l) {
      state.showBack = l;
    },
    showModal(state, m) {
      state.showModal = m;
    },
    receiveSongList(state, songList) {
      state.songList = songList
    },
    setPlayIndex(state, playIndex) {
      state.playIndex = playIndex;
    },
    setAudio(state, audio) {
      state.audio = {
        ...(state.audio),
        ...audio
      }
    },
    setAudioTime(state, time) {
      state.audio.currentLength = time;
    },
    setLrc(state, lrc) {
      state.audio = {
        ...(state.audio),
        lrc
      };
    }
  },
  actions: {
    getSongList({
      commit,
      state
    }) {
      axios.get(config.rank)
        .then((response) => {
          var div = document.createElement('div');
          div.innerHTML = response.data;

          var list = div.querySelectorAll('.panel-songslist-item');
          var songList = [];
          for (var i = 0; i < list.length; i++) {
            var song = {};
            song.title = list[i].querySelector('.panel-songs-item-name span').innerText;
            song.hash = list[i].id.substr(6);
            songList.push(song);
          }
          commit('receiveSongList', songList)
        })
    },
    getSong({
      dispatch,
      commit,
      state
    }, hash) {
      axios.get(config.songInfo, {
          params: {
            cmd: 'playInfo',
            hash: hash,
            from: 'mkugou'
          }
        })
        .then(res => {
          var result = res.data;
          var songUrl = result.url,
            imgUrl = result.imgUrl.split('{size}').join('100'),
            title = result.songName,
            singer = result.choricSinger.split(/[，、]/).join('|'),
            songLength = result.timeLength,
            currentLength = 0,
            audio = {
              songUrl,
              imgUrl,
              title,
              singer,
              songLength,
              currentLength
            };
          dispatch('getLrc', {
            hash,
            songLength: songLength * 1000
          });
          commit('setAudio', audio)

        })
    },
    getLrc({
      commit,
      state
    }, payload) {
      axios.get('http://m.kugou.com/app/i/krc.php', {
          params: {
            cmd: 100,
            hash: payload.hash,
            timelength: payload.songLength
          }
        })
        .then(res => {
          commit('setLrc', res.data)
        })
    },
    next({
      dispatch,
      state
    }) {
      var list = state.songList;
      if (state.playIndex == list.length - 1)
        state.playIndex = 0
      else
        ++state.playIndex
      let hash = list[state.playIndex].hash;

      dispatch('getSong', hash);
      // dispatch('getLrc', hash);
    },
    prev({
      dispatch,
      state
    }) {
      var list = state.songList;
      if (state.playIndex == 0)
        state.playIndex = list.length - 1;
      else
        --state.playIndex;
      let hash = list[state.playIndex].hash;

      dispatch('getSong', hash);
      // dispatch('getLrc', hash);
    },
    random({
      dispatch,
      state
    }, index) {
      let h = state.songList[index].hash;
      state.playIndex = index;
      dispatch('getSong', h);
      // dispatch('getLrc', h);
    }
  }
});
store.registerModule('ajaxLoading', {
  state: {
    isLoading: false,
    text: ''
  },
  mutations: {
    updateLoading(state, payload) {
      state.isLoading = payload.isLoading;
      state.text = payload.text;
    }
  }
})
export default store;

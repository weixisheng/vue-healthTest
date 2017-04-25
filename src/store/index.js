import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        pageTitle: '',
        cartCount: 0,
        showMore: false,
        showBack: true,
        showModal: false,
        songList: [],
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
        pageTitle: state => state.pageTitle,
        cartCount: state => state.cartCount,
        showMore: state => state.showMore,
        showBack: state => state.showBack,
        showModal: state => state.showModal,
        songList: state => state.songList,
        audio: state => state.audio
    },
    mutations: {
        setPageTitle(state, title) {
            state.pageTitle = title;
        },
        setCartCount(state, cartCount) {
            state.cartCount = cartCount;
        },
        addCartCount(state) {
            state.cartCount++;
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
        setAudio(state, audio) {
            state.audio = {...(state.audio),
                ...audio
            }
        },
        setAudioTime(state, time) {
            state.audio.currentLength = time;
        }
    },
    actions: {
        getSongList({
            commit,
            state
        }) {
            axios.get('http://m.kugou.com/rank/info/8888')
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
            commit,
            state
        }, hash) {
            axios.get('http://m.kugou.com/app/i/getSongInfo.php', {
                params: {
                    cmd: 'playInfo',
                    hash: hash,
                    from: 'mkugou'
                }
            }).then(res => {
                var result = res.data;
                var songUrl = result.url,
                    imgUrl = result.imgUrl.split('{size}').join('100'),
                    title = result.songName,
                    singer = result.singerName,
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
                commit('setAudio', audio)
            })
        }
    }
});
store.registerModule('ajaxLoading', {
    state: {
        isLoading: false
    },
    mutations: {
        updateLoading(state, payload) {
            state.isLoading = payload.isLoading;
        }
    }
})
export default store;
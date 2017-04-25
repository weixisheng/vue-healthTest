<template>
    <div class="song-list">
        <simple-cell v-for="(item,index) in songList"
                     :data-hash="item.hash"
                     @click.native="playSong">
            <span slot="icon"
                  :class="[index<3?`index-${index+1}`:'']">{{index+1}}</span>
            <label slot="label">{{item.title}}</label>
            <span class="play-status fa fa-music m-blue hidden"
                  slot="second"></span>
        </simple-cell>
        <audio :src="audio.songUrl"
               autoplay  @timeupdate="change" @ended="endHandle" id="audio-play"></audio>
        <div class="audio-panel" v-if="audio.songUrl">
            <img :src='audio.imgUrl'>
            <div class="audio-status">
                <span>{{audio.singer}}</span><span>{{audio.title}}</span>
            </div>
            <div class="audio-controls">
                <p class="audio-time"><span>{{formatTime(audio.currentLength)}}</span>/<span>{{formatTime(audio.songLength)}}</span></p>
                <p class='audio-progress'>
                    <span class="progress-ball"></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SimpleCell from '../components/simpleCell'
export default {
    name: 'music',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters(['songList','audio'])
        
    },
    components: {
        SimpleCell
    },
    created() {
        if (window.sessionStorage.getItem('username') !== 'admin') {
            this.$router.push({ name: 'index' })
            return
        }
        this.$store.commit('setPageTitle', '音乐')
        this.$store.commit('showLeft', false)
        this.$store.commit('showRight', false)
        this.$store.dispatch('getSongList')

    },
    methods: {
        formatTime(t){
            let ft = Math.floor(t);
            let m = (Math.floor(ft/60)).toString().replace(/^(\d)$/,'0$1');
            let s = (ft % 60).toString().replace(/^(\d)$/,'0$1');
            return `${m}:${s}`;
        },
        playSong(event) {
            var vm = this, target = event.currentTarget;
            var hash = target.dataset['hash'];
            window.sessionStorage.setItem('hash',hash);
            this.$store.dispatch('getSong',hash);
            $(target).find('.play-status').removeClass('hidden').addClass('rotating');
            $(target).siblings().find('.play-status').addClass('hidden').removeClass('rotating');
        },
        change(){
            var audioPlay = document.querySelector("#audio-play");
            var time = audioPlay.currentTime;
            this.$store.commit('setAudioTime',time);
            var progressBall = document.querySelector('.progress-ball');
            var w =~~window.getComputedStyle(document.querySelector('.audio-progress')).width.replace('px','');
            var left = time/(this.audio.songLength)*w;
            progressBall.style.transform=`translateX(${left}px)`;
        },
        endHandle(){
            var h = window.sessionStorage.getItem('hash');
            $(`[data-hash=${h}]`).find('.play-status').removeClass('rotating').addClass('hidden')
        }
    },
    beforeRouteLeave: function (to, from, next) {
        // this.$store.commit
        next()
    }
}
</script>
<style lang="less">
.song-list{
    padding-bottom: 70px;
}
.index-1,
.index-2,
.index-3 {
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    line-height: 1;
    font-size: 16px;
}

.index-1 {
    background: #e4bb91;
}

.index-2 {
    background: #2146d4;
}

.index-3 {
    background: #e00bbb;
}

.m-blue {
    color: #2ca2f9;
}

.rotating {
    animation: rotate 0.5s infinite linear
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
.audio-panel{
    position: fixed;
    width: 100%;
    bottom: 44px;
    border-top:1px solid #ccc;
    background:rgba(44, 162, 249,1);
    color:#fff;
    z-index:1000;
    img{
        float:left;
        width:3rem;
        height:3rem;
    }
    .audio-status{
        float: left;
        width:75%;
        margin-left: 1rem;
        font-size: 16px;
        span{
            first-child{
                margin-right:5px;
            }
        }
    }
    .audio-controls{
        float:left;
        width:75%;
        margin-left:1rem;
        margin-top:10px;
        font-size:12px;
        p{
            display:inline-block;
        }
        .audio-time{
            width:28%;
        }
        .audio-progress{
            position:relative;
            width:70%;
            background:#fff;
            height:2px;
            vertical-align:middle;
            .progress-ball{
                position:absolute;
                left:0;
                top: -8px;
                width: 15px;
                height: 15px;
                border-radius:50%;
                background:#fff;
                transition:all 0.5s;
            }
        }
    }
}
</style>
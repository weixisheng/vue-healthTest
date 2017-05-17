<template>
    <div>
        <!--songList-->
        <div class="song-list">
            <simple-cell v-for="(item,index) in songList" :data-hash="item.hash" :key='index' :data-index='index' @click.native="playSong">
                <span slot="icon" :class="[index<3?`index-${index+1}`:'']">{{index+1}}</span>
                <label slot="label">{{item.title}}</label>
                <span class="play-status fa fa-music m-blue hidden" slot="second"></span>
            </simple-cell>
            <audio :src="audio.songUrl" autoplay @timeupdate="change" @ended="endHandle" id="audio-play"></audio>
            <div class="audio-panel" v-if="audio.songUrl">
                <img :src='audio.imgUrl' @click="togglePlayer">
                <div class="audio-status">
                    <p>{{audio.singer}}</p>
                    <p class="v-fz-14">{{audio.title}}</p>
                </div>
                <div class="audio-play">
                <span class="fa fa-pause" @click="togglePlay()"></span>
                </div>
            </div>
        </div>

        <!--player-->
        <div class="audio-bg" :style="{'background-image': 'url('+audio.imgUrl.replace(/\/100\//,'/400/')+')'}"></div>
        <div class="audio-player">
            <div class="audio-collapse" @click="togglePlayer">
                <span class='fa fa-angle-double-down'></span>
            </div>
            <div class="audio-info">
                <p class="audio-title">{{audio.title}}</p>
                <p class="audio-singer v-fz-16">
                    <span class='line'>-</span>
                    <span>{{audio.singer}}</span>
                    <span class="line">-</span>
                </p>
            </div>
            <div class="audio-head">
                <img :src="audio.imgUrl.replace(/\/100\//,'/400/')" class="rotating">
            </div>
            <div class="audio-lrc">
                <div class="lrc-content" :style="{'margin-top':`${lrcOffset}px`}">
                    <p v-for="(item,index) in songLrc" :class="{'isCurrentLrc':item.seconds>=audio.currentLength,'disCurrentLrc':item.seconds<audio.currentLength}">
                        {{item.lrcContent}}
                    </p>
                </div>
            </div>
            <div class="audio-controls">
                <span>{{formatTime(audio.currentLength)}}</span>
                <p class='audio-progress'>
                    <span class="progress-ball"></span>
                </p>
                <span>{{formatTime(audio.songLength)}}</span>
                <div class="play-control">
                    <span class="random-btn" @click="random()"></span>
                    <span class="prev-btn" @click="prev()"></span>
                    <span class="play-btn" @click="togglePlay()"></span>
                    <span class="next-btn" @click="next()"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SimpleCell from 'components/simpleCell'
// import throttle from 'lodash/throttle'
export default {
    name: 'music',
    data() {
        return {
            lrcing: false,
            playing: true,
            page:1
        }
    },
    computed: {
        ...mapGetters(['songList', 'audio']),
        songLrc() {
            if (this.audio.lrc) {
                var temp = this.audio.lrc.split('\r\n');
                temp = temp.splice(0, temp.length - 1);
                temp = temp.map((value) => {
                    var time = value.substr(1, 5);
                    var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]) + 1;
                    var lrcContent = value.substr(10);
                    return {
                        seconds,
                        lrcContent
                    }
                })
                return temp;
            }
        },
        lrcOffset() {
            if (this.songLrc) {
                var offset = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length - 2) * (-20);
                //动态改变高度
                return this.audio.currentLength + offset - this.audio.currentLength;
            }
        }

    },
    components: {
        SimpleCell
    },
    created() {
        this.$store.commit('setPageTitle', '音乐')
        this.$store.commit('showLeft', false)
        this.$store.commit('showRight', false)
        this.$store.dispatch('getSongList')
    },
    mounted(){
        let musicWrap = document.querySelector('.main');
        const vm = this;
        // musicWrap.onscroll = throttle(function(){
        musicWrap.onscroll = function(){
        var hadLoad = false;
        let mHeight = musicWrap.offsetHeight,
            lHeight = document.querySelector('.song-list').offsetHeight,
            mscrollTop = musicWrap.scrollTop;
            if((mHeight+mscrollTop>=lHeight)&&!hadLoad&&vm.page<10){
                // load more here
                // vm.$store.commit('updateLoading',{isLoading:true});
                vm.axios.get("/kugouAPI/rank/info",{
                    params:{
                        rankid:8888,
                        page:++vm.page,
                        json:true
                    }
                })
                .then(function(res){
                // vm.$store.commit('updateLoading',{isLoading:false});                    
                    var r = res.data.songs.list;
                    hadLoad = true;
                    let result = [];
                    r.map(function(item){
                        var s = {};
                        s.title = item.filename;
                        s.hash = item.hash;
                        result.push(s);
                    });
                    let v1 = vm.songList.concat(result);
                    vm.$store.commit('receiveSongList',v1);
                })
                .catch(function(){
                    vm.page--;
                })
            }
        }
    },
    methods: {
        formatTime(t) {
            let ft = Math.floor(t);
            let m = (Math.floor(ft / 60)).toString().replace(/^(\d)$/, '0$1');
            let s = (ft % 60).toString().replace(/^(\d)$/, '0$1');
            return `${m}:${s}`;
        },
        togglePlayer() {
            if (!this.lrcing) {
                $('.audio-player,.audio-bg').css({ 'transform': 'translateY(0)' })
                this.lrcing = true;
            }
            else {
                $('.audio-player,.audio-bg').css({ 'transform': 'translateY(100%)' })
                this.lrcing = false;
            }
        },
        playSong(event) {
            var target = event.currentTarget;
            var hash = target.dataset['hash'];
            var playIndex = ~~target.dataset['index'];
            this.$store.commit('setPlayIndex', playIndex);
            this.$store.dispatch('getSong', hash);
            this.$store.dispatch('getLrc', hash);
            this.playStatus();
        },
        playStatus() {
            var index = this.$store.state.playIndex;
            $(`.my-cell[data-index='${index}']`).find('.play-status').removeClass('hidden');
            $(`.my-cell[data-index='${index}']`).siblings().find('.play-status').addClass('hidden');
        },
        change() {
            var audioPlay = document.querySelector("#audio-play");
            var time = audioPlay.currentTime;
            this.$store.commit('setAudioTime', time);
            var progressBall = document.querySelector('.progress-ball');
            var w = ~~window.getComputedStyle(document.querySelector('.audio-progress')).width.replace('px', '');
            var left = time / (this.audio.songLength) * w;
            progressBall.style.transform = `translateX(${left}px)`;
        },
        endHandle() {
            this.next();
        },
        togglePlay() {
            if (!this.playing) {
                document.getElementById("audio-play").play();
                $('.play-btn').removeClass('playing');
                $(".audio-play").find('span').removeClass('fa-play').addClass('fa-pause');
                this.playing = true;
            }
            else {
                document.getElementById("audio-play").pause();
                $('.play-btn').addClass('playing');
                $(".audio-play").find('span').removeClass('fa-pause').addClass('fa-play');                
                this.playing = false;
            }
        },
        next() {
            this.$store.dispatch('next');
            this.playStatus();
        },
        prev() {
            this.$store.dispatch('prev');
            this.playStatus();
        },
        random(){
            const songLength = this.songList.length;
            let r = Math.floor(Math.random()*songLength);
            this.$store.dispatch('random',r);
            this.playStatus();            
        }
    },
    beforeRouteLeave: function (to, from, next) {
        // this.$store.commit
        next()
    }
}
</script>
<style lang="less">
.song-list {
    padding-bottom: 50px;
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
    animation: rotate 20s infinite linear
}

@keyframes rotate {
    100% {
        transform: rotate(1turn);
    }
}

.audio-panel {
    position: fixed;
    width: 100%;
    bottom: 50px;
    border-top: 1px solid #ccc;
    background: rgba(44, 162, 249, 1);
    color: #fff;
    z-index: 100;
    img {
        float: left;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
    }
    .audio-status {
        float: left;
        width: 70%;
        margin-left: 1rem;
        font-size: 16px;
        span {
            &:first-child {
                margin-right: 5px;
            }
        }
    }
    .audio-play{
        float: left;
        width:10%;
        line-height: 2.5rem;
    }
}

.audio-bg {
    background-color: #000;
    position: fixed;
    left: 0;
    right: 0;
    height: 100%;
    top: 0;
    z-index: 501;
    filter: blur(5px);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: translateY(100%);
}

.audio-player {
    transform: translateY(100%);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 2rem;
    background: rgba(0, 0, 0, .8);
    color: #fff;
    z-index: 502;
    transition: transform 0.5s;
    .audio-collapse {
        position: absolute;
        width: 2rem;
        text-align: center;
    }
}

.audio-info {
    text-align: center;
    .line {
        display: inline-block;
        transform: scaleX(3);
    }
    span:nth-child(2) {
        margin: 0 10px;
    }
}

.audio-head {
    margin: 2rem auto;
    width: 13rem;
    height: 13rem;
    border: 5px solid #aaa;
    border-radius: 50%;
    img {
        width: 100%;
        border-radius: 50%;
    }
}

.audio-lrc {
    width: 100%;
    height: 60px;
    overflow: hidden;
    margin-bottom: 20px;
    line-height: 20px;
    color: #2fc27b;
    font-size: 14px;
    text-align: center;
    transition: margin-top 0.5s;
    .lrc-content {
        transition: margin-top .5s;
    }
}

.audio-controls {
    text-align: center;
    font-size: 12px;
    p {
        display: inline-block;
    }
    .audio-time {
        width: 28%;
    }
    .audio-progress {
        position: relative;
        width: 57%;
        margin: 0 15px;
        background: #aaa;
        height: 2px;
        vertical-align: middle;
        .progress-ball {
            position: absolute;
            left: 0;
            top: -8px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: #2fc27b;
            transition: transform 0.5s;
            transform: translateZ(0);
        }
    }
    .play-control {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            display: inline-block;
        }
        .random-btn {
            background: url('/static/random.png');
            background-size: contain;
            width: 1.5rem;
            height: 1.5rem;
            margin-left: -1.6rem;
            margin-right: .8rem;
        }
        .prev-btn {
            background: url('/static/pre.png');
            background-size: contain;

            width: 2rem;
            height: 2rem;
        }

        .play-btn {
            background: url('/static/pause.png');
            background-size: contain;
            margin: 0 2rem;
            height: 3rem;
            width: 3rem;
            &.playing {
                background: url('/static/play.png');
                background-size: contain;
            }
        }
        .next-btn {
            background: url('/static/next.png');
            background-size: contain;

            height: 2rem;
            width: 2rem;
        }
    }
}
</style>

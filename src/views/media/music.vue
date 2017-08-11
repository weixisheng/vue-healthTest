<template>
    <div id='music-wrap'>
        <!--songList-->
        <div class="song-list">
            <simple-cell v-for="(item,index) in songList" :data-hash="item.hash" :key='index' :data-index='index' @click.native="playSong">
                <span slot="icon" :class="[index<3?`index-${index+1}`:'']">{{index+1}}</span>
                <label slot="label">{{item.title}}</label>
                <span class="play-status fa fa-music m-blue" slot="second" v-if="index==playIndex"></span>
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
                    <div class="aduio-header">
                        <div class="audio-collapse text-center" @click="togglePlayer">
                            <span class='fa fa-angle-double-down'></span>
                        </div>
                        <div class="audio-info text-center">
                            <p class="audio-title">{{audio.title}}</p>
                            <p class="audio-singer v-fz-16">
                                <span class='line'>-</span>
                                <span>{{audio.singer}}</span>
                                <span class="line">-</span>
                            </p>
                        </div>
                    </div>
                    <div class="audio-body">
                        <div class="audio-head">
                            <img :src="audio.imgUrl.replace(/\/100\//,'/400/')" class="rotating">
                        </div>
                        <div class="audio-lrc">
                            <div class="lrc-content" :style="{'margin-top':`${lrcOffset}px`}">
                                <p v-for="(item,index) in songLrc" :class="{'isCurrentLrc':item.seconds>=audio.currentLength,'disCurrentLrc':item.seconds<audio.currentLength}" :key="index">
                                    {{item.lrcContent}}
                                </p>
                            </div>
                        </div>
    
                    </div>
                    <div class="audio-controls">
                        <span>{{formatTime(audio.currentLength)}}</span>
                        <p class='audio-progress'>
                            <span class="progress-ball"></span>
                        </p>
                        <span>{{formatTime(audio.songLength)}}</span>
                        <div class="play-control flex just-center align-center">
                            <span class="random-btn" @click="random()"></span>
                            <span class="prev-btn" @click="prev()"></span>
                            <span class="play-btn" @click="togglePlay()"></span>
                            <span class="next-btn" @click="next()"></span>
                        </div>
                    </div>
                    <div class="audio-footer">
                        <canvas id="canvas"></canvas>
                    </div>
                </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SimpleCell from 'components/simpleCell'

export default {
    name: 'music',
    data() {
        return {
            lrcing: false,
            playing: true,
            page: 1
        }
    },
    components: {
        SimpleCell
    },
    computed: {
        ...mapState(['playIndex']),
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
    created() {
        this.$store.commit('setPageTitle', '音乐')
        this.$store.commit('showLeft', false)
        this.$store.commit('showRight', false)
        this.$store.dispatch('getSongList')
    },
    mounted() {
        let musicWrap = document.querySelector('#music-wrap');
        const vm = this;
        // musicWrap.onscroll = throttle(function(){
        musicWrap.onscroll = function () {
            var hadLoad = false;
            let mHeight = musicWrap.offsetHeight,
                lHeight = document.querySelector('.song-list').offsetHeight,
                mscrollTop = musicWrap.scrollTop;
            if ((mHeight + mscrollTop >= lHeight) && !hadLoad && vm.page < 10) {
                // load more here
                // vm.$store.commit('updateLoading',{isLoading:true});
                vm.axios.get("/kugouAPI/rank/info", {
                    params: {
                        rankid: 8888,
                        page: ++vm.page,
                        json: true
                    }
                })
                    .then(function (res) {
                        // vm.$store.commit('updateLoading',{isLoading:false});                    
                        var r = res.data.songs.list;
                        hadLoad = true;
                        let result = [];
                        r.map(function (item) {
                            var s = {};
                            s.title = item.filename;
                            s.hash = item.hash;
                            result.push(s);
                        });
                        let v1 = vm.songList.concat(result);
                        // vm.songList = [...vm.songList,...result];
                        vm.$store.commit('receiveSongList', v1);
                    })
                    .catch(function () {
                        vm.page--;
                    })
            }
        }
        this.draw();
    },
    methods: {
        formatTime(t) {
            let ft = Math.floor(t);
            let m = (Math.floor(ft / 60)).toString().replace(/^(\d)$/, '0$1');
            let s = (ft % 60).toString().replace(/^(\d)$/, '0$1');
            return `${m}:${s}`;
        },
        togglePlayer() {
            let audioPlay = document.querySelector('.audio-player'),
            audioBg = document.querySelector('.audio-bg');
            const tSF = 'transform' in document.createElement('div').style ? 'transform' : '-webkit-transform';
            if (!this.lrcing) {
                audioPlay.style[tSF]='translateY(0)';
                audioBg.style[tSF]='translateY(0)';
                this.lrcing = true;
            }
            else {
                audioPlay.style[tSF]='translateY(100%)';
                audioBg.style[tSF]='translateY(100%)';
                this.lrcing = false;
            }
        },
        playSong(event) {
            var target = event.currentTarget;
            var hash = target.dataset['hash'];
            var playIndex = ~~target.dataset['index'];
            this.$store.commit('setPlayIndex', playIndex);
            this.$store.dispatch('getSong', hash);

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
            let playBtn = document.querySelector('.play-btn'),
                audioPlay = document.querySelector('.audio-play');
            if (!this.playing) {
                document.getElementById("audio-play").play();
                playBtn.classList.remove('playing');
                audioPlay.querySelector('span').classList.remove('fa-play');
                audioPlay.querySelector('span').classList.add('fa-pause');
                this.playing = true;
            }
            else {
                document.getElementById("audio-play").pause();
                playBtn.classList.add('playing');
                audioPlay.querySelector('span').classList.remove('fa-pause');
                audioPlay.querySelector('span').classList.add('fa-play');
                this.playing = false;
            }
        },
        next() {
            this.$store.dispatch('next');
        },
        prev() {
            this.$store.dispatch('prev');
        },
        random() {
            const songLength = this.songList.length;
            let r = Math.floor(Math.random() * songLength);
            this.$store.dispatch('random', r);
        },
        draw() {
            var audio = document.getElementById('audio-play');
            var canvas = document.getElementById('canvas');
            //创建境况
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            var audioContext = new AudioContext();
            //创建输入源
            var audioSrc = audioContext.createMediaElementSource(audio);
            //用createAnalyser方法,获取音频时间和频率数据,实现数据可视化。
            var analyser = audioContext.createAnalyser();
            //连接：source → analyser → destination
            audioSrc.connect(analyser);
            //声音连接到扬声器
            analyser.connect(audioContext.destination);
            /*存储频谱数据，Uint8Array数组创建的时候必须制定长度，
            长度就从analyser.frequencyBinCount里面获取，长度是1024*/
            var capHeight = 2,
                cwidth = canvas.width,
                cheight = canvas.height - capHeight,
                capStyle = '#00FFD5',//帽子颜色
                meterNum = 200, //多少个能量柱
                meterWidth = Math.floor(cwidth / meterNum * 0.9), //能量柱的宽度
                verSpace = Math.max(cwidth / meterNum * 0.1, 2),//能量柱间隔
                capYPositionArray = [], //能量柱的帽子
                canvasContext = canvas.getContext('2d'),
                rectHeight = 0,//能量柱高度
                array = new Uint8Array(analyser.frequencyBinCount);
            audio.renderFrame = function () {
                //自适应
                cwidth = canvas.width;
                cheight = canvas.height - capHeight;
                meterWidth = Math.floor(cwidth / meterNum * 0.9);//能量柱的宽度
                verSpace = Math.max(cwidth / meterNum * 0.1, 2);//能量柱间隔
                //获取音频数据
                analyser.getByteFrequencyData(array);
                //取完整的长度，后面一部分低音就没有能量柱了，所以取音频的百分之68，68是我测试出来的，差不多正好可以全部有
                var step = Math.round(array.length * 0.68 / meterNum);
                canvasContext.clearRect(0, 0, cwidth, cheight);
                for (var i = 0; i < meterNum; i++) {
                    var value = array[i * step + step];//一个计算能量柱高度的公式第二步
                    if (capYPositionArray.length < Math.round(meterNum)) {
                        capYPositionArray.push(value);//往帽子数组里面添加值，长度不能大于能量柱的个数
                    };
                    //设置画笔颜色，画能量柱帽子
                    canvasContext.fillStyle = "hsl( " + Math.round((i * 300) / meterNum) + ", 100%, 50%)";
                    rectHeight = Math.max(cheight - value * 2, capHeight);
                    //能量柱过渡效果
                    if (value < capYPositionArray[i]) {
                        //如果这次的高度比上次小，能量柱帽子递减往下落
                        canvasContext.fillRect(i * (meterWidth + verSpace), cheight - (--capYPositionArray[i]) * 2, meterWidth, capHeight);
                    } else {
                        //正常画能量柱帽子
                        canvasContext.fillRect(i * (meterWidth + verSpace), rectHeight, meterWidth, capHeight);
                        capYPositionArray[i] = value;
                    };
                    //设置画笔颜色，开始画能量柱
                    /*设置画笔颜色，hsl通过这个公式出来的是很漂亮的彩虹色
		            H：Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
		            S：Saturation(饱和度)。取值为：0.0% - 100.0%
		            L：Lightness(亮度)。取值为：0.0% - 100.0%
		            */
                    canvasContext.fillStyle = "hsl( " + Math.round((i * 360) / meterNum) + ", 100%, 50%)";
                    canvasContext.fillRect(i * (meterWidth + verSpace), rectHeight + capHeight * 3, meterWidth, value * 2);
                }
                return requestAnimationFrame(audio.renderFrame);
            }
            audio.renderFrame();//开始动画
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
    .audio-play {
        float: left;
        width: 10%;
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
    transform: translateY(100%);
    z-index: 501;
    filter: blur(5px);
    background-repeat: no-repeat;
    background-position: 50%;
}

.audio-player {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateY(100%);
    transition: transform .3s;
    padding-top: 2rem;
    background: rgba(0, 0, 0, .8);
    color: #fff;
    z-index: 502;
    .audio-collapse {
        position: absolute;
        width: 2rem;
    }
}

.audio-info {
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
        border-radius: 50%;
    }
}

.audio-lrc {
    width: 100%;
    height: 60px;
    overflow: hidden;

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
    margin-top: 20px;
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

.audio-body {
    position: relative;
}

#canvas {
    width: 100%;
}
</style>

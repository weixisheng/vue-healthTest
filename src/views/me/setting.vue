<template>
    <div class="v-bg-lightgray stretch">
        <group title="通讯录">
            <simple-cell :padding='0'>
                <x-switch slot="label"
                          title="加我为好友时需要验证"
                          v-model='yanzheng'></x-switch>
            </simple-cell>
            <simple-cell :padding='0'
                         style="padding-bottom:5px;">
                <x-switch slot="label"
                          title="向我推荐通讯录好友"
                          v-model="tuijian"></x-switch>
                <small slot="more">开启后为你推荐已开通微信的手机联系人</small>
            </simple-cell>
            <simple-cell>
                <label slot="label">添加我的方式</label>
            </simple-cell>
            <simple-cell>
                <label slot="label">通讯录黑名单</label>
            </simple-cell>
        </group>
        <group title="朋友圈">
            <simple-cell>
                <label slot="label">不让他/她看我的朋友圈</label>
            </simple-cell>
            <simple-cell>
                <label slot="label">不看他/她的朋友圈</label>
            </simple-cell>
            <simple-cell :padding='0'>
                <x-switch slot="label"
                          title="允许陌生人查看十张照片"
                          v-model='chakan'></x-switch>
            </simple-cell>
            <simple-cell>
                <label slot="label">允许朋友查看朋友圈的范围</label>
                <span slot="second">半年内</span>
            </simple-cell>
            <simple-cell :padding='0'
                         style="padding-bottom:5px;">
                <x-switch slot="label"
                          title="开启朋友圈入口"
                          v-model="rukou"></x-switch>
                <small slot="more">关闭后，隐藏将“发现”中的朋友圈入口，你发过的朋友圈不会清空，朋友仍可以看到</small>
            </simple-cell>
            <simple-cell :padding='0'
                         style="padding-bottom:5px;">
                <x-switch slot="label"
                          title="朋友圈更新"
                          v-model="gengxin"></x-switch>
                <small slot="more">关闭后，有朋友圈更新照片时，界面下方的“发现”切换按钮不再出现红点提示。</small>
            </simple-cell>
        </group>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Group, XSwitch } from 'vux'
import SimpleCell from '../../components/simpleCell'
export default {
    name: 'setting',
    data() {
        return {
            yanzheng: true,
            tuijian: false,
            chakan: false,
            rukou: true,
            gengxin: true
        }
    },
    computed: {
        ...mapMutations(['showLeft', 'setPageTitle'])
    },
    components: { Group, SimpleCell, XSwitch },
    created() {
        this.$store.commit('showLeft', true)
        this.$store.commit('setPageTitle', '设置')
    }

}
</script>
<style lang="less" scoped>
small {
    color: #aaa;
    margin-bottom: 5px;
}
</style>
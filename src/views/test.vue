<template>
  <div>
    <group>
<datetime v-model="date" placeholder="please choose" title='date'></datetime>
    </group>
  </div>
</template>
<script>
import {Group,Datetime} from 'vux'
export default {
  name: '',
  data() {
    return {
date:''
    }
  },
  components: {Group,Datetime  },
  computed: {

  },
}
</script>

<template>
    <div class="_group_box">
         <Divider orientation="left">{{title}}</Divider>
         <slot/>
    </div>
</template>
<script>
export default {
    props:{
        title:String
    }
}
</script>
<style scoped>
._group_box{

}
</style>
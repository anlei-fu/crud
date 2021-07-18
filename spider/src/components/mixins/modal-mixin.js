export default {
    props: {
        title: String,
        maxHeight:String,
        width:String,
    },
    data(){
         
    },
    
    methods:{
        show(){
            this.$ref.modal.show();
        }
    }
   
}
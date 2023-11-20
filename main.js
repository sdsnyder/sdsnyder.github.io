const app = Vue.createApp({
    data: function(){
        return{
            cart: [],
            premium: false
        }
    },
    methods: {
        addCart(id) {
            this.cart.push(id)
        },
        removeCart(id) {
            this.cart.pop(id)
        }
    }
})
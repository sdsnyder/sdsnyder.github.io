app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    /*html*/
    `
    <div class="product-display">
    <div class="product-container">
        <div class="product-image">
            <img :class="{ 'out-of-stock-img': !inStock }" v-bind:src="image">
            <!--<img :src="image">-->
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <a :href="url" target="_blank">Current Price Trend</a>

            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost Gone!</p>
            <p v-else>Out of Stock</p>

            <p>Shipping: {{ Shipping }}</p>
            <product-details :details="details"></product-details>


            <!-- DISPLAY  CONDITION OF CARD
                <ul>
                <li v-for="(condition, index) in conditions" :key="index">{{ condition }}</li>
            </ul>
            -->
            <div v-for="(variant, index) in variants" 
                :key="variant.id" 
                @mouseover="updateVariant(index)"
                class="color-circle"
                :style="{backgroundImage: variant.symbol }">
                <!--{{variant.set}}-->
            </div> <!--display printings-->
            
            <!-- BUTTONS-->
            <button class="button" 
            :class="{ disabledButton: !inStock}"
            :disabled="!inStock"
            @click="addToCart">Add to Cart</button>
            <button class="button" @click="removeFromCart">Remove Item</button>

            <p v-if="onSale">{{ cardSelection }} is on sale!</p>
        </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
</div>
`,
data: function(){
    return{
        product: 'Mana Crypt',
        brand: 'Magic: The Gathering',
        description: '2 versions of Mana Crypt are currently for sale, the Double Masters showcase edition and the Khaledesh Masterpiece.',
        //image: './assets/images/mana crypt 2XM.png',
        selectedVariant: 0,
        url: 'https://www.mtgstocks.com/prints/30938-mana-crypt',
        inventory: 100,
        //onSale: false,
        //inStock: true,
        details: ['Foil', 'English Printing'],
        variants: [
            {id: 361, set: '2XM', symbol: 'url("./assets/images/2XM.png")', image: './assets/images/mana crypt 2XM.png', quantity: 50, sale: true},
            {id: 16, set: 'MPS', symbol: 'url("./assets/images/MPS.png")', image: './assets/images/mana crypt MPS.png', quantity: 0, sale: false},
        ],
        conditions: ['NM', 'LP', 'MP', 'HP', 'DMG'],
        reviews: []
    }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        /*
        if (this.cart >=1) {
            this.cart -= 1
        */
    },
    updateVariant(index){
        this.selectedVariant = index
        //console.log(index)
        //this.image = variantImage
    },
    addReview(review){
        this.reviews.push(review)
    }
},
computed: {
    title() {
        return this.brand + ' ' + this.product
    },
    image() {
        return this.variants[this.selectedVariant].image
    },
    inStock() {
        return this.variants[this.selectedVariant].quantity
    },
    onSale() {
        return this.variants[this.selectedVariant].sale
    },
    cardSelection() {
        return this.brand + ' ' + this.product + ' ' + this.variants[this.selectedVariant].set
    },
    Shipping() {
        if (this.premium) {
            return 'Free'
        }
        return 2.99
    }
}
})
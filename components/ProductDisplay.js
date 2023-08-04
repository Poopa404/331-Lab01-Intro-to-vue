const productDisplay = {
    template:
        /*html*/
    `
    <div class="product-display">
        <div class="product-container">
            <!-- 7.6. -->
            <div class="product-image" :class="{'out-of-stock-img': !inStock}">
                <img :src="image">
            </div>
        </div>
        <div class="product-info">
            <!-- 3.6. -->
            <a :href="link"><h1>{{title}}</h1></a>
            <p>{{description}}</p>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
            <p v-else>Out of Stock</p>
            <!-- 4.9. -->
            <p v-if="onSale">On Sale</p>
            <p>Shipping: {{shipping}}</p>
            <product-details :details="details"></product-details>
            <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}">
            
            </div>
            <button class="button" :disabled="!inStock" @click="addToCart" :class="{disabledButton: !inStock}">Add to Cart</button>
            <!-- 6.7 -->
            <button class="button" @click="toggleInStock">inStock</button>
            <!-- 10.6 -->
            <button class="button" @click="removeFromCart">Remove</button>
            <!-- 5.5 -->
            <div v-for="size in sizes" style="display: inline-block; padding-right: 4px;">{{size}}</div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>
    `,
    props: {
        premium: Boolean
    },
    setup(props, { emit }){
        const shipping = computed(() => {
            if(props.premium){
                return 'Free'
            } else {
                return 30
            }
        })
        const product = ref('Boots')
        const brand = ref('SE 331')
        const inventory = ref(true)
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = ref([
            {id: 2234, color: 'green', image: '/assets/images/socks_green.jpg', quantity: 50},
            {id: 2235, color: 'blue', image: '/assets/images/socks_blue.jpg', quantity: 10},

        ])
        const selectedVariant = ref(0)
        const cart = ref(0)
        function updateVariant(index) {
            selectedVariant.value = index
        }
        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })
        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity  /* 6.7 */ && inStockControl.value
        })
        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }
        const title = computed(() => {
            return brand.value + ' ' + product.value  /* 8.5 */ + (onSale.value == true? ' is on sale': '')
        })
        function updateImage(variantImage){
            image.value = variantImage
        }
        
        const reviews = ref([])
        function addReview(review){
            reviews.value.push(review)
            console.log(reviews.value)
        }

        //2.5.
        const description = ref('This is not a pair of socks. It is a pair of boots.')

        //3.6.
        const link = ref('https://www.camt.cmu.ac.th')

        //4.9
        const onSale = ref(true)

        //5.5
        const sizes = ref([
            'S',
            'M',
            'L'
        ])

        //6.7
        const inStockControl = ref(true);
        function toggleInStock(){
            if(inStockControl.value == true){
                inStockControl.value = false;
            } else {
                inStockControl.value = true;
            }
        }

        //10.6
        function removeFromCart(){
            emit('remove-from-cart', variants.value[selectedVariant.value].id)
        }

        return {
            title,
            image,
            inStock,
            inventory,
            details,
            variants,
            addToCart,
            updateImage,
            updateVariant,
            shipping,
            reviews,
            addReview,
            //2.5.
            description,
            //3.6.
            link,
            //4.9
            onSale,
            //5.5
            sizes,
            //6.7
            inStockControl,
            toggleInStock,
            //10.6
            removeFromCart
        }
    }
}
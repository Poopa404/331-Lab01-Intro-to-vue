const { createApp, ref, computed, toRefs } = Vue;

// createApp({
//     setup(){
//         const product = ref('Socks')
//         const brand = ref('SE 331')
//         const link = "https://www.cmu.ac.th/"
//         const inventory = ref(100)
//         const onSale = ref(true)
//         const details = ref([
//             '50% cotton',
//             '30% wool',
//             '20% polyester'
//         ])
//         const variants = ref([
//             { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
//             { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0}
//         ])
//         selectedVariant = ref(0)
//         function updateVariant(index) {
//             selectedVariant.value = index
//         }
//         const image = computed(() => {
//             return variants.value[selectedVariant.value].image
//         })
//         const inStock = computed(() => {
//             return variants.value[selectedVariant.value].quantity
//         })
//         const size = ref([
//             'S',
//             'M',
//             "L"
//         ])
//         const cart = ref(0)
//         function addToCart() {
//             cart.value += 1
//         }
//         const title = computed(() => {
//             return brand.value + ' ' + product.value + (onSale.value == true? ' is on sale': '')
//         })
//         function updateImage(variantImage){
//             image.value = variantImage
//         }
//         function toggleInStock(){
//             if(inStock.value == true){
//                 inStock.value = false;
//             } else {
//                 inStock.value = true;
//             }
//         }
//         return {
//             title,
//             link,
//             image,
//             inStock,
//             inventory,
//             onSale,
//             details,
//             variants,
//             size,
//             cart,
//             addToCart,
//             updateVariant,
//             toggleInStock
//         }
//     }
// }).mount('#app')

const app = createApp({
    setup(){
        const cart = ref([])
        //9.9
        const premium = ref(false)
        function updateCart(id){
            cart.value.push(id)
        }
        //10.5
        function countCart(inCart){
            const count = {}
            var str = ""
            for(const num of inCart){
                count[num] = count[num] ? count[num] + 1 : 1;
            }
            for(const item in count){
                str += item+": "+count[item]+", "
            }
            return str
        }
        //10.6
        function removeCart(id){
            cart.value.splice(0)
        }

        return{
            cart,
            premium,
            updateCart,
            countCart,
            removeCart
        }
    }
})
app.component('product-display',productDisplay)
app.component('review-form',reviewForm)
app.component('review-list',reviewList)
app.component('product-details',productDetails)
app.mount('#app')

const productDetails = {
    template:
    `<div class="product-details">
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    </div>`
    ,
    props: {
        details: {
            type: Array
        }
    },
    setup(props){
        const details = props.details
        return {
            details
        }
    }
}
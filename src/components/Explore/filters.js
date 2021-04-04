export const getSortedData = ( products, sortBy )=>{
    if(sortBy && sortBy==="LH"){
        return products.sort( ( a, b ) => a.price - b.price  )
    }else if( sortBy && sortBy==="HL" ) {
        return products.sort( ( a, b ) => b.price - a.price  )
    }
    return products
}
export const getFilterByCatagories = (products, showCatagoeries)=>{
    console.log(showCatagoeries)
    if(showCatagoeries.length > 0) 
        return products.filter( (product)=> showCatagoeries.includes(product.category) )
    return products;
}
export const getProductByRating = (products, showRating ) =>{
    console.log(showRating)
    if(showRating !== null)
        return products.filter((product)=> product.rating >= showRating )
    return products;
}
export const getFilterbyAvalibility = (products,showInvertory)=>{
    if(!showInvertory)
        return products.filter( (product) => product.inStock === true )
    return products;
}
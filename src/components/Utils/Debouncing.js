export const useDebouncing = ( someExpensiveFunction, difference ) =>{
    let timer;
    return function (product){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            someExpensiveFunction(product)
        },difference)
    }
}
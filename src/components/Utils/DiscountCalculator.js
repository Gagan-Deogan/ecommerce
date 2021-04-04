export const discountCalculator = (discount, price) =>{
    const discountedPrice = price - discount*price;
    return Math.floor(discountedPrice);
}
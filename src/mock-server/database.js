import faker from "faker";

const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

faker.seed(0);

export const database = [...Array(25)].map((id) => ({
    id: uuidv4(),
    name: faker.commerce.productName(),
    image: faker.random.image(),
    price: faker.commerce.price(),
    category: faker.random.arrayElement(["Plants", "cactus", "folwers","seeds"]),
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    label: faker.random.arrayElement(["", "New", "Trending"]),
    rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
    offer: faker.random.arrayElement(["20", "50", "70"]),
}));
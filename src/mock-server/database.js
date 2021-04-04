import faker from "faker";
import plant from "../assests/plant1.png"
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
    image: faker.random.arrayElement([plant]),
    price: faker.commerce.price(),
    category: faker.random.arrayElement(["Plants", "Cactus", "Folwers","Seeds"]),
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    label: faker.random.arrayElement(["", "New", "Trending"]),
    rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
    discount: faker.random.arrayElement([0 ,0.2, 0.5, 0.7 ]),
}));
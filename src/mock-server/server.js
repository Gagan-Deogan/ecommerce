import { createServer, Model, RestSerializer } from "miragejs";
import { database } from "./database";

export const setupMockServer = () => {
    createServer({
        serializers: {
        application: RestSerializer,
        },
        models: {
        product: Model,
        },

        routes() {
        this.namespace = "api";
        this.timing = 2000;
        this.resource("products");
        },

        seeds(server) {
        database.forEach((product) => {
            server.create("product", {
            ...product,
            });
        });
        },
    });
};
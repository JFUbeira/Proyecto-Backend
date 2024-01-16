import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: [
        {
            _id: false,
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
});

const cartModel = model('Cart', cartSchema);

export { cartModel };

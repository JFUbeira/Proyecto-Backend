import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const mockProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    // Otros campos que puedas necesitar
});

// mockProductSchema.plugin(mongoosePaginate);

const MockProductModel = mongoose.model('MockProduct', mockProductSchema);

export default MockProductModel;
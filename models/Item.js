const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
  },
  itemPrice: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String,
    required: true,
  },
  itemImage: [{
    type: String,
    required: true,
  }],
  // offer: {
  //   type: String,
  // },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  buyLink: {
    type: String,
    required: true,
  },
  customerRating: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
  }
  // buyLinks: [
  //   {
  //     link: {
  //       type: String,
  //       required: true,
  //     },
  //     price: {
  //       type: String,
  //       required: true,
  //     },
  //     platform: {
  //       type: String,
  //       required: true,
  //     }
  //   }
  // ],
});

const Item = mongoose.model('items', ItemSchema);

module.exports = Item;

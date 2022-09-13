const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  subCategoryName: {
    type: String,
    required: true,
  },
});

const SubCategory = mongoose.model('subCategories', SubCategorySchema);

module.exports = SubCategory;

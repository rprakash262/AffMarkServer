const express = require('express');
// const multer = require('multer');
const router = express.Router();

const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Item = require('../models/Item');
const Image = require('../models/Image');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     // rejects storing a file
//     cb(null, false);
//   }
// }

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter,
// });

router.post('/add-new-category', async (req, res) => {
  const { categoryName } = req.body;

  try {
    const alreadyExist = await Category.findOne({ categoryName });

    if (alreadyExist) {
      return res.json({ success: false, result: 'Category with this name already exists' });
    }

    const newCategory = new Category({
      categoryName,
    });

    const response = await newCategory.save();

    const category = {
      id: response._id,
      categoryName: response.categoryName,
    };

    res.json({ success: true, result: category });
  } catch (err) {
    console.log(err);
  }
});

router.post('/add-new-subcategory', async (req, res) => {
  const {  categoryId, subCategoryName } = req.body;

  try {
    const alreadyExist = await SubCategory.findOne({ categoryId, subCategoryName });

    if (alreadyExist) {
      return res.json({
        success: false,
        result: 'Sub-Category with this name already exists in the selected Category',
      });
    }

    const newSubCategory = new SubCategory({
      categoryId,
      subCategoryName,
    });

    const response = await newSubCategory.save();

    const subCategory = {
      id: response._id,
      categoryId: response.categoryId,
      subCategoryName: response.subCategoryName,
    };

    res.json({ success: true, result: subCategory });
  } catch (err) {
    console.log(err);
  }
});

router.get('/get-all-categories', async (req, res) => {
  try {
    const response = await Category.find();

    const categories = response.map(category => ({
      id: category.id,
      categoryName: category.categoryName,
      categoryRouteName: category.categoryRouteName,
    }));

    res.json({ categories });
  } catch (err) {
    console.log(err);
  }
});

router.get('/get-all-subcategories', async (req, res) => {
  try {
    const response = await SubCategory.find();

    const subCategories = response.map(subCategory => ({
      id: subCategory.id,
      categoryId: subCategory.categoryId,
      subCategoryName: subCategory.subCategoryName,
    }));

    res.json({ subCategories });
  } catch (err) {
    console.log(err);
  }
});

router.post('/get-subcategories-by-catId', async (req, res) => {
  const { categoryId } = req.body;

  try {
    const response = await SubCategory.find({ categoryId });

    const subCategories = response.map(subCategory => ({
      id: subCategory.id,
      categoryId: subCategory.categoryId,
      subCategoryName: subCategory.subCategoryName,
    }));

    res.json({ success: true, result: subCategories });
  } catch (err) {
    console.log(err);
  }
})

// router.post('/file-upload', upload.single('imageData'), async (req, res) => {
//   const { imageName } = req.body;

//   try {
//     const newImage = new Image({
//       imageName,
//       imageData: req.file.path,
//     });

//     const response = await newImage.save();

//     const image = {
//       id: response._id,
//       imageName: response.imageName,
//       imageData: response.imageData,
//     };

//     res.status(200).json({success: true, result: image });
//   } catch (err) {
//     console.log(err);
//   }
// })

router.post('/add-new-item', async (req, res) => {
  const { postData } = req.body;

  const {
    categoryId,
    subCategoryId,
    itemName,
    itemDescription,
    itemPrice,
    itemImage,
    offer,
    isFeatured,
    platform,
    customerRating,
    buyLink,
    date,
  } = postData;

  try {
    const newItem = new Item({
      categoryId,
      subCategoryId,
      itemName,
      itemDescription,
      itemPrice,
      // itemImage: itemImage[0],
      itemImage,
      platform,
      customerRating,
      buyLink,
      isFeatured,
      date,
    });

    const response = await newItem.save();

    const item = {
      id: response._id,
      categoryId: response.categoryId,
      subCategoryId: response.subCategoryId,
      itemName: response.itemName,
      itemDescription: response.itemDescription,
      itemPrice: response.itemPrice,
      itemImage: response.itemImage,
      customerRating: response.customerRating,
      buyLink: response.buyLink,
      platform: response.platform,
      isFeatured: response.isFeatured,
      date: response.date,
    }

    res.json({ success: true, result: item });
  } catch (err) {
    res.json({ success: false, result: 'Something went wrong' });
  }
});

router.post('/edit-one-product', async (req, res) => {
  const { id, newItemFormData } = req.body;

  const {
    categoryId,
    subCategoryId,
    itemName,
    itemDescription,
    itemPrice,
    itemImage,
    buyLink,
    customerRating,
    platform,
  } = newItemFormData;

  try {
    const response = await Item.updateOne( { _id: id }, { $set: {
      categoryId,
      subCategoryId,
      itemName,
      itemDescription,
      itemPrice,
      itemImage,
      buyLink,
      customerRating,
      platform,
    }});

    res.json({ success: true, result: response });

  } catch (err) {
    console.log(err);
  }
})

router.post('/delete-one-product', async (req, res) => {
  const { itemId } = req.body;

  try {
    const response = await Item.findOneAndDelete({ _id: itemId });

    res.json({ success: true });
  } catch (err) {
    console.log(err)
  }
})


module.exports = router;
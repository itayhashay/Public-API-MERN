const express = require('express'),
  Category = require('../Models/category'),
  Api = require('../Models/api'),
  Bookmark = require('../Models/bookmark'),
  { isAdmin, isLoggedIn } = require("../Services/middleware"),
  { StatusCodes } = require('http-status-codes'),
  router = express.Router();
  
/**
* @swagger
* /category:
*  get:
*    description: Retrieve all categories
*    responses:
*      '200':
*        description: A successful response
*      '500':
*        description: Internal server error
*
*/
router.get('/', async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(StatusCodes.OK).send({ data: category });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})


/**
* @swagger
* /category/apis/count:
*  get:
*    description: Retrieve the summery of apis
*    responses:
*      '200':
*        description: A successful response
*      '500':
*        description: Internal server error
*
*/
router.get('/apis/count', isAdmin, async (req, res) => {
  try {
    const categories = await Api.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 } // this means that the count will increment by 1
        }
      }
    ]);
    res.status(StatusCodes.OK).send({ data: categories });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

/**
* @swagger
* /category/:id:
*  get:
*    description: Retrieve the summery of apis
*    responses:
*      '200':
*        description: A successful response
*      '500':
*        description: Internal server error
*
*/
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(StatusCodes.OK).send({ data: category });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.post('/', isAdmin, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(StatusCodes.CREATED).send({ data: newCategory });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    await category.save();
    res.send({ data: category });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    const apis = await Api.find({ category: category._id });
    await Api.deleteMany({ category: category._id });
    for (let api of apis) {
      await Bookmark.deleteMany({ api: api._id });
    }
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})


module.exports = router;
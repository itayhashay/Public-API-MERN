const express = require('express'),
  { StatusCodes } = require('http-status-codes'),
  Api = require('../Models/api'),
  Bookmark = require('../Models/bookmark'),
  Category = require('../Models/category')
  router = express.Router();

router.get('/', async (req, res) => {
  try {
    const apis = await Api.find({}).populate('uploadBy').populate('category').exec();
    res.status(StatusCodes.OK).send({ data: apis });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
  }
})

router.get('/latest', async (req, res) => {
  try {
    const apis = await Api.find({}).populate('uploadBy').populate('category').sort([['date', -1]]).exec();
    res.status(StatusCodes.OK).send({ data: apis });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
  }
})

router.get('/bestRated', async (req, res) => {
  try {
    const apis = await (await Api.find({}).populate('uploadBy').populate('category').sort({ upvotes: 'descending' }).limit(5));
    res.status(StatusCodes.OK).send({ data: apis });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
  }
})

router.get('/random', async (req, res) => {
  try {
    const apis = await Api.find({}).populate('uploadBy').populate('category');
    res.status(StatusCodes.OK).send({ data: apis[Math.floor(Math.random() * apis.length - 1)] })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
  }
})


router.get('/search', async (req, res) => {
  try {
    let { name, uploadby, category, q } = req.query;
    let query = [];
    if (name == 'true') {
      query = [...query, { name: { $regex: q, $options: 'i' } }]
    }
    if (uploadby == 'true') {
      let users = await User.find({ "name": { $regex: q, $options: 'i' } });
      let userIds = users.map(user => user._id);
      query = [...query, { "uploadBy": { $in: userIds } }]
    }
    if (category == 'true') {
      let categories = await Category.find({ name: { $regex: q, $options: 'i' } });
      let categoryIds = categories.map(category => category._id);
      query = [...query, { category: { $in: categoryIds } }]
    }
    console.log(query)
    const api = await Api.find({
      $or: query
    }).populate("category").populate("uploadBy");
    res.status(StatusCodes.OK).send({ data: api });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
  }
})

router.get('/count', async (req, res) => {
  try {
    const apis_count = await Api.countDocuments();
    res.status(StatusCodes.OK).send({ data: apis_count });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const api = await Api.findById(id);
    res.status(StatusCodes.OK).send({ data: api == null ? [] : api })
  } catch (err) {
    if (["CastError", "ValidationError"].includes(err.name)) {
      res.status(StatusCodes.BAD_REQUEST).send({ data: { Error: "API doesn't exist" } });
    }
    else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
    }
  }
})

router.post('/', async (req, res) => {
  try {
    req.body.uploadBy = req.cookies.userId ? req.cookies.userId : "6373b5a91876e3d4dac2201f";
    const newApi = new Api(req.body);
    await newApi.save();
    const populatedApi = await Api.findById(newApi._id).populate('uploadBy').populate('category');
    res.status(StatusCodes.CREATED).send({ data: populatedApi });
  } catch (err) {
    if (err.name == 'ValidationError') {
      res.status(StatusCodes.BAD_REQUEST).send({ data: { Error: err.message } });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
    }
  }
})

router.post('/upvote/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let api = await Api.findById(id);
    api.upvotes++;
    api = await Api.findByIdAndUpdate(id, api, { new: true });
    await api.save();
    const populatedApi = await Api.findById(id).populate('uploadBy').populate('category');
    res.status(StatusCodes.OK).send({ data: populatedApi })
  }  catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const api = await Api.findByIdAndUpdate(id, req.body, { new: true });
    await api.save();
    const populatedApi = await Api.findById(id).populate('uploadBy').populate('category');
    res.status(StatusCodes.OK).send({ data: populatedApi });
  } catch (err) {
    if (err.name == "TypeError") {
      res.status(StatusCodes.BAD_REQUEST).send({ data: { Error: "API doesn't exist" } });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
    }
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const api = await Api.findByIdAndDelete(id);
    await Bookmark.deleteMany({ api: api._id });
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    if (err.name == "TypeError") {
      res.status(StatusCodes.BAD_REQUEST).send({ data: { Error: "API doesn't exist" } });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
    }
  }
})

router.get('/upvotes/count', async (req, res) => {
  try {
    const sum_upvotes = await Api.aggregate([
      { $group: { _id: null, sum: { $sum: "$upvotes" } } }
    ]);
    res.status(StatusCodes.OK).send({ data: sum_upvotes[0] == null ? 0 : sum_upvotes[0].sum });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
  }
})

module.exports = router;
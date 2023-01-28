const express = require('express'),
  { StatusCodes } = require('http-status-codes'),
  Api = require('../Models/api'),
  Bookmark = require('../Models/bookmark'),
  router = express.Router();

router.get('/', async (req, res) => {
  try {
    const apis = await Api.find({});
    res.status(StatusCodes.OK).send({ data: apis });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.get('/latest', async (req, res) => {
  try {
    const apis = await Api.find({}).sort([['date', -1]]);
    res.status(StatusCodes.OK).send({ data: apis });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.get('/bestRated', async (req, res) => {
  try {
    const apis = await Api.find({}).sort({ upvotes: 'descending' }).limit(5);
    res.status(StatusCodes.OK).send({ data: apis });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.get('/random', async (req, res) => {
  try {
    const apis = await Api.find({});
    res.status(StatusCodes.OK).send({ data: apis[Math.floor(Math.random() * apis.length - 1)] })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
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
      query = [...query, { uploadBy: { $regex: q, $options: 'i' } }]
    }
    if (category == 'true') {
      query = [...query, { category: { $regex: q, $options: 'i' } }]
    }
    const api = await Api.find({
      $or: query
    });
    res.status(StatusCodes.OK).send({ data: api });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})


router.get('/count', async (req, res) => {
  try {
    const apis_count = await Api.countDocuments();
    res.status(StatusCodes.OK).send({ data: apis_count });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const api = await Api.findById(id);
    res.status(StatusCodes.OK).send({ data: api == null ? [] : api })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.post('/', async (req, res) => {
  try {
    req.body.uploadBy = req.cookies.username ? req.cookies.username : "itayhashay";
    const newApi = new Api(req.body);
    await newApi.save();
    res.status(StatusCodes.CREATED).send({ data: newApi });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.post('/upvote/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let api = await Api.findById(id);
    api.upvotes++;
    api = await Api.findByIdAndUpdate(id, api, { new: true });
    api.save();
    res.status(StatusCodes.OK).send({ data: api })
  }  catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const api = await Api.findByIdAndUpdate(id, req.body, { new: true });
    await api.save();
    res.status(StatusCodes.OK).send({ data: api });
  }  catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const api = await Api.findByIdAndDelete(id);
    await Bookmark.deleteMany({ apiId: api._id });
    res.status(StatusCodes.OK).send({ data: api });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.get('/upvotes/count', async (req, res) => {
  try {
    const sum_upvotes = await Api.aggregate([
      { $group: { _id: null, sum: { $sum: "$upvotes" } } }
    ]);
    res.status(StatusCodes.OK).send({ data: sum_upvotes[0] == null ? 0 : sum_upvotes[0].sum });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

module.exports = router;
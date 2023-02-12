const express = require('express'),
  {StatusCodes} = require('http-status-codes'),
  hash = require('object-hash'),
  User = require('../Models/user'),
  Api = require('../Models/api'),
  { isAdmin, isLoggedIn } = require("../Services/middleware"),
  Bookmark = require('../Models/bookmark'),
  router = express.Router();
const firebaseService = require('../Services/firebase');  

//TODO NEED TO ADD ERROR HANDLING!!!!!!!!!

router.get('/', isAdmin,async (req, res) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).send({ data: users });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.get('/me', isLoggedIn,async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(StatusCodes.OK).send({ data: user });
  } catch (err) {
    if (err.name == "TypeError") {
      res.status(StatusCodes.BAD_REQUEST).send({ data: { Error: "User doesn't exist" } });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
    }
  }
})

router.get('/api-per-user',isAdmin, async (req, res) => {
  try {
    const users = await Api.aggregate([
      {
        $group: {
          _id: '$uploadBy',
          count: { $sum: 1 } // this means that the count will increment by 1
        }
      }
    ]);
    res.status(StatusCodes.OK).send({ data: users });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.get('/count', isAdmin, async (req, res) => {
  try {
    const users_count = await User.countDocuments();
    res.status(StatusCodes.OK).send({ data: users_count });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
  }
})

router.get('/search', isAdmin, async (req, res) => {
  try {
    let { q } = req.query;
    const users = await User.find({
      $or: [{ username: { $regex: q, $options: 'i' } }, { firstName: { $regex: q, $options: 'i' } }, { lastName: { $regex: q, $options: 'i' } }, { gender: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }, { userType: { $regex: q, $options: 'i' } }]
    });
    res.status(StatusCodes.OK).send({ data: users });
  } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err } });
    } 
})

router.get('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(StatusCodes.OK).send({ data: user });
  } catch (err) {
    if (err.name == "TypeError") {
      res.status(StatusCodes.BAD_REQUEST).send({ data: { Error: "User doesn't exist" } });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: { Error: err.message } });
    }
  }
  
})

router.post('/', isAdmin, async (req, res) => {
  let user = await User.find({ username: req.body.username })
  if (user.length != 0)
    res.send({ data: [], isSuccess: false, message: "Username already taken" });
  else {
    //TODO: ADD ERROR HABDLING WHEN FIREBASE FAILD
    const firebaseRegister = await firebaseService.register(req.body.username, req.body.password);
    req.body.birthday = Date.parse(req.body.birthday);
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ data: newUser, isSuccess: true, message: "Success" });
  }
})

router.put('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  await user.save();
  res.send({ data: user });
})


module.exports = router;
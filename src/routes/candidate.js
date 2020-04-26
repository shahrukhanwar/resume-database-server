const express = require('express');
const router = express.Router();
const Candidate = require('../model/candidate');

//GET all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.send({
      data: candidates,
      success: true,
      message: 'Successfully Retrieved Data!',
    });
  } catch (error) {
    res.send({ data: null, success: false, message: 'Something Went Wrong!' });
  }
});

//UPDATE candidate
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'summary',
    'location',
    'notes',
    'resume',
    'avatar',
    'experience',
    'gitHubURL',
    'linkedInURL',
  ];
  const isValidUpdates = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdates) {
    return res.send({
      data: null,
      success: false,
      message: 'Invalid updates!',
    });
  }
  try {
    const candidate = await Candidate.findById(req.params.id);
    updates.forEach((update) => (candidate[update] = req.body[update]));
    await candidate.save();

    res.send({
      data: candidate,
      success: true,
      message: 'Updated Successfully',
    });
  } catch (error) {
    res.send({ data: null, success: false, message: 'Something Went Wrong!' });
  }
});

//DELETE candidate
router.delete('/:id', async (req, res) => {
  try {
    await Candidate.deleteOne({ _id: req.params.id });
    res.send({ data: null, success: true, message: 'Deleted Successfully!' });
  } catch (error) {
    res.send({ data: null, success: false, message: 'Something Went Wrong!' });
  }
});

//CREATE Candidate
router.post('/', async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).send({
      data: candidate,
      success: true,
      message: 'Created Successfully!',
    });
  } catch (error) {
    res.send({ data: null, success: false, message: 'Something Went Wrong!' });
  }
});

//Create tag
router.post('/:id/tags', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    candidate.tags = [...candidate.tags, req.body.tag];

    await candidate.save();

    res.status(201).send({
      data: candidate.tags,
      success: true,
      message: 'Tag Created Successfully!',
    });
  } catch (error) {
    res.send({ data: null, success: false, message: 'Something Went Wrong!' });
  }
});

//Delete tag
router.delete('/:id/tags', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    candidate.tags = candidate.tags.filter((tag) => tag !== req.body.tag);
    await candidate.save();

    res.send({
      data: candidate.tags,
      success: true,
      message: 'Tag Deleted Successfully!',
    });
  } catch (error) {
    res.send({ data: null, success: false, message: 'Something Went Wrong!' });
  }
});

module.exports = router;

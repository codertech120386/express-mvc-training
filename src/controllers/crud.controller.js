const get = (model) => async (req, res) => {
  const items = await model.find({}).lean().exec();
  res.status(200).json({ data: items });
};

const post = (model) => async (req, res) => {
  const item = await model.create(req.body);
  res.status(201).json({ data: item });
};

const getOne = (model) => async (req, res) => {
  const item = await model.findById(req.params.id);
  res.status(200).json({ data: item });
};

const updateOne = (model) => async (req, res) => {
  const item = await model
    .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .lean()
    .exec();
  res.status(200).json({ data: item });
};

const removeOne = (model) => async (req, res) => {
  const item = await model.findByIdAndRemove(req.params.id);
  res.status(200).json({ data: item });
};

module.exports = (model) => ({
  get: get(model),
  post: post(model),
  getOne: getOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
});

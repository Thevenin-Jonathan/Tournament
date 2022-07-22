const userDatamapper = require("../datamapper/user");

async function getAll(_, res) {
  const users = await userDatamapper.findAll();
  return res.json(users);
};

async function getOne(req, res) {
  const id = req.params.id;
  const user = await userDatamapper.findById(id);
  return res.json(user);
};

async function create(req, res) {
  const userData = req.body;
  const user = await userDatamapper.exist(userData);

  if (user) {
    // throw new Error("User is already exist in DB");
    return res.json({message: "User is already exist in DB"})
  }

  const newUser = await userDatamapper.insertOne(userData);

  return res.json(newUser);
};

async function update(req, res) {
  const id = req.params.id;
  const newData = req.body;
  const user = await userDatamapper.findById(id);

  if (!user) {
    return res.json({message: "User does not exist in DB"})
  }
  
  if (newData.email || newData.phone || newData.player_license) {
    const existingData = await userDatamapper.exist(newData, id);
    if (existingData) {
      // throw new Error("Data is already exist on another user in DB");
      return res.json({message: "Data is already exist on another user in DB"})
    }
  }

  const updUser = await userDatamapper.updateOne(id, newData)
  return res.json(updUser)
}

async function destroy(req, res) {
  const id = req.params.id;
  const user = await userDatamapper.findById(id);

  if (!user) {
    return res.json({message: "User does not exist in DB"})
  }

  await userDatamapper.deleteOne(id);
  return res.status(204).json();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}
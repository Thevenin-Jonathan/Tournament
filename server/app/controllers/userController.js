const debug = require('debug')('app:server');
const bcrypt = require("bcrypt");
const userDatamapper = require("../datamapper/user");

async function register(req, res) {
  
};

async function getAll(req, res) {
  const users = await userDatamapper.findAll();
  res.json(users);
};

async function getOne(req, res) {
  const id = Number(req.params.id);
  const user = await userDatamapper.findById(id);
  res.json(user);
};

async function create(req, res) {
  const userData = req.body;
  const user = await userDatamapper.exist(userData);

  if (user) {
    // throw new Error("User already exist in DB");
    res.json({message: "User already exist in DB"})
  }

  const newUser = await userDatamapper.insertOne(userData);

  res.json(newUser);
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
  res.json(updUser)
}

async function destroy(req, res) {

};

module.exports = {
  register,
  getAll,
  getOne,
  create,
  update,
  destroy
}
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
};

async function update(req, res) {

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
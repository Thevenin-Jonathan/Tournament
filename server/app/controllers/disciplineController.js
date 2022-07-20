const discipline = require("../datamapper/discipline")

async function fetchAllDisciplines(req, res) {
    try {
  
      const disciplines = await discipline.findAll();
  
      if (disciplines) res.status(200).json(disciplines);
          else throw new Error(`Aucune discipline à été trouvée`);
  
    } catch (err) {
      console.log("error")
    }
  }

  module.exports = {
    fetchAllDisciplines
  }
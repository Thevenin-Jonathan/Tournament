📦app
  📄index.js 
  📦routers
    📄index.js
    📦v1
      📄tournamentRouter.js
  📦controllers (controle les endpoints)
    📄index.js
    📄tournamentController.js
  📦datamapper (échange avec la database)
    📄tournament.js
  📦config
    📄database.js (configure le Pool et la connection)
  📦services
    📄errorHandler.js (module qui gere les erreurs)
    📄controllerWrapper.js (couche de try and catch sur les controllers)
  📦validations (valide les données selon les schemas)
    📦schemas
    📄validation.js
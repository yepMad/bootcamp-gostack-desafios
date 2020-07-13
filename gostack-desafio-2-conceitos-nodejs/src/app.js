const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newRepositorie);

  return response.status(200).json(newRepositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { body, params } = request;

  const { title, url, techs } = body;
  const { id } = params;

  const oldRepositorieIndex = repositories.findIndex(element => element.id === id);

  if(oldRepositorieIndex === -1) {
    return response.status(404).json({
      success: false,
      message: "Repositório não encontrado"
    });
  }

  const oldRepositorie = repositories[oldRepositorieIndex];

  repositories[oldRepositorieIndex] = {
    id: oldRepositorie.id,
    title: title || oldRepositorie.title,
    url: url || oldRepositorie.url,
    techs: techs || oldRepositorie.techs,
    likes: oldRepositorie.likes
  }

  return response.status(200).json(repositories[oldRepositorieIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(element => element.id === id);

  if(repositorieIndex === -1) {
    return response.status(404).json({
      success: false,
      message: "Repositório não encontrado"
    });
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(element => element.id === id);

  if(repositorieIndex === -1) {
    return response.status(404).json({
      success: false,
      message: "Repositório não encontrado"
    });
  }

  repositories[repositorieIndex].likes += 1;

  return response.status(200).json(repositories[repositorieIndex]);
});

module.exports = app;

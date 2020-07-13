import React, { useState, useEffect } from "react";

import "./styles.css";

import Api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    Api.get('/repositories').then((response) => {
      const { data, status } = response;

      if(status !== 200) return;

      setRepositories(data);
    });
  }, [])

  async function handleAddRepository() {
    const newRepositorie = {
      title: "Curso de Letras",
      url: "https://github.com/",
      techs: ["React", "ReactJs"]
    };
    const response = await Api.post('/repositories', newRepositorie);

    const { data, status } = response;

    if(status !== 200) return;

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const response = await Api.delete(`/repositories/${id}`);

    const { status } = response;

    if(status !== 204) return;

    setRepositories(repositories.filter(e => e.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
            {repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

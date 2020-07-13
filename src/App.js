import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      const { data, status } = response;

      if(status !== 200) return;

      setRepositories(data);
    })
  }, [])

  async function handleLikeRepository(id) {
    const repositoryIndex = repositories.findIndex(element => element.id === id);
    const response = await api.post(`/repositories/${id}/like`);

    const { status } = response;

    if(status !== 200) return;

    const newRepositoriesList = [...repositories];
    newRepositoriesList[repositoryIndex].likes += 1;

    setRepositories(newRepositoriesList);
  }

  const RepositorieItem = ({data}) => {
    const Techs = ({title}) => {
      return (
        <Text style={styles.tech}>
          {title}
        </Text>
      )
    }
    
    return (
      <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>{data.title}</Text>

          <FlatList
            contentContainerStyle={styles.techsContainer}
            data={data.techs}
            renderItem={({item}) => <Techs title={item} />}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews
            horizontal
          />

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              testID={`repository-likes-${data.id}`}
            >
              {data.likes} curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(data.id)}
            testID={`like-button-${data.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          renderItem={({item}) => <RepositorieItem data={item} />}
          keyExtractor={(item) => item.id}
          removeClippedSubviews
        />
      </SafeAreaView>
    </>
  );
}

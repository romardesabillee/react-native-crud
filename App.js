import { SafeAreaView, Button, ScrollView, Image, Text, TextInput, StyleSheet, View, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useEffect, useState } from "react";

const listS = StyleSheet.create({
  container: { padding: 10, gap: 10 },
  card: { padding: 10, backgroundColor: '#d4d4d4', borderRadius: 10, },
  title: { fontSize: 16, fontWeight: "800" },
  desc: { fontSize: 14 },
});

const ListComponent = (props) => {
  // destructure props
  const { todos, setTodos, setIndex, setUpdateIndex } = props;

  function handleDelete (index) {
    const todoLists = [...todos];
    setTodos(todoLists.filter((todo, i) => i != index));
  }

  function handleUpdate(index){
    setUpdateIndex(index)
    setIndex(1);
  }

  return (
    <ScrollView>
      <View style={listS.container}>
        {/* render todo from main TabView Component */}
        {todos.map((todo, index) => {
          return (
            <View style={listS.card} key={index}>
              <View>
                <Text style={listS.title}>{todo.title}</Text>
                <Text style={listS.desc}>Desc: {todo.description}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleUpdate(index)}>
                  <Text style={{ color: 'blue' }}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  );
};

const styleCU = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d4d4d4',
  },
  button: {
    padding: 10,
    backgroundColor: '#d4d4d4',
    borderRadius: 5,
    alignItems: 'center',
  }
})

const CreateOrUpdate = (props) => {
  const { todos, setTodos, updateIndex, setUpdateIndex } = props;

  const [todo, setTodo] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if(updateIndex >= 0){
      setTodo({
        title: todos[updateIndex].title,
        description: todos[updateIndex].description,
      });
    }
  }, [])

  function pressCreate() {
    setTodos([...todos, todo]);
    setTodo({ title: '', description: '' });
  }

  function pressUpdate() {
    setTodos((prev) => {
      return prev.map((data, index) => {
        return index == updateIndex ? todo : data;
      })
    });
    setUpdateIndex(-1);
    setTodo({ title: '', description: '' });
  }

  return (
    <View style={styleCU.container}>
      <TextInput 
        onChangeText={(text) => setTodo({ ...todo, title: text })}
        value={todo.title}
        style={styleCU.input}
        placeholder="Title"/>
      <TextInput 
        onChangeText={(text) => setTodo({ ...todo, description: text })}
        value={todo.description}
        style={styleCU.input}
        placeholder="Description"/>
      <TouchableOpacity 
        onPress={updateIndex >= 0 ? pressUpdate : pressCreate}
        style={styleCU.button}>
        <Text>
          {updateIndex >= 0 ? 'Update' : 'Create'}
        </Text>
      </TouchableOpacity>
    </View>
  )
};

export default function MyTabView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 0, title: 'List' },
    { key: 1, title: 'Create / Update' },
  ]);

  const [updateIndex, setUpdateIndex] = useState(-1);

  const [todos, setTodos] = useState([
    { title: 'Todo Title 1', description: 'Todo description 1' },
    { title: 'Todo Title 2', description: 'Todo description 2' },
  ]);

  return (
    <SafeAreaView style={style.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
            0: () => 
              <ListComponent 
                todos={todos} 
                setIndex={setIndex}
                setUpdateIndex={setUpdateIndex}
                setTodos={setTodos} />,
            1: () => 
              <CreateOrUpdate 
                todos={todos} 
                updateIndex={updateIndex}
                setUpdateIndex={setUpdateIndex}
                setTodos={setTodos} />,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  }
});
import { SafeAreaView, Button, ScrollView, Image, Text, TextInput, StyleSheet, View, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

const listS = StyleSheet.create({
  container: { padding: 10, gap: 10 },
  card: { padding: 10, backgroundColor: '#d4d4d4', borderRadius: 10, },
  title: { fontSize: 16, fontWeight: "800" },
  desc: { fontSize: 14 },
});

const ListComponent = (props) => {
  // destructure props
  const { todos } = props;

  return (
    <ScrollView>
      <View style={listS.container}>
        {/* render todo from main TabView Component */}
        {todos.map((todo, index) => {
          return (
            <View style={listS.card} key={index}>
              <View>
                <Text style={listS.title}>{todo.title}</Text>
                <Text style={listS.desc}>Desc: {todo.title}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
                <TouchableOpacity>
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity>
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
  const { todos, setTodos } = props;

  const [todo, setTodo] = useState({
    title: '',
    description: '',
  });

  function pressCreate() {
    setTodos([...todos, todo]);
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
        onPress={pressCreate}
        style={styleCU.button}>
        <Text>Create</Text>
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

  const [todos, setTodos] = useState([
    { title: 'Todo Title 1', description: 'Todo description 1' },
    { title: 'Todo Title 2', description: 'Todo description 2' },
  ]);

  return (
    <View style={style.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
            0: () => <ListComponent todos={todos} />,
            1: () => <CreateOrUpdate todos={todos} setTodos={setTodos} />,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
  }
});
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/task';

const Main = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem('tasks');
                if (savedTasks) {
                    setTasks(JSON.parse(savedTasks));
                }
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        };

        loadTasks();
    }, []);

    useEffect(() => {
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            } catch (error) {
                console.error('Failed to save tasks:', error);
            }
        };

        saveTasks();
    }, [tasks]);

    const handleAddOrUpdateTask = () => {
        if (newTask.trim()) {
            if (editTaskId !== null) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === editTaskId ? { ...task, title: newTask } : task
                    )
                );
                setEditTaskId(null);
            } else {
                setTasks((prevTasks) => [
                    ...prevTasks,
                    { id: Date.now(), title: newTask, completed: false },
                ]);
            }
            setNewTask('');
        }
    };

    const handleDelete = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const handleEdit = (id) => {
        const taskToUpdate = tasks.find((task) => task.id === id);
        if (taskToUpdate) {
            setNewTask(taskToUpdate.title);
            setEditTaskId(id);
        }
    };

    const handleToggleComplete = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To-Do List</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new task"
                    value={newTask}
                    onChangeText={setNewTask}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddOrUpdateTask}>
                    <Text style={styles.addButtonText}>
                        {editTaskId ? 'Update' : 'Add'}
                    </Text>
                </TouchableOpacity>
            </View>
            {tasks.length === 0 ? (
                <Text style={styles.noTasksText}>No tasks found.</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(task) => task.id.toString()}
                    renderItem={({ item }) => (
                        <Task title={item.title}
                            isCompleted={item.completed}
                            onToggleComplete={() => handleToggleComplete(item.id)}
                            onDelete={() => handleDelete(item.id)}
                            onEdit={() => handleEdit(item.id)} />)} />
            )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    noTasksText: {
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default Main;

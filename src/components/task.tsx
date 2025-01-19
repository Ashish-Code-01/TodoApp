import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Task = ({ title, onDelete, onEdit, onToggleComplete, isCompleted }) => {
    return (
        <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{title}</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onEdit}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onToggleComplete}>
                    <Text style={styles.completedText}>{isCompleted ? "undo" : "Completed"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        height: 60,
        backgroundColor: 'lightgray',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        maxHeight:"auto",
    },
    taskTitle: {
        width: 175,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    deleteText: {
        color: 'red',
        fontWeight: 'bold',
    },
    editText: {
        color: 'green',
        fontWeight: 'bold',
    },
    completedText: {
        color: 'blue',
        fontWeight: 'bold',
    }
});

export default Task;

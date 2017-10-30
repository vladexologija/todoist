import React, { Component } from 'react';
import { View, Text, Switch, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

class Row extends Component {
  render() {
    const { complete } = this.props

    const textComponent = (
      <TouchableOpacity style={styles.textWrap} onLongPress={() => this.props.onToggleEdit(true)}>
        <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
      </TouchableOpacity>
    )

    const removeButton = (
      <TouchableOpacity onPress={this.props.onRemove}>
        <Text style={styles.destroy}>x</Text>
      </TouchableOpacity>
    )

    const editingComponent = (
      <View style={styles.textWrap}>
        <TextInput
          autoFocus
          multiline
          onChangeText={this.props.onUpdate}
          style={styles.input} />
      </View>
    )

    const doneButton = (
      <TouchableOpacity style={styles.done} onPress={() => this.props.onToggleEdit(false)}>
        <Text>Save</Text>
      </TouchableOpacity>
    )

    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={this.props.onComplete}
        />
        { this.props.editing ? editingComponent : textComponent}
        { this.props.editing ? doneButton : removeButton}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: "#4D4D4D"
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7be290",
    padding: 7,
  },
  doneText: {
    color: "#4d4d4d",
    fontSize: 20
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10
  },
  complete: {
    textDecorationLine: "line-through"
  },
  destroy: {
    fontSize: 20,
    color: "#CC9898"
  },
  text: {
    fontSize: 24,
    color: "#4D4D4D"
  }
})

export default Row;

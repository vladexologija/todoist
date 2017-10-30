import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  ListView,
  View
} from 'react-native';

import Row from "./row"
import Header from "./header"
import Footer from "./footer"

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if (filter === 'ALL') return true;
    if (filter === 'COMPLETED') return item.complete;
    if (filter === 'ACTIVE') return !item.complete;
  })
}

class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      allComplete: false,
      value: "",
      filter: "ALL",
      items: [],
      dataSource: ds.cloneWithRows([])
    }

    this.setSource = this.setSource.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this)
    this.handleToggleComplete = this.handleToggleComplete.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleClearComplete = this.handleClearComplete.bind(this)
    this.handleUpdateText = this.handleUpdateText.bind(this)
    this.handleToggleEditing = this.handleToggleEditing.bind(this)
  }

  // FIXME
  setSource(items, itemsDataSource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    })
  }

  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), {filter})
  }

  handleClearComplete() {
    const newItems = filterItems("ACTIVE", this.state.items);
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter((item)=> {
      return item.key !== key
    })

    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleToggleComplete(key,complete) {
    const newItems = this.state.items.map((item)=> {
      if (item.key !== key) return item
      return {
        ...item,
        complete
      }
    })

    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete
    }))

    this.setSource(newItems, filterItems(this.state.filter, newItems), {allComplete: complete})
  }

  handleUpdateText(key, text){
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        text
      }
    })

    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        editing
      }
    })

    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleAddItem () {
    if (!this.state.value) return;

    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]

    this.setSource(newItems, filterItems(this.state.filter, newItems), {value: ''})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({value})}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScoll={() => Keyboard.dismiss()}
            renderRow={({key,...value}) => {
              return <Row
                key={key}
                onUpdate={(text) => this.handleUpdateText(key,text)}
                onToggleEdit={(editing) => this.handleToggleEditing(key,editing)}
                onRemove={() => this.handleRemoveItem(key)}
                onComplete={(complete) => this.handleToggleComplete(key, complete)}
                {...value} />
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator}></View>
            }}
          />
        </View>
        <Footer
          count={filterItems('ACTIVE', this.state.items).length}
          onClearComplete={this.handleClearComplete}
          onFilter={this.handleFilter}
          filter={this.state.filter} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      ios: {
        paddingTop: 30
      }
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5'
  }
})

export default App;

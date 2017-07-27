import { v4 } from 'node-uuid'

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const v1 = v4()
const v2 = v4()
const v3 = v4()

const fakeDatabase = {
  items: [
    {
      id: v1,
      task: 'hey',
      date: new Date(),
      completed: true
    },
    {
      id: v2,
      task: 'ho',
      date: new Date(),
      completed: false
    },
    {
      id: v3,
      task: 'let’s go',
      date: new Date(),
      completed: false
    }
  ],

  projects: [
    {
      id: v4(),
      name: 'hey',
      items: [v1, v2]
    },
    {
      id: v4(),
      name: 'ho',
      items: [v3]
    }
  ]
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const fetchProjects = () => delay(500).then(() => fakeDatabase.projects)

export const fetchItems = filter =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.items
      case 'active':
        return fakeDatabase.items.filter(t => !t.completed)
      case 'completed':
        return fakeDatabase.items.filter(t => t.completed)
      default:
        return fakeDatabase.items
    }
  })

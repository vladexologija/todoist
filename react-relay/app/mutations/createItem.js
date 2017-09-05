import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../relay/environment'

const mutation = graphql`
  mutation createItemMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todo {
        __typename
        cursor
        node {
          id
          content
          checked
          editing
        }
      }
      viewer {
        id
      }
    }
  }
`

export default (content, viewer, callback) => {
  const variables = {
    input: {
      content,
      // TODO don't think this is necessary
      clientMutationId: ''
    }
  }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: () => {
      callback()
    },
    updater: proxyStore => {
      const addTodoField = proxyStore.getRootField('addTodo')
      const newTodo = addTodoField.getLinkedRecord('todo')
      // FIXME
      const node = newTodo.getLinkedRecord('node')
      node.setValue(true, 'editing')

      const viewerProxy = proxyStore.get(viewer.id)
      const conn = ConnectionHandler.getConnection(viewerProxy, 'Items_allTodos')
      ConnectionHandler.insertEdgeAfter(conn, newTodo)
    },
    onError: err => console.error(err)
  })
}

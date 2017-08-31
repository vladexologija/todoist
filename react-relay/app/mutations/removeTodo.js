import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../relay/environment'

const mutation = graphql`
  mutation removeTodoMutation($input: RemoveTodoInput!) {
    removeTodo(input: $input) {
      todoId
      viewer {
        id
      }
    }
  }
`

export default (todo, viewer, callback) => {
  const variables = {
    input: { id: todo.id }
  }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: () => {
      callback()
    },
    updater: proxyStore => {
      const payload = proxyStore.getRootField('removeTodo')
      const todoId = payload.getValue('todoId')

      const viewerProxy = proxyStore.get(viewer.id)
      const conn = ConnectionHandler.getConnection(viewerProxy, 'Items_allTodos')
      ConnectionHandler.deleteNode(conn, todoId)
    },
    onError: err => console.error(err)
  })
}

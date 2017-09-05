import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../relay/environment'

const mutation = graphql`
  mutation updateTodoMutation($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      todo {
        id
        content
        checked
        editing
      }
    }
  }
`

export default (todo, content, checked, viewer, callback) => {
  const variables = {
    input: { id: todo.id, content, checked }
  }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: () => {
      callback && callback()
    },
    updater: proxyStore => {
      const updateField = proxyStore.getRootField('updateTodo')
      const update = updateField.getLinkedRecord('todo')
      const chkd = update.getValue('checked')
      const cnt = update.getValue('content')

      const element = proxyStore.get(todo.id)
      element.setValue(chkd, 'checked')
      element.setValue(cnt, 'content')
      // FIXME
      element.setValue(false, 'editing')
    },
    onError: err => console.error(err)
  })
}

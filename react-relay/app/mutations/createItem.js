import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../relay/environment'

const mutation = graphql`
  mutation createItemMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todo {
        content
      }
    }
  }
`

export default (content, callback) => {
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
    onError: err => console.error(err)
  })
}

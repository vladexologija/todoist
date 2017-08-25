import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../relay/environment'

const mutation = graphql`
  mutation createProjectMutation($input: AddProjectInput!) {
    addProject(input: $input) {
      project {
        name
      }
    }
  }
`

export default (name, callback) => {
  const variables = {
    input: {
      name,
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

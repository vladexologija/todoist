import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../relay/environment'

const mutation = graphql`
  mutation renameProjectMutation($input: RenameProjectInput!) {
    renameProject(input: $input) {
      project {
        id
        name
      }
    }
  }
`

export default (project, name, viewer, callback) => {
  const variables = {
    input: { name, id: project.id }
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

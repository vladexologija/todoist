import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../relay/environment'

const mutation = graphql`
  mutation createProjectMutation($input: AddProjectInput!) {
    addProject(input: $input) {
      project {
        __typename
        cursor
        node {
          id
          name
        }
      }
      viewer {
        id
      }
    }
  }
`

export default (name, viewer, callback) => {
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
    updater: proxyStore => {
      const addProjectField = proxyStore.getRootField('addProject')
      const newProject = addProjectField.getLinkedRecord('project')

      const viewerProxy = proxyStore.get(viewer.id)
      const conn = ConnectionHandler.getConnection(viewerProxy, 'Projects_allProjects')
      ConnectionHandler.insertEdgeAfter(conn, newProject)
    },
    onError: err => console.error(err)
  })
}

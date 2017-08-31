import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../relay/environment'

const mutation = graphql`
  mutation removeProjectMutation($input: RemoveProjectInput!) {
    removeProject(input: $input) {
      projectId
      viewer {
        id
      }
    }
  }
`

export default (project, viewer, callback) => {
  const variables = {
    input: { id: project.id }
  }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: () => {
      callback()
    },
    updater: proxyStore => {
      const payload = proxyStore.getRootField('removeProject')
      const projectId = payload.getValue('projectId')

      const viewerProxy = proxyStore.get(viewer.id)
      const conn = ConnectionHandler.getConnection(viewerProxy, 'Projects_allProjects')
      ConnectionHandler.deleteNode(conn, projectId)
    },
    onError: err => console.error(err)
  })
}

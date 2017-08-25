import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const store = new Store(new RecordSource())

const network = Network.create((operation, variables) =>
  fetch('http://localhost:8080/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => response.json())
)

// TODO create new environment whenever user logs in/out
const environment = new Environment({
  network,
  store
})

export default environment

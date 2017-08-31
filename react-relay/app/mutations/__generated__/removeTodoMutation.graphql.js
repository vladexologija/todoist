/**
 * @flow
 * @relayHash 11c5256618d72ccab3070a776ba44bed
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type removeTodoMutationVariables = {|
  input: {
    id: string;
    clientMutationId?: ?string;
  };
|};

export type removeTodoMutationResponse = {|
  +removeTodo: ?{|
    +todoId: ?string;
    +viewer: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
mutation removeTodoMutation(
  $input: RemoveTodoInput!
) {
  removeTodo(input: $input) {
    todoId
    viewer {
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RemoveTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "removeTodoMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RemoveTodoInput!"
          }
        ],
        "concreteType": "RemoveTodoPayload",
        "name": "removeTodo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "todoId",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "user",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "removeTodoMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RemoveTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "removeTodoMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RemoveTodoInput!"
          }
        ],
        "concreteType": "RemoveTodoPayload",
        "name": "removeTodo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "todoId",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "user",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation removeTodoMutation(\n  $input: RemoveTodoInput!\n) {\n  removeTodo(input: $input) {\n    todoId\n    viewer {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;

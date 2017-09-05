/**
 * @flow
 * @relayHash d85ad93e39717a1f34b069a252fea0fd
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type updateTodoMutationVariables = {|
  input: {
    id: string;
    checked: boolean;
    content: string;
    clientMutationId?: ?string;
  };
|};

export type updateTodoMutationResponse = {|
  +updateTodo: ?{|
    +todo: ?{|
      +id: string;
      +content: ?string;
      +checked: ?boolean;
      +editing: ?boolean;
    |};
  |};
|};
*/


/*
mutation updateTodoMutation(
  $input: UpdateTodoInput!
) {
  updateTodo(input: $input) {
    todo {
      id
      content
      checked
      editing
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
        "type": "UpdateTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "updateTodoMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateTodoInput!"
          }
        ],
        "concreteType": "UpdateTodoPayload",
        "name": "updateTodo",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "todo",
            "name": "todo",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "content",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "checked",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "editing",
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
  "name": "updateTodoMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "updateTodoMutation",
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
            "type": "UpdateTodoInput!"
          }
        ],
        "concreteType": "UpdateTodoPayload",
        "name": "updateTodo",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "todo",
            "name": "todo",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "content",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "checked",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "editing",
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
  "text": "mutation updateTodoMutation(\n  $input: UpdateTodoInput!\n) {\n  updateTodo(input: $input) {\n    todo {\n      id\n      content\n      checked\n      editing\n    }\n  }\n}\n"
};

module.exports = batch;

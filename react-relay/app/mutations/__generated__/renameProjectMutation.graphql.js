/**
 * @flow
 * @relayHash eb0dc6b672c8db4ed316cc51e025b0b8
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type renameProjectMutationVariables = {|
  input: {
    id: string;
    name: string;
    clientMutationId?: ?string;
  };
|};

export type renameProjectMutationResponse = {|
  +renameProject: ?{|
    +project: ?{|
      +id: string;
      +name: ?string;
    |};
  |};
|};
*/


/*
mutation renameProjectMutation(
  $input: RenameProjectInput!
) {
  renameProject(input: $input) {
    project {
      id
      name
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
        "type": "RenameProjectInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "renameProjectMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RenameProjectInput!"
          }
        ],
        "concreteType": "RenameProjectPayload",
        "name": "renameProject",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "project",
            "name": "project",
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
                "name": "name",
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
  "name": "renameProjectMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RenameProjectInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "renameProjectMutation",
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
            "type": "RenameProjectInput!"
          }
        ],
        "concreteType": "RenameProjectPayload",
        "name": "renameProject",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "project",
            "name": "project",
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
                "name": "name",
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
  "text": "mutation renameProjectMutation(\n  $input: RenameProjectInput!\n) {\n  renameProject(input: $input) {\n    project {\n      id\n      name\n    }\n  }\n}\n"
};

module.exports = batch;

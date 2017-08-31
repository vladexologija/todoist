/**
 * @flow
 * @relayHash 7ab5e35bc352e21b96e19a8eceb6b8ab
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type removeProjectMutationVariables = {|
  input: {
    id: string;
    clientMutationId?: ?string;
  };
|};

export type removeProjectMutationResponse = {|
  +removeProject: ?{|
    +projectId: ?string;
    +viewer: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
mutation removeProjectMutation(
  $input: RemoveProjectInput!
) {
  removeProject(input: $input) {
    projectId
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
        "type": "RemoveProjectInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "removeProjectMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RemoveProjectInput!"
          }
        ],
        "concreteType": "RemoveProjectPayload",
        "name": "removeProject",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "projectId",
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
  "name": "removeProjectMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RemoveProjectInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "removeProjectMutation",
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
            "type": "RemoveProjectInput!"
          }
        ],
        "concreteType": "RemoveProjectPayload",
        "name": "removeProject",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "projectId",
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
  "text": "mutation removeProjectMutation(\n  $input: RemoveProjectInput!\n) {\n  removeProject(input: $input) {\n    projectId\n    viewer {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;

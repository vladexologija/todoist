/**
 * @flow
 * @relayHash 073a255f9c839148697fc24bba688847
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type createProjectMutationVariables = {|
  input: {
    name: string;
    clientMutationId?: ?string;
  };
|};

export type createProjectMutationResponse = {|
  +addProject: ?{|
    +project: ?{|
      +name: ?string;
    |};
  |};
|};
*/


/*
mutation createProjectMutation(
  $input: AddProjectInput!
) {
  addProject(input: $input) {
    project {
      name
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
        "type": "AddProjectInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "createProjectMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "AddProjectInput!"
          }
        ],
        "concreteType": "AddProjectPayload",
        "name": "addProject",
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
  "name": "createProjectMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "AddProjectInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "createProjectMutation",
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
            "type": "AddProjectInput!"
          }
        ],
        "concreteType": "AddProjectPayload",
        "name": "addProject",
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
                "name": "name",
                "storageKey": null
              },
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
  "text": "mutation createProjectMutation(\n  $input: AddProjectInput!\n) {\n  addProject(input: $input) {\n    project {\n      name\n      id\n    }\n  }\n}\n"
};

module.exports = batch;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type pagesRepositoryNameQueryVariables = {};
export type pagesRepositoryNameQueryResponse = {
    readonly repository: {
        readonly name: string;
    } | null;
};
export type pagesRepositoryNameQuery = {
    readonly response: pagesRepositoryNameQueryResponse;
    readonly variables: pagesRepositoryNameQueryVariables;
};



/*
query pagesRepositoryNameQuery {
  repository(owner: "facebook", name: "relay") {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "name",
    "value": "relay"
  },
  {
    "kind": "Literal",
    "name": "owner",
    "value": "facebook"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pagesRepositoryNameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": "repository(name:\"relay\",owner:\"facebook\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pagesRepositoryNameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "repository(name:\"relay\",owner:\"facebook\")"
      }
    ]
  },
  "params": {
    "cacheID": "50f13aeeea72425a084d099be9b69703",
    "id": null,
    "metadata": {},
    "name": "pagesRepositoryNameQuery",
    "operationKind": "query",
    "text": "query pagesRepositoryNameQuery {\n  repository(owner: \"facebook\", name: \"relay\") {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8b86cba370e51b60406e412129cae964';
export default node;

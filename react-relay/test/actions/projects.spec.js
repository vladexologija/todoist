import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import nock from 'nock';
import { CREATE_PROJECT } from 'actions/projects';
import * as actions from 'actions/projects';
import createId from 'utils/createId';
import expect from 'expect';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureStore(middlewares);
const state = {}

describe('(Action) admins', () => {
  let _server;

  beforeEach(() => {
    _server = nock('http://localhost:3333');
  });

  it('Should create an action to create a project', () => {
    const project = {
      id: createId(),
      items: [],
      name: 'test'
    }

    const expected = [{
      type: CREATE_PROJECT,
      project
    }]

    const store = mockStore(state);
    store.dispatch(actions.createProject(project));

    const actula = store.getActions()
    expect(actula).toEqual(expected)
  });

  afterEach(() => {
    nock.cleanAll();
  });
});

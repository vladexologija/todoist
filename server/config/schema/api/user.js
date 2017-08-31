class User {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;

function getViewer() {
  return viewer;
}

module.exports = { getViewer };

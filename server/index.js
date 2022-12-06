try {
  require('./secrets');
} catch (ex) {
  console.log(ex);
  console.log(
    'if runing locally add secrets.js file which sets enviroment variables for GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET'
  );
}

const app = require('./app');
const { syncAndSeed } = require('./db');

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();

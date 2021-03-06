import express from 'express';
import logger from 'morgan';

import Pipeline from './pipeline';
import ServerConfig from './utils/server-config';

class Server {

  constructor(root = __dirname) {
    this.isFirstRun = ServerConfig.db.get('isFirstRun');
    this.root = root;
    this.app = express();

    this.app.set('root', this.root);
    this.app.use(logger('dev'));
    this.app.use(express.static('./public'));
    this.app.use('/pipeline', new Pipeline().router);
  }

  start() {
    if (this.isFirstRun) {
      ServerConfig
        .prompt()
        .then(resultMsg => {
          console.log(resultMsg);
          this.run();
        });
    } else {
      console.log(`> Settings loaded from ${ServerConfig.db.path}\n` +
                  "> Use 'npm run reset' to clear settings\n");
      this.run();
    }
  }

  run() {
    const serverPort = parseInt(ServerConfig.db.get('serverPort'), 10);
    console.log(`> Starting server at localhost:${serverPort}`);
    this.app.listen(serverPort);
  }

}

export default Server;

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../config/config.json' assert { type: 'json' };;

const basename = path.basename(import.meta.url);
const db = {};

let sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  dialect: 'mysql',
  ...config.development
});

const modelsDir = path.join(path.dirname(import.meta.url), 'models/MySQL');
console.log(modelsDir);
if (fs.existsSync(modelsDir)) {
  fs.readdirSync(modelsDir)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js'
      );
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(modelsDir, file));
      db[model.name] = model;
    });
} else {
  console.error(`Directory ${modelsDir} does not exist.`);
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
const config = require('config.json');
const { Client } = require('pg')

const { Sequelize, DataTypes } = require('sequelize');

module.exports = db = {};

initialize();


async function initialize() {
    // connect to db
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;


    // MYSQL
    
    // const connection = await mysql.createConnection({ host, port, user, password });
    // await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    // const sequelize = new Sequelize(database, user, password, { host: host, dialect: 'mysql' });

    // POSTGRES  
    const sequelize = new Sequelize(database, user, password, { host: host, dialect: 'postgres',  dialectOptions: {
        ssl: true
    }});

    
    // init models and add them to the exported db object
    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    //define relationships

    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    // db.Condominio.hasMany(db.Edificio, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    // db.Edificio.hasMany(db.Departamento, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    // db.Departamento.hasMany(db.Multa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    // db.Departamento.hasMany(db.Reserva, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    // db.Reserva.belongsTo(db.Departamento);
    // db.Departamento.hasMany(db.gastosComunes);
    // db.gastosComunes.belongsTo(db.Departamento);

    // db.Account.hasOne(db.Domicilio, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    // db.Domicilio.belongsTo(db.Account);
    // db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    // db.RefreshToken.belongsTo(db.Account);
    // db.Account.hasMany(db.Arriendo);
    // db.Arriendo.belongsTo(db.Account);
    // db.Vehiculo.hasMany(db.Arriendo);
    // db.Arriendo.belongsTo(db.Vehiculo);
    // sync all models with database

    await sequelize.sync();

}
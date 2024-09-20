import { DataSource } from 'typeorm';
import User from '../model/userModel.js';
import Contact from '../model/studentModel.js';

const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "react_db",
    entities: [User,Contact],
    synchronize: true,
    logging: false,

});
export const EntityManager=AppDataSource.manager;

const dbConnection=()=>{


    AppDataSource.initialize()
    .then (()=>{
        console.log ('Database connection successfully!');
    })
    .catch((err)=>{
        console.log('Error Database connection:',err); 
    });
}


export default dbConnection;

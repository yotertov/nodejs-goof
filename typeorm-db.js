var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;

const Users = require("./entity/Users")

console.log("Debug: MySQL connection config:", {
  host: process.env.MYSQL_HOST || "goof-mysql",
  port: 3306,
  database: "acme"
});

typeorm.createConnection({
  name: "mysql",
  type: "mysql",
  host: process.env.MYSQL_HOST || "goof-mysql",
  port: 3306,
  username: "root",
  password: "root",
  database: "acme",
  synchronize: true,
  "logging": true,
  entities: [
    new EntitySchema(Users)
  ]
}).then(() => {
  const dbConnection = typeorm.getConnection('mysql')
  const repo = dbConnection.getRepository("Users")
  return repo
}).then((repo) => {
  console.log('Seeding 2 users to MySQL users table: Liran (role: user), Simon (role: admin')
  const inserts = [
    repo.insert({
      name: "Liran",
      address: "IL",
      role: "user"
    }),
    repo.insert({
      name: "Simon",
      address: "UK",
      role: "admin"
    })
  ];
  return Promise.all(inserts)
}).catch((err) => {
  console.error('failed connecting and seeding users to the MySQL database')
  console.error(err)
})

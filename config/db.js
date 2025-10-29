import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       
  password: 'root',        
  database: 'db_blog'  
})

connection.connect(err => {
  if (err) {
    console.error('Errore di connessione al DataBase:', err)
    return
  }
  console.log('Connessione al database riuscita!')
})

export default connection;

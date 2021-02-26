import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  // Pegar os dados do ormconfig
  const defaultOptions = await getConnectionOptions()
  
  return createConnection(
    Object.assign(defaultOptions, {
      // De todos os dados só altera o database
      database: process.env.NODE_ENV === "test" 
        ? "./src/database/database.test.sqlite" 
        : defaultOptions.database
    })
  )
}
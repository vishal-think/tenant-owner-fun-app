export const databaseConnectionString = (
  host: string,
  port: string,
  connection: string,
  name: string,
  user: string,
  password: string,
) => {
  const connectionString =
    host === 'localhost'
      ? connection + '://' + host + ':' + port + '/' + name
      : connection +
        '://' +
        user +
        ':' +
        encodeURIComponent(password) +
        '@' +
        host +
        ':' +
        port +
        '/' +
        name +
        '?retryWrites=true&w=majority';
  console.log('====connection string', connectionString);
  return connectionString;
};

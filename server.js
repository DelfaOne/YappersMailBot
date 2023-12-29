import { SMTPServer } from 'smtp-server'

// Create an SMTP server instance
const server = new SMTPServer({
  secure: false,
  authOptional: true,
  ignoreTLS: true,
  onAuth(auth, session, callback) {
    // Implement your authentication logic here (if needed)
    // For development purposes, you can accept any user/pass combination
    callback(null, { user: 'dummy-user' });
  },
  onData(stream, session, callback) {
    // Implement your email processing logic here
    // 'stream' is the raw email stream
    // 'session' contains client information
    callback(null);
  }
});

// Start the server on port 2525
server.listen(2525, () => {
  console.log('SMTP Server listening on port 2525');
});

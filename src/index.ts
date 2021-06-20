// import REvent, { eventType, gradingformat } from './models/event';
import app from './app';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on port');
});

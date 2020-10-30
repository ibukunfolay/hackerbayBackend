/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
import bunyan from 'bunyan'

const log = bunyan.createLogger({
  name: 'applogs',
  streams: [{
    path: 'log/app.log',
    type: 'file'
    // `type: 'file'` is implied
  }]

})

export default log

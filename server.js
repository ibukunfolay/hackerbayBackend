/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable semi */
// eslint-disable-next-line import/extensions

import express from 'express'
import newroute from './newroute.js'
import logger from './log/logger.js'

const app = express()
const PORT = process.env.PORT || 2000

/** middleware */
app.use('/api', newroute);

app.listen(PORT, () => {
  logger.info(`SERVER IS BINGO ON ${PORT}`)
})

export default app

//reponsible for starting the application
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT || 3001, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
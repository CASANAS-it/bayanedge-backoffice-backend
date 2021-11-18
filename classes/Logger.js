import winston from 'winston'
import chalk from 'chalk'
import { generateId } from '../utils/Crypto'
import apilogModel from '../models/apilog.model'

const httpContext = require('express-http-context')

/**
 * Adapter for logger
 */
class Logger {
  /**
   * Constructor to logger
   */
  constructor () {
    const errorStackFormat = winston.format((err) => {
      if (err.level === 'error') {
        return Object.assign({}, err, {
          stack: err.stack,
          message: err.message
        })
      }
      return err
    })

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            errorStackFormat(),
            winston.format.colorize(),
            winston.format.json(),
            winston.format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`
            ),
            winston.format.simple()
          ),
          level: 'info', // Local Dev to preview all logging events
          handleExceptions: true // Show exceptions in the console
        })
      ]
    })
  }

  /**
   * Logs via Trace
   * @param  {...any} args any args
   */
  trace (...args) {
    this.logger.trace(...args)
  }

  /**
   * Logs via Trace
   * @param  {...any} args any args
   */
  debug (...args) {
    this.logger.debug(...args)
  }

  /**
   * Logs via Info
   * @param  {...any} args any args
   */
  info (...args) {
    this.logger.info(...args)
  }

  /**
   * Logs via Warn
   * @param  {...any} args any args
   */
  warn (...args) {
    this.logger.warn(...args)
  }

  /**
   * Logs via Error
   * @param  {...any} args any args
   */
  error (...args) {
    this.logger.error(...args)
  }

  async expressMiddleware (req, res, next) {
    console.log(
      new Date().toLocaleString() + chalk.green(` ${req.method} - ${req.url} - ${JSON.stringify(req.body)} `)
    )

    const id = generateId()
    httpContext.set('apiLogId', id)

    const oldWrite = res.write
    const oldEnd = res.end

    const chunks = []

    res.write = function (chunk) {
      chunks.push(Buffer.from(chunk))
      oldWrite.apply(res, arguments)
    }

    res.end = async function (chunk) {
      if (chunk) { chunks.push(Buffer.from(chunk)) }

      const stringBody = Buffer.concat(chunks).toString('utf-8')
      let response = ''
      try {
        if (stringBody) { response = JSON.parse(stringBody) }
      } catch {
        response = stringBody
      }
      oldEnd.apply(res, arguments)

      await apilogModel.insertLog({
        apiLogId: id,
        requestData: JSON.stringify(req.body),
        responseData: stringBody,
        type: 'API_LOG',
        isSuccess: response.response_code === 0 ? 'SUCCESS' : 'FAILED'
      })
    }

    next()
  }
}

export default new Logger()

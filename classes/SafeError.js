import ErrorMessages from './ErrorMessages'

/**
 * This class rappresent a managed error
 */
class SafeError extends Error {
  /**
   * Construct parent class
   *
   * @param {string} message - Message string to display to user
   * @param {string} name - Error name
   * @param {number} status - HTTP Error code
   */
  constructor ({
    code = 0,
    message = ErrorMessages.UNKNOWN.message,
    status = ErrorMessages.UNKNOWN.status,
    name = 'UNKNOWN',
    data = {}
  }) {
    // Calling parent constructor of base Error class.
    super()

    // Saving class name in the property of our custom error as a shortcut.
    this.name = name

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)

    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.status = status
    this.message = message
    this.code = code
    this.data = data
  }
}
export default SafeError

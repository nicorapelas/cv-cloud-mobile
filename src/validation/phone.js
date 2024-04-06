const Validator = require('validator')
const isEmpty = require('./is-empty')

export default function validateEmailInput(phone) {
  let errors = {}

  phone = !isEmpty(phone) ? phone : ''

  if (phone.length < 10 || phone.length > 14) {
    errors.phone = `'Phone number' is invalid`
  }

  if (Validator.isEmpty(phone)) {
    errors.phone = `'Phone number' is required`
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

import { getter } from '@progress/kendo-vue-common';

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const ccardRegex = new RegExp(/^[0-9-]+$/);
const cvcRegex = new RegExp(/^[0-9]+$/);

export const termsValidator = (value: any) =>
  value ? '' : "It's required to agree with Terms and Conditions.";
export const emailValidator = (value: string) =>
  !value
    ? 'Email field is required.'
    : emailRegex.test(value)
    ? ''
    : 'Email is not in a valid format.';
export const nameValidator = (value: string | any[]) =>
  !value
    ? 'Full Name is required'
    : value.length < 7
    ? 'Full Name should be at least 7 characters long.'
    : '';
export const userNameValidator = (value: string | any[]) =>
  !value
    ? 'User Name is required'
    : value.length < 5
    ? 'User name should be at least 5 characters long.'
    : '';
export const phoneValidator = (value: string) =>
  !value
    ? 'Phone number is required.'
    : phoneRegex.test(value)
    ? ''
    : 'Not a valid phone number.';
export const cardValidator = (value: string) =>
  !value
    ? 'Credit card number is required. '
    : ccardRegex.test(value)
    ? ''
    : 'Not a valid credit card number format.';
export const cvcValidator = (value: string | any[]) =>
  !value
    ? 'CVC code is required,'
    : typeof value === 'string' && (cvcRegex.test(value) || value.length !== 3)
    ? ''
    : 'Not a valid CVC code format.';
export const guestsValidator = (value: number) =>
  !value
    ? 'Number of guests is required'
    : value <= 5
    ? ''
    : 'Maximum 5 guests';
export const nightsValidator = (value: any) =>
  value ? '' : 'Number of Nights is required.';
export const arrivalDateValidator = (value: any) =>
  value ? '' : 'Arrival Date is required.';
export const colorValidator = (value: any) => (value ? '' : 'Color is required.');
export const requiredValidator = (value: any) =>
  value ? '' : 'Error: This field is required.';
export const passwordValidator = (value: string | any[]) =>
  value && value.length > 8 ? '' : 'Password must be at least 8 symbols.';
export const addressValidator = (value: any) =>
  value ? '' : 'Address is required.';

const userNameGetter = getter('username');
const emailGetter = getter('email');

export const formValidator = (values: any) => {
  const userName = userNameGetter(values);
  const emailValue = emailGetter(values);

  if (userName && emailValue && emailRegex.test(emailValue)) {
    return {};
  }

  return {
    VALIDATION_SUMMARY: 'Please fill in the following fields.',
    ['username']: !userName ? 'User Name is required.' : '',
    ['email']:
      emailValue && emailRegex.test(emailValue)
        ? ''
        : 'Email is required and should be in a valid format.',
  };
};
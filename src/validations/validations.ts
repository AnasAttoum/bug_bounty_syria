import * as yup from 'yup'

export const validateSecurityResearcherSchema = yup.object({
    name: yup.string().required('invalidName'),
    email: yup.string().email('invalidEmail').required('invalidEmail'),
    phone: yup.string().min(9, 'invalidNumber').required('invalidNumber'),
    password: yup.string().min(7, 'invalidPasswordLength').required('invalidPassword'),
})

export const validateCompanySchema = yup.object({
    domain: yup.string().required('invalidDomain'),
    name: yup.string().required('invalidCompanyName'),
    type: yup.string().required('invalidType'),
    employeesNumber: yup.number().min(1, 'invalidNumber').required('invalidEntry'),
    email: yup.string().email('invalidEmail').required('invalidEmail'),
    password: yup.string().min(7, 'invalidPasswordLength').required('invalidPassword'),
})

export const validateLogInSchema = yup.object({
    email: yup.string().email('invalidEmail').required('invalidEmail'),
    password: yup.string().min(7, 'invalidPassword').required('invalidPassword'),
})

export const validateChangePassword = yup.object({
    currentPassword: yup.string().min(7, 'invalidPassword').required('invalidPassword'),
    newPassword: yup.string().min(7, 'invalidPassword').required('invalidPassword'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'mustMatch')
})

export const validateAddProgram = yup.object({
    name: yup.string().required('invalidEntry'),
    link: yup.string().required('invalidEntry'),
    description: yup.string().required('invalidEntry'),
})
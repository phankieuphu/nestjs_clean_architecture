import * as Joi from 'joi';
import { UserRole } from 'src/entities/enum/user.enum';

const userFields = {
  name: Joi.string().max(255),
  role: Joi.string().valid(...Object.values(UserRole)),
  user_name: Joi.string().max(255),
  department: Joi.string().max(255).allow(''),
  position: Joi.string().max(255).allow(''),
  office_name: Joi.string().max(255).allow(''),
  company_phone_number: Joi.string().max(255).allow(''),
  active: Joi.boolean(),
};

export const createUserSchema = Joi.object({
  ...userFields,
  name: userFields.name.required(),
  company_email: Joi.string().email().max(255).required(),
});

export const updateUserSchema = Joi.object(userFields).min(1);

export const getListUserSchema = Joi.object({
  keyword: Joi.string().allow(''),
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(100).default(20),
  orderBy: Joi.string()
    .valid('created_at', 'updated_at', 'name', 'company_email')
    .default('created_at'),
  sortOrder: Joi.string().uppercase().valid('ASC', 'DESC').default('DESC'),
});

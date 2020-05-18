const { Joi } = require('express-validation');

const schema = Joi.object({
  body: Joi.object({
    dueDate: Joi.date(),
    limit: Joi.number().integer().positive(),
    offset: Joi.number().integer().min(0),
    filters: Joi.object({
      appId: Joi.string().valid(...['730']).default('730'),
    }),
  }),
});

schema.validateAsync({
  body: {
    dueDate: new Date(),
    limit: '1',
    offset: '0',
    filters: {},
  },
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});

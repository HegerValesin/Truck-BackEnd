const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); 

const OngContoller = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();
//conferencia se a ong existe
routes.post('/sessions', SessionController.create);

//router de ongs, get, post
routes.get('/ongs', OngContoller.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngContoller.create);

//router de profiles, ela busca pelo numero da ong
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

//router para os incidentes, get, post e delete.
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);//GET o Segments.QUERY conferir a numeração de paginas usa o Keys

routes.post('/incidents', celebrate({
    [Segments.BODY ]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
        }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
        }).unknown(),
    }),//routeres que tem que colocar duas validaçãoes, criase um "Segments.body(Usa dentro do Keys) e depois o Segmants.HEADERS(Usa dentro do Objects".
IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

module.exports = routes;
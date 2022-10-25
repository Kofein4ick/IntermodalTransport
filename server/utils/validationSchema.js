const Joi = require('joi')

const validationSchema = Joi.object({
    email: Joi.string()
        .empty()
        .max(100)
        .ruleset
        .regex(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
        .rule({message:'У адреса электронной почты структура: example@example.ru .'})
        .email({tlds: {allow: ['com','net','ru']}})
        .messages({
            "string.max":"Максимум допустимо 100 символов в адресе электронной почты.",
            "string.email":"Домен верхнего уровня может быть .com, .net, .ru",
            "string.empty":"Email не может быть пустым.",
        }),

    password: Joi.string()
        .min(8)
        .max(32)
        .empty()
        .ruleset
        .regex(/^[a-zA-Z0-9$#%&*+=@_~\{\}\!\?\-]{8,32}$/)
        .rule({message:'Пароль может состоять из строчных и заглавных букв, а также из символов $#%&*+=-@_~}{!? и цифр.'})
        .messages({
            "string.min":"Минимум допустимо 8 символов в пароле.",
            "string.max":"Максимум допустимо 32 символов в пароле.",
            "string.empty":"Пароль не может быть пустым.",
        }),
})

module.exports = {
    validationSchema,
}
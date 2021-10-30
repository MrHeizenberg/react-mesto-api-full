const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/auth-err');
const NotFoundError = require('../errors/not-found-err');
const CastError = require('../errors/cast-err');
const ConflictError = require('../errors/conflict-err');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильное имя пользователя или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильное имя пользователя или пароль');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch(next);
};

const getAuthUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new AuthError('Вы не авторизованы');
    })
    .catch(next);
};

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(next);

const getUser = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Нет пользователя по заданному id');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Задан некорректный id');
      }
      next(err);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
        }))
        .then(({ name, about, avatar }) => {
          res.status(200).send({
            email, name, about, avatar,
          });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new CastError('Переданы некорректные данные при создании пользователя');
      }
      next(err);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Нет пользователя по заданному id');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Задан некорректный id');
      }
      if (err.name === 'ValidationError') {
        throw new CastError('Некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Нет пользователя по заданному id');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Задан некорректный id');
      }
      if (err.name === 'ValidationError') {
        throw new CastError('Некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateUserAvatar, login, getAuthUser,
};

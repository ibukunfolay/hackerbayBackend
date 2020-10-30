/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
/* eslint-disable semi */
/* eslint-disable func-names */

import express from 'express'
import jwt from 'jsonwebtoken'
import jsonpatch from 'jsonpatch'
import resize from 'node-image-resizer'
import bodyParser from 'body-parser'
import logger from './log/logger.js'

const router = express.Router()
router.use(bodyParser.json())

let user

/**
 * @param {object} verifyToken
 * @param {string} verifyToken.req [authorization]
 * @param {status} verifyToken.res [display error]
 * @param {string} verifyToken.next [token]
 */

/** verify token function */
const verifytoken = (req, res, next) => {
  const headertok = req.headers.authorization;

  if (typeof headertok !== 'undefined') {
    const header = headertok.split(' ')
    const headerToken = header[1]
    req.token = headerToken;
    logger.info(headerToken)
    next()
  } else {
    res.sendStatus(403)
    logger.info('no token')
  }
};

/** generate token function */
const generateToken = (data) =>{
  return jwt.sign({user}, 'Secret key')
}

/** home route */
router.get('/', (req, res) => {
  res.json('Welcome JAuth');
  logger.info('Welcome JAuth')
});

/** login route */
router.post('/login', (req, res) => {
  const { username } = req.body
  const { password } = req.body

  const user = {
    username,
    password,
  };

  const token = generateToken(user)

  logger.info({ user })

  return res.status(200).json({...user, token})

  
});

/** post route to display jsonpatch object */
router.post('/post', verifytoken, (req, res) => {
  jwt.verify(req.token, 'Secret key', (err) => {
    if (err) {
      res.sendStatus(403)
      logger.info('check token')
    } else {
      mydoc = {
        ibukun: 'folay',
        Hacker: 'bay',
      }
      logger.info({ mydoc })

      thepatch = [
        { op: 'replace', path: '/ibukun', value: 'King' },
      ]
      logger.info({ thepatch })

      patcheddoc = jsonpatch.apply_patch(mydoc, thepatch);
      res.json(patcheddoc);
      logger.info({ patcheddoc })
    }
  });
});

/** thumbnail route to generate image thumbnail using node-image-resizer */
router.post('/thumb', verifytoken, (req, res) => {
  const setup = {
    all: {
      path: './public/thumbnails/',
      quality: 80,
    },
    versions: [{
      quality: 100,
      suffix: '_thumbnail',
      height: 50,
      width: 50,
    }],
  };
  jwt.verify(req.token, 'Secret key', (err) => {
    if (err) {
      res.sendStatus(403);
      logger.info('check token', err)
    } else {
      (async function () {
        const thumbs = await resize('./public/15.jpg', setup);
        res.json({ thumbs })
        logger.info({ thumbs })
      }());
    }
  });
});

export  {generateToken};
export default router

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const propertiesRouter = require('./properties.js');
const leasesRouter = require('./leases.js');
const unitsRouter = require('./units.js');
const tenantsRouter = require('./tenants.js');
const purchasesRouter = require('./purchases.js');
const vendorsRouter = require('./vendors');


// GET /api/set-token-cookie
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get(
  '/set-token-cookie',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get('/restore-user', restoreUser, (req, res) => {
  return res.json(req.user);
});

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/properties', propertiesRouter);
router.use('/leases', leasesRouter);
router.use('/units', unitsRouter);
router.use('/tenants', tenantsRouter);
router.use('/purchases', purchasesRouter);
router.use('/vendors', vendorsRouter);

module.exports = router;

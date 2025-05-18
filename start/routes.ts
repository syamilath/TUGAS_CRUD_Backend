import router from '@adonisjs/core/services/router'
const WargasController = () => import('#controllers/wargases_controller')

router.group(() => {
  router.get('/warga', [WargasController, 'index'])
  router.post('/warga', [WargasController, 'store'])
  router.get('/warga/:id', [WargasController, 'show'])
  router.put('/warga/:id', [WargasController, 'update'])
  router.delete('/warga/:id', [WargasController, 'destroy'])
})

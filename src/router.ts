import { Router } from 'express'
import { SurveryController } from './controllers/SurveryController'
import { UserController } from './controllers/UserController'

const router = Router()

const userController = new UserController()
const surveryController = new SurveryController()

router.post("/", userController.create)

router.get("/surverys", surveryController.index)
router.post("/surverys", surveryController.create)

export { router }

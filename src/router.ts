import { Router } from 'express'
import { SendMailController } from './controllers/SendMailController'
import { SurveryController } from './controllers/SurveryController'
import { UserController } from './controllers/UserController'

const router = Router()

const userController = new UserController()
const surveryController = new SurveryController()
const sendMailController = new SendMailController()

router.post("/", userController.create)

router.get("/surverys", surveryController.index)
router.post("/surverys", surveryController.create)

router.post("/sendMail", sendMailController.send)

export { router }

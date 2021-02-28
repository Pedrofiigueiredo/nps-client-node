import { Router } from 'express'
import { SendMailController } from './controllers/SendMailController'
import { SurveryController } from './controllers/SurveryController'
import { UserController } from './controllers/UserController'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'

const router = Router()

const userController = new UserController()
const surveryController = new SurveryController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()

router.post("/", userController.create)

router.get("/surverys", surveryController.index)
router.post("/surverys", surveryController.create)

router.post("/sendMail", sendMailController.send)

router.get("/answers/:value", answerController.execute)

router.get("/nps/:survery_id", npsController.npsCalc)

export { router }

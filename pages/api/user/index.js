import AuthController from '../../../controllers/AuthController';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {

    const { method } = req

    await dbConnect()
  
    switch (method) {
        case 'GET':
            break;
        case 'POST':
            try {
                let user;
                if (req.body.confirm_password) user = AuthController.register(req.body)
                else user = AuthController.login(req.body)
                res.status(201).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}
import AuthController from '../../../controllers/AuthController';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res, next) {

    const { method } = req

    await dbConnect()
  
    switch (method) {
        case 'GET':
            break;
        case 'POST':
            try {
                if (req.body.confirm_password) AuthController.register(req.body, res)
                else AuthController.login(req.body, res)
                res.status(201).json({ success: true })
            } catch (error) {
                // res.status(400).json({ success: false })
            }
            break;
        default:
            // res.status(400).json({ success: false })
            break;
    }
}
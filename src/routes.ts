import { Request, Response, Router } from "express"

const router:Router = Router()

router.get("/", (req: Request, res: Response)=>{
    res.sendResponse({
        message: "Welcome boss!"
    })
})




export default router
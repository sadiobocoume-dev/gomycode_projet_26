import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

//Middleware admin - s'applique APRES le middleware auth
// auth verifie le token - admin verifie le role

const admin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // req.user est rempli par le middleware auth qui s'execute avant
    if (req.user?.role !== 'admin') {
        res.status(403).json({
            message: 'Acces refuse - reserve aux administrateurs'
        })
        return
    }

    // L'utilisateur est bien admin on continue
    next()
}

export default admin 
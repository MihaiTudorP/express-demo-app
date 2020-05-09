import {NextFunction, Request, Response} from 'express';
import {controller, get, use} from './decorators';

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
            <div>
                <div>You are logged in</div>
                <div><a href="/protected">Protected route</a></div>
                <a href="/auth/logout">Logout</a>
            </div>
        `);
        } else {
            res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/auth/login">Login</a>
            </div>
        `);
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to the protected route, logged in user');
    }
}

function requireAuth(req: Request, res: Response, next: NextFunction){
    if(req.session && req.session.loggedIn){
        next();
        return;
    }

    res.status(403);
    res.send('Not Allowed');
}
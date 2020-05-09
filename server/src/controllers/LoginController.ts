import {Request, Response} from 'express';
import {get, controller, post} from './decorators';

@controller('/auth')
class LoginController {
    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send(`
            <form method="POST">
                <div>
                    <label>E-mail</label>
                    <input name = "email"/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" />
                </div>
                <button>Submit</button>
            </form>
        `)
    };

    @post('/login')
    postLogin(req: RequestWithBody, res: Response) {
        const {email, password} = req.body;
        if (email && password && email === 'mike@mikescourse.com' && password === 'AbcD@2020') {
            //mark the user as logged in
            req.session = {loggedIn: true};
            //redirect them to the root route
            res.redirect('/');
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = undefined;
        res.redirect('/');
    }
}

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}
import {Router, Request, Response, NextFunction} from 'express';

interface RequestWithBody extends Request{
    body: {[key: string]: string|undefined};
}

function requireAuth(req: Request, res: Response, next: NextFunction){
    if(req.session && req.session.loggedIn){
        next();
        return;
    }

    res.status(403);
    res.send('Not Allowed');
}

const router = Router();

router.get('/login', (req: Request, res:Response) =>{
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
});

router.get('/', (req:Request, res: Response) => {
    if (req.session && req.session.loggedIn){
        res.send(`
            <div>
                <div>You are logged in</div>
                <div><a href="/protected">Protected route</a></div>
                <a href="/logout">Logout</a>
            </div>
        `);
    } else {
        res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/login">Login</a>
            </div>
        `);
    }
});

router.get('/logout', (req: Request, res: Response)=>{
    req.session = undefined;
    res.redirect('/');
});

router.get('/protected', requireAuth, (req:Request, res: Response) => {
    res.send('Welcome to the protected route, logged in user');
})

router.post('/login', (req: RequestWithBody, res:Response) => {
    const{email, password} = req.body;
    if(email && password && email === 'mike@mikescourse.com' && password === 'AbcD@2020'){
        //mark the user as logged in
        req.session = { loggedIn: true };
        //redirect them to the root route
        res.redirect('/');
    }
});

export { router };
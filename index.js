const express = require('express');
const app = express();
app.use(express.json());

const courses = [
{id: 1, name: 'Pedro anta'},
{id: 2, name: 'Lucas top'},
{id: 3, name: 'Ve linda e exuberante e fofa'}
];

app.get('/', (req, res) => {
    console.log("###user-agent########: "+ req.headers["user-agent"])
    console.log("###accept-language###: "+ req.headers["accept-language"])
    console.log("###accept-encoding###: "+ req.headers["accept-encoding"])
    console.log("###accept-testing####: "+ JSON.stringify(req.headers))

    //TODO - log into mongo???

    res.send('Acesso não autorizado, sua visita foi registrada!!!\n Beleza? \n\n\n\n To ligado de' + 
    ' algumas coisas de você que está acessando... \n '+JSON.stringify(req.headers["user-agent"]))

})
app.get('/api/courses', (req, res) => {
    

    chamador = req.headers

    console.log('Cahamador: ' + JSON.stringify(chamador))

    //defaultEncoding:

    res.send(courses)

})
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    res.statusCode;
    courses.push(course);
    
    res.send(course);

})
app.get('/api/courses/:id', (req, res, next) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send(`The course id:${req.params.id} dont exists...`);
    console.log('ID:', req.params.id, '  -  Nome: ', course.name);
    next();
}, function(req, res, next){
    const course = courses.find(c => c.id === parseInt(req.params.id))
    res.send(course)
    next()

})
//PORT
const porta = process.env.PORT || 3000;

app.listen(porta, () => console.log(`Escutando na porta ${porta}`))

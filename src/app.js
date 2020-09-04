const path=require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./util/geocode')
const forcast=require('./util/forcast')


const app = express()
//define path
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Aunty porn',
        name:'naked ass',

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        legend:'About Aunty Porn',
        name:'naked fat ass'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        legend:'Call 0564624914 for anal sex',
        name:'naked fat ass'
    })
})
//app.use('/help', express.static(path.join(__dirname, '../public/help.html')))
//app.use('/about', express.static(path.join(__dirname, '../public/about.html')))

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            code : 404,
            error: 'you must provide an address'
            
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                code : 404,
                error: error
                
            })
        }
        forcast(latitude, longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    code : 404,
                    error: error
                    
                })
            }
            res.send({
                Location : location,
                Data: forecastData
                
            })
        })
        
    })
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Please enter a search option',
            code: 404
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorText:'Help article not found. Till then enjoy masturbating'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorText:'404 page. Till then enjoy masturbating',
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
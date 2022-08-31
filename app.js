const express = require('express')
const app = express()
const port = 8000
const https=require('https')
var bodyParser = require('body-parser')
const { json } = require('body-parser')
const { write } = require('fs')
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view-engine', 'ejs')
app.set('views',__dirname +'/views')

app.use(express.static('public'))
app.get('/', (req, res) => {

  res.sendFile(__dirname+"/index.html")

})



app.post('/', async(req, res) => {
   const cityName=req.body.cityName;
   const url="https://api.weatherapi.com/v1/current.json?key=b86c1ec63ff64a00ad392306222708&q="+cityName+"&aqi=no &unit=metric"
   https.get(url,function(response){
    response.on("data",function(data){
    const jsondata=JSON.parse(data)
    const temp=Math.floor (jsondata.current.temp_c)
    const des=jsondata.current.condition.text
    const date=jsondata.current.last_updated
    const icon=jsondata.current.condition.icon
    

    // const imgurl="http://cdn.weatherapi.com/weather/64x64/day/116.png"
    // res.write(`<h1>The temp in ${cityName} is ${temp}</h1> `)
    // res.write(` <h4>which is ${des} in Day<span> ${date}</span><h4>`)
    // res.write(`<img src=${imgurl}>`)
    // res.send()
res.render('index.ejs',{tempretru:temp,city:cityName,description:des,dt:date})
    
    }) 
   })

  })
  






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
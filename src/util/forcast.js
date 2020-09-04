const request=require('request')

const forcast =(latitude, longitude,  callback)=>{
    const url='http://api.weatherstack.com/current?access_key=c023b755a781c4edb3357e860d5495ce&query='+ latitude + ',' + longitude +'&units=f'
    //const urlError='http://api.weatherstack.com/current?access_key=c023b755a781c4edb3357e860d5495ce'
    request({url, json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect weather app', undefined)
        }else if (body.error){
            callback('response.body.error.info', undefined)
        }
        else{
            callback(undefined,{
                    weather_descriptions:body.current.weather_descriptions[0],
                    feelslike:body.current.feelslike
            })
        }
    })
}

module.exports = forcast
console.log('Script loaded')

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const message1 = document.querySelector('#err')
const message2 = document.querySelector('#msg')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''

    const unParsed = searchTerm.value
    var parsedSearch = ''
    
    for(const character of unParsed){
        if(character === ' ')
            parsedSearch = parsedSearch + '%20'
        else
            parsedSearch = parsedSearch + character
    }


    fetch('/weather?address=' + parsedSearch).then((response)=>{
        
        response.json().then((data) => {
            if (data.current.error) {
                message1.textContent = ''
                message2.textContent = 'Invalid search term'
            } else{
                message2.textContent = 'It is ' + data.current.weather_descriptions[0] + '.'
                message1.textContent = 'The temperature in ' + data.location.name + ' is ' + data.current.temperature + '°C.'
            }
        })
    })
})

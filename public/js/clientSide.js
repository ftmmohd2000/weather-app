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
        console.log(parsedSearch)
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = ''
                message2.textContent = 'Invalid search term'
            } else{
                message2.textContent = 'It can be described as ' + data.weather_descriptions + '.'
                message1.textContent = 'The temperature in ' + unParsed + ' is ' + data.temperature + '°C.'
            }
        })
    })
})

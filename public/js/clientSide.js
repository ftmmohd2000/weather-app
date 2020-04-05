console.log('Script loaded')

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const message1 = document.querySelector('#Error')
const message2 = document.querySelector('#Message')

message1.textContent = 'Waiting For User Input...'

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


    fetch('http://localhost:3000/weather?address=' + parsedSearch).then((response)=>{
        console.log(parsedSearch)
        response.json().then((data) => {
            if (data.error) {
                message2.textContent = 'FUCK this shit'
                message1.textContent = ''
            } else{
                message2.textContent = ''
                message1.textContent = 'The weather in ' + unParsed + ' is ' + data.weather_descriptions
            }
        })
    })
})

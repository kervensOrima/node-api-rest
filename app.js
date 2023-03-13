
/*
* get the express packet
*/
const express = require('express')
let pokemons_list = require('./mock-pokemon')
/**
 * importation du middleware morgan
 */
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

// const helper = require('./helper.js')
const {success, getUniqueId} = require('./helper.js')
/**
 * express instance created
 */
const app = express()

/**
 * listen port's application
 */
const PORT = 3000 

/**
 * Using morgan middleware
 */
app
// .use(express.json())
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

/**
 * First middleware
app.use((req, resp, next) => {
    console.info(`METHODE : ${req.method} - URL : ${req.url} TIME: ${Date.now()}`)
    next()
})
 */

/**
 * our first route
 */
app.get('/', (request, response) => {
    response.send('Hello express, do you know i\'m new here, this all new to me broh')
})

/**
 * retourne le pokemon 1
 */
app.get('/api/pokemons/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const pokemons = pokemons_list
    let resp = undefined

    /**
     * first way to do
        pokemons.pokemons.forEach(pokemon => {
            if( pokemon.id === id )
            resp = pokemon
        })
    */

    /**
     * second way to do
     */
    resp = pokemons.pokemons.find( p => p.id === id )
    const message = `Le pokemon avec l'id ${resp.id} trouvé...`
    response.json(success(message, resp))
})


/**
 * get all pokemons
 */
app.get('/api/pokemons/', (request, response) => {
    const pokemons = pokemons_list
    const message = "Liste des pokemons en base de donnée"
    response.json(success(message, pokemons))
})


/**
 * add new pokemon
 */
app.post('/api/pokemons/', (request, response) => {
    const pokemon_id = getUniqueId(pokemons_list.pokemons)
    const pokemon = {...request.body,...{id: pokemon_id, created: new Date()} }
    pokemons_list.pokemons.push(pokemon)   
    const message = `Le pokemon ${pokemon.name} a bien ete ajouté`
    return response.json(success(message, pokemon))
})


/**
 * update pokemon
 */
app.put('/api/pokemons/:id/', (request, response) => {
    const id = parseInt(request.params.id)
    const pokemonUpdate = {...request.body, ...{id: id}}
    pokemons_list.pokemons = pokemons_list.pokemons.map(
        (pokemon) =>  {
            return pokemon.id === id ? pokemonUpdate : pokemon
        }
    )
    const message = `Pokemon ${pokemonUpdate.name} update successfully...`
    return response.json(success(message, pokemonUpdate))
})

/**
 * 
 * delete a pokemon
 */

app.delete('/api/pokemons/:id/', (request, response) => {
    const id = parseInt(request.params.id)
    // first way to do
    const pokemonDeleted = pokemons_list.pokemons.find( (pokemon) => pokemon.id === id )
    // pokemons_list.pokemons.filter((pokemon) => pokemonDeleted.id != pokemon.id)
    /*
    * second way to do check the object by its  id
    */
    const index = pokemons_list.pokemons.indexOf( (pokemon) => pokemon.id === id)
    /**+2
     * and now delete i by its rang
     */
    pokemons_list.pokemons.splice(index,1)
    const message = `Le pokemon ${pokemonDeleted.name} a bien ete supprimer`
    return response.json(success(message, pokemonDeleted))
})

/**
 * 
 * Number of pokemon avalaible
 */
app.get('/api/count/', (request, response) => {
    let number_of_pokemon = pokemons_list.pokemons.length ?? 01
    let plural =  number_of_pokemon > 1?'s':''
    response.send(`There are ${number_of_pokemon} pokemon${plural} in the list`)
})



/**
 * user endpoint
 */
app.get('/users/', (request, response) => {

    const user = {
        name:'ORIMA Kervens' ,
        last_name:'Kervens' ,
        first_name: 'ORIMA' ,
        age: 23,
        birth_date: new Date().getFullYear()
    }

    response.send(user)
})



/**
 * configure the listen port
 */
app.listen(PORT, () => {
  console.log(`This node app started in : http://localhost:${PORT}`)
})


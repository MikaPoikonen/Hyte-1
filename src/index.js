import express from 'express';
import { deleteItemById, getItemById, getItems, postItem, putItemById } from './items.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;
//Dummy dataa (nollautuu aina kun sovellus käynnistyy)

// parsitaan json data pyyttönstä ja lisää request-objektiin(ennen post ja että post toimisi)
app.use(express.json());

//staattinens webbi sivusto (front end) palvelin
app.use(express.static('public'));//käytetään public kansiota staattiseen sisältöön app.use(/'kansio'express.static('public'));



//API root
app.get('/api', (req, res) => {
  res.send('Welcome to my REST API!'); //tämän saa kopsattua eri sivuille /keijo ja lähetetään vastaus
});

//GET all items
//app.get('/items', (req, res) => {
 // res.json(items, getItems);
 //} //voi laittaa .send ja näyttää json express. res.json vanha tapa


//GET all items
app.get('/api/items', getItems); //voi laittaa .send ja näyttää json express. res.json vanha tap


//GET ites based it
app.get('/api/items/:id', getItemById);


//TODO: add PUT route for items
app.put('/api/items/:id', putItemById);


//TODO: ADD DELETE route for items
// Opettajan ratkais
//DELETE item by id
app.delete('/api/items/:id', deleteItemById);


//ADD new items"
app.post('/api/items', postItem);



// Users recoursce endpoints
app.get('/users')



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//npm run dev käynnistää scriptin ja
// päivittää automaattisesti
// res end haetaan nyt url pyynnöt ja tulostetaan consoleen

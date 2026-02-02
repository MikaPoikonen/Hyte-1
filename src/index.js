import express from 'express';
import itemRouter from './routes/item-router.js';
import userRouter from './routes/user-router.js';
import requestLogger from'./middlewares/logger.js';


const hostname = '127.0.0.1';
const app = express();
const port = 3000;






//Dummy dataa (nollautuu aina kun sovellus käynnistyy)

// parsitaan json data pyyttönstä ja lisää request-objektiin(ennen post ja että post toimisi)
app.use(express.json());

//staattinens webbi sivusto (front end) palvelin
app.use('/',express.static('public'));//käytetään public kansiota staattiseen sisältöön app.use(/'kansio'express.static('public'));


// Oma Loggeri middleware, käytössä koko sovelluksen laajuisesti eli käsittelee kaikki http-pyynnöt
app.use(requestLogger);


//API root
app.get('/api', (req, res) => {
  res.send('Welcome to my REST API!'); //tämän saa kopsattua eri sivuille /keijo ja lähetetään vastaus
});

//GET all items
//app.get('/items', (req, res) => {
 // res.json(items, getItems);
 //} //voi laittaa .send ja näyttää json express. res.json vanha tapa

app.use('/api/items', itemRouter);

app.use('/api/users',userRouter);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//npm run dev käynnistää scriptin ja
// päivittää automaattisesti
// res end haetaan nyt url pyynnöt ja tulostetaan consoleen

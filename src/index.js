import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;
//Dummy dataa (nollautuu aina kun sovellus käynnistyy)
const items = [
  [
    {id: 1, name: 'Omena'},
    {id: 2, name: 'Appelsiini'},
    {id: 3, name: 'Banaani'}
  ],
];
// parsitaan json data pyyttönstä ja lisää request-objektiin(ennen post ja että post toimisi)
app.use(express.json());
//API root
app.get('/', (req, res) => {
  res.send('Welcome to my REST API!'); //tämän saa kopsattua eri sivuille /keijo ja lähetetään vastaus
});

//GET all items
app.get('/items', (req, res) => {
  res.json(items); //voi laittaa .send ja näyttää json express. res.json vanha tapa
});


//GET ites based it
app.get('/items/:id', (req, res) => {
    console.log('getting item id', req.params.id); //haetaan id req parametrillä
    const itemFound = items.find(item => item.id == req.params.id);
    if (itemFound){
  res.json(itemFound); 
} else {
    res.status(404).json({message: 'item not found'})

  }}
);

//TODO: add PUT route for items
app.put('/items/:id', (req, res) => {
  
  const itemFound =items[0].find(item => item.id == req.params.id); // haetaan id perusteella indeksi 0 eli items taulukosta id
  if (itemFound){
    itemFound.name = req.body.name; //päivitetään nimen arvo
    res.json({message: 'Nimi päivitetty'})
  } else {
    res.status(404).json({message: 'item not found'})
  }
});


//TODO: ADD DELETE route for items

//DELETE item by id
app.delete('/items/:id', (req, res) => {
  // etsitään id:n indeksi taulukosta 0 eli id
  const index = items[0].findIndex(
    item => item.id == req.params.id
  );

  if (index !== -1) {
    items[0].splice(index, 1); //  poistaa id tietoineen indeksistä 0
    res.json({message: 'Item deleted'});
  } else {
    res.status(404).json({message: 'item not found'});
  }
});


//ADD new items"
app.post('/items', (req, res) => {
    const newItem = {
      id: items[0].length + 1,
      name: req.body.name //otetaan nimi bodystä
    };
    // TODO: lisää id listaan lisättävälle objektille
    items[0].push(newItem) // pushataan req.bodyyn
  res.status(201).json({message: 'New item added'});//voi ketjuttaa status koodin ja lähetetään jsonmuotoisena
  });



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//npm run dev käynnistää scriptin ja
// päivittää automaattisesti
// res end haetaan nyt url pyynnöt ja tulostetaan consoleen

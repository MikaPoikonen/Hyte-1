//

const items = [
  [
    {id: 1, name: 'Omena'},
    {id: 2, name: 'Appelsiini'},
    {id: 3, name: 'Banaani'}
  ],
];

const getItems = (req, res) => {
    res.json(items);
}

const getItemById = (req, res) => {
    const itemFound = items.find(item => item.id == req.params.id);
    if (itemFound){
        res.json(itemFound);
    } else {
        res.status(404).json({message: 'Item not found'});
    }
}


const postItem = (req, res) => {
    const newItem = {
      id: items[0].length + 1,
      name: req.body.name //otetaan nimi bodystä
    };
    // TODO: lisää id listaan lisättävälle objektille
    items[0].push(newItem) // pushataan req.bodyyn
  res.status(201).json({message: 'New item added'});//voi ketjuttaa status koodin ja lähetetään jsonmuotoisena
  };

const putItemById = (req, res) => {
    const itemFound = items.find(item => item.id == req.params.id); // haetaan id perusteella indeksi 0 eli items taulukosta id
    if (itemFound){
      itemFound.name = req.body.name; //päivitetään nimen arvo
      res.json({message: 'Nimi päivitetty'})
    } else {
      res.status(404).json({message: 'Item not found'})
    }
}

//const postNewItem = (req, res) => {
   // if (!req.body.name) {
      //  return res.status(400).json({message: 'Name is required'});

   // }





const deleteItemById = (req, res) => {
  const index = items.findIndex(
    item => item.id == req.params.id
  );

  if (index !== -1) {
    items.splice(index, 1); // poistaa id tietoineen indeksistä
    res.json({message: 'Item deleted'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
}

export { getItems, getItemById, putItemById, deleteItemById, postItem};
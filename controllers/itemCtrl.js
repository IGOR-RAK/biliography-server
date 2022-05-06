const Items = require('../models/itemModel')
const Cards = require('../models/cardModel')


const itemCtrl = {
    getItems: async(req, res) =>{
        try {
            const items = await Items.find()
            res.json(items)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createItem: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {title} = req.body;
            const item = await Items.findOne({title})           
            if(item) {return  res.json({msg: "Ten deskryptor już istnieje."})
                res.status(400).json({msg: "Ten deskryptor już istnieje."})
            }
            else {
                const newItem = new Items ({title})
                await newItem.save()
                res.json({msg: "Powstał nowy dyskryptor"})
            }
          
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
      
    },
    deleteItem: async(req, res) =>{
        try {
            const cards= await Cards.find();                               
            const item = await Items.findOne({_id: req.params.id}); 
            const find = cards.find(card=>card.item===item.title);
             if(find) return res.status(400).json({
                    msg: "Usuń wszystkie karty z tego roku z góry"
                 })
            await Items.findByIdAndDelete(req.params.id)
            res.json({msg: `${item.title} był usunienty`})
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateItem: async(req, res) =>{
        try {
            const {title} = req.body;           
            const item = await Items.findById(req.params.id);       
            await Items.findOneAndUpdate({_id: req.params.id}, {title})
            await Cards.updateMany({item:item.title}, { item: title });
            res.json({msg: "Rok został zaktualizowany"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = itemCtrl
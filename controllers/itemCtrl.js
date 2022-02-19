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
            if(item) return res.status(400).json({msg: "Ten rok już istnieje."})
            const newItem = new Items ({title})
            await newItem.save()
            res.json({msg: "Powstał nowy rok"})
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
            await Items.findOneAndUpdate({_id: req.params.id}, {title})
            res.json({msg: "Rok został zaktualizowany"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = itemCtrl
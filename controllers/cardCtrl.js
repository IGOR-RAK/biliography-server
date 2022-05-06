const Cards = require('../models/cardModel')

const cardCtrl = {
    getCards: async(req, res) =>{
        try {
            const cards = await Cards.find()
            res.json(cards)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCardsByYear: async(req, res) =>{
        try {
             const cards = await Cards.find({year:req.params.id})          
            res.json(cards)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCard: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {author,public_id,url,letter,note,item,year,link} = req.body;
            // console.log(req.body);
            const card = await Cards.findOne({url})
            if(card) return res.status(400).json({msg: "Ta kartka już istnieje."})
            const newCard = new Cards ({author,public_id,url,letter,note,item,year,link})
            await newCard.save()
            res.json({msg: "Powstała nowa kartka"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
      
    },
    deleteCard: async(req, res) =>{
        try {
            await Cards.findByIdAndDelete(req.params.id)
            res.json({msg: "Kartka została zlikwidowana"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCard: async(req, res) =>{
        try {
            const {author,public_id,url,letter,note,item,year,link} = req.body;
            await Cards.findOneAndUpdate({_id: req.params.id}, {author,public_id,url,letter,note,item,year,link})
            res.json({msg: "Kartka została zaktualizowana"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = cardCtrl
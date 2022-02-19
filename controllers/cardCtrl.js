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
    createCard: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {author,img_src,letter,note,item,year,link} = req.body;
            const card = await Cards.findOne({img_src})
            if(card) return res.status(400).json({msg: "Ta kartka już istnieje."})
            const newCard = new Cards ({author,img_src,letter,note,item,year,link})
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
            const {author,img_src,letter,note,item,year,link} = req.body;
            await Cards.findOneAndUpdate({_id: req.params.id}, {author,img_src,letter,note,item,year,link})
            res.json({msg: "Kartka została zaktualizowana"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = cardCtrl
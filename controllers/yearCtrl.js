const Years = require('../models/yearModel')
const Cards = require('../models/cardModel')

async function getYear(value){
    const cards = await Cards.find({year:value.title}) 
    return cards
}


const yearCtrl = {
    getYears: async(req, res) =>{
        try {
            const years = await Years.find()
            console.log(years)
            // const map = years.filter(year=>{
            //    const cards = getYear(year)
            //    console.log("cards",cards)
               
            //     return cards
            // })



            res.json(years)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createYear: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {title,isActive} = req.body;
            const year = await Years.findOne({title})
            if(year) return res.json({msg: "Ten rok już istnieje."})
            const newYear = new Years ({title,isActive})
            await newYear.save()
            res.json({msg: "Powstał nowy rok"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
      
    },
    deleteYear: async(req, res) =>{
        try {
            const cards= await Cards.find();                               
            const year = await Years.findOne({_id: req.params.id}); 
            const find = cards.find(card=>card.year===year.title);
            //  if(find) return res.status(400).json({
            //         msg: "Usuń wszystkie karty zo roku z góry teg"
            //      });
             if(find) return res.json({
                    msg: "Usuń wszystkie karty zo roku z góry teg"
                 })
            await Years.findByIdAndDelete(req.params.id)
            res.json({msg: `${year.title} był usunienty`})
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateYear: async(req, res) =>{7
        try {
            const {title,isActive} = req.body;
            await Years.findOneAndUpdate({_id: req.params.id}, {title,isActive})
            res.json({msg: "Rok został zaktualizowany"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = yearCtrl
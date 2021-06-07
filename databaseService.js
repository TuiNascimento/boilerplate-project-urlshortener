

const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const URLSchema = new Schema({
    original_url: String,
    short_url: String
})

const Url = mongoose.model('Url', URLSchema);

var self = module.exports = {

    createAndSave : (original, done)=>{
        let url = new Url({
            original_url: original,
        })

        url.save((err, data)=>{
            if(err) return console.log(err);
            done(null, data)
        })
    },

    setShortUrl: (original, done) => {
        Url.findOne({original_url: original}, function(err, document){
                if(err) return console.log(err)
                
                document.short_url = document._id

                document.save((err, updatedDocument) => {
                    if(err) return console.log(err)

                    done(null, updatedDocument)
                })
            })
    },

    getByShortenedUrl: (shortenedUrl, done) => {
        Url.findOne({short_url: shortenedUrl}, (err, document) => {
            if(err) return console.log(err)

            done(null, document);
        })
    }

}
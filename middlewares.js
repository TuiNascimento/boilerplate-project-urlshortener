const dbService = require('./databaseService')
var dns = require('dns');

var self = module.exports = {

    validateUrl: function(url){
        try { 
            return Boolean(new URL(url)) 
        }
        catch (error) {
             return false 
        }
    },

    //pegar a url postada, postar no banco de dados, buscar o id desse registro criado e setar na short_url.
    shortenUrl : async(req, res)=>{

        await dbService.createAndSave(req.body.url, function(err, data) {
            if (err) return next(err);

        })
        
        await dbService.setShortUrl(req.body.url, function(err, data){
            if (err) return next(err);
            
            res.json({
                original_url: data.original_url,
                short_url: data.short_url
            })
        })
    },

    redirectToOriginal: (req, res) => {
        let shortenedUrl = req.params.short_url

        dbService.getByShortenedUrl(shortenedUrl, (err, data) => {
            console.log(data)
            if (err) return next(err);
            if (!data) {
                console.log("Missing `done()` argument");
                return next({ message: "Missing callback argument" });
            }

            res.redirect(data.original_url)
        } )
    }
    

}




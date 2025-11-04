const FormData = require("form-data")
const axios = require("axios")

const predict = async(req,res) =>{
    try {
        const formData = new FormData();
        formData.append("file",req.file.buffer,req.file.originalname)
        const response = await axios.post("http://127.0.0.1:8000/predict",formData,{headers:formData.getHeaders()})
        res.json({
            message:"File Uploaded Successfully",
            data:response.data
        })
    } catch (error) {
        res.status(500).json({
            message:"File Upload Failed",
            error:error.message
        })
    }
}

const suggestion = async(req,res)=> {
    try {
        const score = parseFloat(req.params.score);
        const dish = req.params.dish;
        if (score > 0.5) return res.json({message:`Your dish seems to be ${dish}`});
        res.json({message:`Your dish looks similar to a dish like ${dish} . Why not try something new this time?`})
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    predict,
    suggestion
}
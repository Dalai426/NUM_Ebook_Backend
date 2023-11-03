const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const epubSchema = new Schema({
    data:{
        type:Buffer,
        required:true
    }
});
const EPUB = mongoose.model("EPUB", epubSchema);
module.exports=EPUB;

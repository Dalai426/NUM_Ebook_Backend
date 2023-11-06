const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const epubSchema = new Schema({
    data:{
        type:Buffer,
        required:[true,"Өөө, Файл хуулаагүй байна !!!"] 
    },
    name:{
        type:String,
        required:[true, 'Өөө, Номын нэр дутуу байна !!!']
    },
    author:{
        type:String,
        required:[true, 'Өөө, Зохиолчын нэр дутуу байна !!!']
    },
    translated:{
        type:String,
    },
    category:{
        type:String,
        required:[true,'Өөө, Номны төрөл дутуу байна !!!'],
        enum:{
            values:[
                "ТҮҮХ ЁС ЗАНШИЛ",
                "НИЙГЭМ, УЛС ТӨР",
                "ШИНЖЛЭХ УХААН",
                "МОНГОЛЫН УРАН ЗОХИОЛ",
                "ГАДААДЫН УРАН ЗОХИОЛ",
                "БИЗНЕС МАРКЕТИНГ",
                "КОМЬПЮТЕР, ТЕХНИК ТЕХНОЛОГИ",
                "ЭРҮҮЛ МЭНД",
                "ХЭЛ ШИНЖЛЭЛ, ТОЛЬ БИЧИГ",
                "ГАРЫН АВЛАГА",
                "НАМТАР ДУСРАМЖ",
                "ШАШИН, ГҮН УХААН",
                "ЯРУУ НАЙРАГ, СОЁЛ УРЛАГ",
                "ХУВЬ ХҮНИЙ ХӨГЖИЛ",
                "СЭТГҮҮЛ", 
                "ХӨДӨӨ АЖ АХУЙ",
                "АЯЛАЛ ЖУУЛЧЛАЛ", 
                "СПОРТ", 
                "ХООЛ ХҮНС"
            ],
            message:"Өөө, Зөв төрлөө сонгоно жүү !!!"
        }
    },
    images:{
        type:Buffer,
        required:[true,"Өөө, Зураг дутуу байна !!!"] 
    },
    prime:{
        type:Boolean,  
        required:[true,"Өөө, Хандалтын эрх дутуу байна !!!"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
const EPUB = mongoose.model("EPUB", epubSchema);
module.exports=EPUB;

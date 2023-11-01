

const validateNumEmail=async ({email})=>{

    const words=email.split(".");
    if(words[words.length-1]=="mn" && words[words.length-2]=="edu" && words[words.length-3]=="num"){
        return true;
    }
    return false;
}

module.exports = {
    validateNumEmail
};
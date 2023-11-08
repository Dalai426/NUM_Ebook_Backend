class ApiFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {

        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page"];
        removeFields.forEach((el) => delete queryCopy[el]);

        const keyword = this.queryStr.keyword ?
            {
                $or: [
                    { "author": { $regex: this.queryStr.keyword, $options: 'i' } },      // Use /i for case-insensitive matching
                    { "name": { $regex: this.queryStr.keyword, $options: 'i' } },
                    { "translated": { $regex: this.queryStr.keyword, $options: 'i' } }
                ]
            } : 
        queryCopy;
        this.query = this.query.find({ ...keyword });
        return this;
    }

    pagination(resPerPage){
        console.log(this.queryStr)
        let currentPage=Number(this.queryStr.page)||1;
        const skip=resPerPage * (currentPage-1);
        this.query=this.query.limit(resPerPage).skip(skip);
        return this;
    }
}


module.exports = ApiFilters;
const { QuerySql } = require("./query.service")
const showPayment = async()=> {
try {
    const data = await QuerySql('SELECT * FROM payments')
    return data ? data  : null
} catch (error) {
    console.error(error)
    return null
}
}
const createPayment = async(params = [])=> {
try {

    const data = await QuerySql('INSERT INTO payments (order_id  , amount , payment_method ) VALUES (? , ? , ?)' , params);

    return data ? data  : null

    
} catch (error) {
    console.error(error)
    return null
}
}

module.exports = {showPayment , createPayment}
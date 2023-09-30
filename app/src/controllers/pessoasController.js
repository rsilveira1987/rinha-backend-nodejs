const db = require('../db/postgresql');

// POST:
// ==> Método responsável por criar um novo produto:
exports.createPessoa = async (req,res) => {
    const { id, nome, apelido, nascimento, stack } = req.body;

    res.status(201).send({
        'message': 'A new person has been added!'
    });
    
    // const { rows } = await db.query(
    //     "INSERT INTO products (productName, quantity, price) VALUES ($1, $2, $3)",
    //     [product_name, quantity, price]
    // );

    // res.status(201).send({
    //    message: "A new product has been added!",
    //    body: {
    //     product : { product_name, quantity, price }
    //    } 
    // });
};

// // GET:
// // ==> Método responsável por listar todos os 'Products':
// exports.listAllProducts = async (req, res) => {
//     const response = await db.query(
//         "SELECT * FROM products ORDER BY productName ASC"
//     );
//     res.status(200).send(response.rows);
// };

// exports.findProductById = async (req, res) => {
//     const productId = parseInt(req.params.id);
//     const response = await db.query(
//         "SELECT * FROM products WHERE productid = $1",
//         [productId]
//     );
//     res.status(200).send(response.rows);
//     // res.status(200).render('product',{
//     //     products: response.rows
//     // });
// };
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'codinglone',
    password: 'fab3227423',
    port: 5432,
})

const bcrypt = require('bcrypt');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY email ASC', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

const createUser = async(request, response) => {
    const { password, email } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword], (error, results) => {
        if(error){
            throw error;
        }

        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

const updateUser = async(request, response) => {
    const id = parseInt(request.params.id);
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query('UPDATE users SET email=$1, password=$2 WHERE id = $3', [email, hashedPassword, id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).send(`User modified with ID: ${id}`)
    })
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error;
        }

        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const handleLogin = async(request, response) => {
    const { email, password } = request.body;
    if( !email || !password ) return response.status(400).json({  'message': 'Username and password are required'  });

    const foundUser = pool.query(`SELECT * FROM users WHERE email=${email}`);
    if(!foundUser) return response.status(401); //unauthorized

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);


    } catch (error) {
        
    }
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}


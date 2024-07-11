const pool = require('../config/database');

exports.createTodo = async (req, res) => {
    const { user_id, title, description } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)',
            [user_id, title, description]
        );
        const [todo] = await pool.execute('SELECT * FROM todos WHERE id = ?  AND isDeleted = 0', [result.insertId]);
        res.status(201).json(todo[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTodos = async (req, res) => {
    const { user_id, status, page = 1, limit = 10, sort = 'created_at' } = req.query;
    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }
    const offset = (page - 1) * limit;
    try {
        let query = 'SELECT * FROM todos WHERE isDeleted = 0 AND user_id = ?';
        const params = [user_id];
        if (status) {
            query += ' AND status = ? ';
            params.push(status);
        }
        query += ` ORDER BY ${sort} DESC LIMIT ${limit} OFFSET ${offset}`;
        const [todos] = await pool.execute(query, params);
        const [countResult] = await pool.execute('SELECT COUNT(*) AS count FROM todos WHERE user_id = ?  AND isDeleted = 0', [user_id]);
        res.status(200).json({ count: countResult[0].count, todos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const [result] = await pool.execute(
            'UPDATE todos SET title = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [title, description, status, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Todo not found' });
        const [todo] = await pool.execute('SELECT * FROM todos WHERE id = ? AND isDeleted = 0', [id]);
        res.status(200).json(todo[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] =  await pool.execute(
            'UPDATE todos SET isDeleted = 1 WHERE id = ?',
            [id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Todo not found' });
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

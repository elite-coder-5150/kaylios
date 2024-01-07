export const getAllNotesByUser = async (req, res) => {
    try {
        const { user_id } = req.params.user_id;

        const sql = /* sql */`
            select * from notes where user_id = ?
        `;

        const result = await getResults(sql, [user_id]);

        if (result.length === 0) {
            return res.status(404).send({
                message: 'no notes found'
            })
        } else {
            return res.status(200).send({
                message: 'time to eat some shrimps'
            });
        }
    } catch (error) {
         console.error(error);

         res.status(500).send({
            message: 'Internal Server Error',
         })
    }
};

export const getSingleNote = async (req, res) => {
    try {
        const {
            user_id,  title, content, 
            created_at, updated_at
        } = req.body;

        const sql = /* sql *`
            select 
                n.user_id, 
                n.title, 
                n.content, 
                n.created_at, 
                n.updated_at 
            from notes as n
            where n.user_id = ?
        `;

        const results = await getResults(sql, [
            user_id,  title, content, 
            created_at, updated_at
        ]);

        if (!results) {
            return res.status(404).send({
                message: 'note not found',
            });
        }

        return res.status(200).send({
            message: 'successfully retrieved a note',
            data: results
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
};

export const createNote = async (req, res) => {
    try {
        const { 
            user_id,  title, content, 
            created_at, updated_at } = req.body;

        const sql = /* sql */`
            insert into note (user_id, title, content, created_at, updated_at)
            values (?, ?, ?, ?, ?)
        `;

        const results = await getResults(sql, [user_id, title, content, created_at, updated_at]);

        if (results.affectedRows === 0) {
            return res.status(400).send({
                message: 'error executing query'
            });
        }

        res.status(200).send({
            message: 'successfully create note',
            data: results
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { note_id } = req.params.note_id;

        if (!note_id) {
            return res.status(400).send({
                message: 'note id is required'
            });
        }

        const sql = /* sql */`
            update notes
            set note_id = ?, user_id = ?, title = ?, content = ?,
            created_at = ?, updated_at = ?
        `;

        const results = await getResults(sql, [note_id]);

        if (results.affectedRows === 0) {
            return res.status(404).send({
                message: 'note not found'
            });
        }

        return res.status(200).send({
            message: 'note deleted successfully'
        })
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { note_id } = req.params.note_id;

        if (!note_id) {
            return res.status(400).send({
                message: 'note id is required'
            });
        }

        const sql = /* sql */`
            delete from notes where note_id = ?
        `;

        const results = await getResults(sql, [note_id]);

        if (results.affectedRows === 0) {
            return res.status(404).send({
                message: 'note not found'
            });
        }

        return res.status(200).send({
            message: 'note deleted successfully'
        })
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
};
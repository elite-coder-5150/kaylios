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

export const getSingleNotes = async (req, res) => {};

export const createNote = async (req, res) => {};

export const updateNote = async (req, res) => {};

export const deleteNote = async (req, res) => {};
import {commnent}  from "../databse/db.js";
import {randomBytes} from "crypto";

export const CreateComment = (req, res) => {
    const id = randomBytes(4).toString("hex");
  
    const { text } = req.body;
    const { snippetId } = req.params.id;

    const comment = commnent[snippetId] || [];
    comment.push({
        id,
        text,
    });
    commnent[snippetId] = comment;

    return res.status(201).json({
        success: true,
        comment: {id, text},
        message: "Comment added successfully",
})
};

export const getComments = (req, res) => {
    const { snippetId } = req.params.id;
   
    return res.status(200).json(commnent[snippetId] ||[])

}

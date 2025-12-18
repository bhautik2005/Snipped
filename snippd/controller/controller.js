import { Snippet } from "../database/db.js";
import {randomBytes} from "crypto";


export const CreateSnippet = (req, res) => {
    const id = randomBytes(4).toString("hex");

    const { title, code } = req.body;

    //create a new snippet object
     Snippet[id] = {
        id,
        title,
        code,
};
return res.status(201).json({
    success: true,
    Snippet: Snippet[id],
    message: "Snippet created successfully",

})
};


export const getSnippet = (_, res) => {
 
  return res.status(200).json({Snippet
})
}


export const deleteSnippet = (req, res) => {
    const { id } = req.params;
    delete Snippet[id];
    return res.status(200).json({
        success: true,
        message: "Snippet deleted successfully",
    })
}

import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma= new PrismaClient();

app.use(express.json());
app.use(cors());

//defining and API Endpoint
app.get("/api/notes", async(req, res)=>{

    const notes = await prisma.note.findMany();
    res.json({notes});
})

app.post("/api/notes", async(req, res) => {
    const { title, content } = req.body; 

    // if(!title || !content){
    //     return res
    //     .status(400)
    //     .send("title and content fields required");
    // }

    
    try{
        const note = await prisma.note.create({
            data: {title, content}
        })
    
        res.json(note);    

    }catch (error){
        res.status(500).send("Oops Something Went wrong");
    }
    
    app.put("/api/notes/:id", async(req,res) =>{
        const{title, content} = req.body; 
        const id= parseInt(req.params.id); 

        // if(!id || isNaN(id)){
        //     return res.status(400).send("ID must be a valid number"); 
        // }

        // if(!title || !content){
        //     return res
        //     .status(400)
        //     .send("title and content fields required");
        // }

        try{
            const updatedNote = await prisma.note.update({
                where: {id}, 
                data: {title, content}
            })
            res.json(updatedNote);
        }
        catch(error){
            res.status(500).send("Oops, something went wrong");
        }
    })
});

app.delete("/app/notes/:id", async(req, res)=>{
    const id = parseInt(req.params.id);

            // if(!id || isNaN(id)){
        //     return res.status(400).send("ID must be a valid number"); 
        // }

        // if(!title || !content){
        //     return res
        //     .status(400)
        //     .send("title and content fields required");
        // }

        try{
            await prisma.note.delete({
                where: {id}, 
            })
            res.status(204).send();
        }
        catch(error){
            res.status(500).send("Oops, something went wrong");
        }


})


app.listen(5001, ()=>{
    console.log("Server running on localhost:5000");
});

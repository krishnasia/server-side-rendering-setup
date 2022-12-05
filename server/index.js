import { App } from "../src/App";
import path from 'path';
import fs from 'fs';
import React from "react";
import ReactDOMServer from "react-dom/server";
import express from 'express';
import cors from 'cors';
import {StaticRouter} from "react-router-dom/server";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

//Local path
app.use(express.static(path.join(__dirname,'../dist')));
//app.use(express.static(path.join(__dirname,'public')));


app.get('/ssrui/*',(req,res) => {
    const context ={};
    const reactHtml = ReactDOMServer.renderToString(
        <StaticRouter location={{pathname:"/ssrui"}} context={context}>
            <App/>
        </StaticRouter>
    )
    fs.readFile(path.resolve('./public/index.html'),'utf-8',(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).send('some error happned');
        }
        return res.send(data.replace('<div id="root"></div>',`<div id="root">${reactHtml}</div>`));
    });
})

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers',req.header('Access-Control-Request-Headers'))
    next()
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})
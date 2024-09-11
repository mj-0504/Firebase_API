const express = require('express');
const app = express();
const port = 3000;
const db = require('./firebaseadmin');
const bodyparser = require('body-parser');
const {name} = require('ejs');



app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {

    try {
        const snapshot = await db.collection('user').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.render('index', { data:data, updateData: null });
    }
    catch (error) {
        console.error(err);
        console.status(500).send('Error reteriving ');
    }


});

app.post('/add', (req, res) => {
    const data = {

        name: req.body.name,
        email: req.body.email,
        cls: req.body.cls,
        phoneno: req.body.phoneno,
        password: req.body.password
    };

    db.collection('user').add(data).then(() => {
        res.redirect('/');
    })
        .catch((error) => {
            res.send('Error adding data' + error.message);
        });
});

app.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        
        const data =  db.collection('user').doc(id);
        const data1 = (await data.get());


        const snapshot = await db.collection('user').get();
        const fetch = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));



        
            res.render('index', { data:fetch, updateData: data1.data(),myid:id });
         
           
            
           
        
    }
    catch (err) {
        console.error(err);
        res.send("error reteriving ")
    }

});



app.get('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.collection('user').doc(id).delete();

        res.redirect('/');
    }
    catch (error) {
        res.status(404).send("Error deleting ", error);
    }

});

app.post('/rupdate/:id', async (req,res)=>{
    const { id } = req.params;

    const data = {
        name: req.body.name,
        email: req.body.email,
        cls: req.body.cls,
        phoneno: req.body.phoneno,
        password: req.body.password
    };

   
    try{
    
          await db.collection('user').doc(id).update(data);
          res.redirect('/');
    }
    catch(error){
        res.status(500).send("Error updating ");
        
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
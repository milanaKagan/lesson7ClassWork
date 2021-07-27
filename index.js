const express = require('express')
const path = require('path')

const account_repo = require('./account-repo')

const port = 8080

const app = express()

// to server static pages
app.use(express.static(path.join(__dirname, '/')))

// for POST json 
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/account', async(req, res) => {
    const accounts = await  account_repo.getAllAccounts();
    res.status(200).json({ accounts})
});

app.get('/account/:account_id', async(req, res) => {
    const account_id = req.params.account_id
    const account = await account_repo.getAccountById(account_id); 
    res.status(200).json({ account})
});

app.delete('/account/:account_id', async(req, res) => {
    try
    {
        const account_id = req.params.account_id
        const result = await account_repo.deleteAccount(account_id)
        res.status(200).json({
            res: 'success',
            url: `localhost:8080/account/${account_id}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});

app.put('/account/:account_id', async(req, res) => {
    try
    {
        const account_id = req.params.account_id
        account = req.body
        const result = await account_repo.updateAccount(account, account_id)
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/account/${account_id}`,
            result
        })
    
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});

app.post('/account', async (req, res) => {
    try
    {
        account = req.body
        const result = await account_repo.addAccount(account)
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/account/${result[0]}`,
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
})

app.listen(port, () => console.log(`Listening to port ${port}`));
export default function () {

   const code = `
const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

app.get('/contacts/1/edit', (req, res) => {
    res.render('editcontact');
})

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
  console.log(\`Example app listening on port \${port}\`)
})

`;

    return code;
}

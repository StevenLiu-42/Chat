const express = require('express')

const router = express.Router()

router.get("/test", (req, res) => {
  res.send({ msg: "you are amazing!" })
})

module.exports = router
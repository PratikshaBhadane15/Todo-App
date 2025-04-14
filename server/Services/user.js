
const user = [
    {
        userName: "TestUser1",
        password: "12345"
    }
]

const userLogin = (req, res, next) => {

    const reqBody = req.body;
    console.log("reqBody-", reqBody)

    const filterUser = user.filter( user => user.userName === reqBody.userName && user.password === reqBody.password)

    if(filterUser.length > 0)
        res.status(200).json({ login:  true });
    else
        res.status(404).json({ login:  false , message : "Incorrect User Credentials" });
}


module.exports = { userLogin }
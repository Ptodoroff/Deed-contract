const Deed = artifacts.require("Deed");
let deed;

contract ("Deed", (accounts) => {
    beforeEach ( async () => {
        deed= await Deed.deployed();
    })

    it ( "Only the lawyer can transfer funds in case of premature Death", async () =>{

        const initialBalance =  web3.utils.toBN(await web3.eth.getBalance(accounts[1]))

        await deed.suddenDeath({from:accounts[0]})

        const finalBalance = web3.utils.toBN( await web3.eth.getBalance(accounts[1]))

        assert (finalBalance.sub(initialBalance).toNumber()=== 100000)
        
    })
})
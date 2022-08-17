


const Deed = artifacts.require("Deed");
let deed;

contract ("Deed", (accounts) => {
    beforeEach ( async () => {
        deed= await Deed.deployed();

    })

    it ( "Only the lawyer can transfer funds in case of premature Death", async () =>{
        deed = await Deed.new(
            accounts[0], 
            accounts[1], 
            0, 
            {value: 100000}
          );


        const initialBalance =  web3.utils.toBN(await web3.eth.getBalance(accounts[1]))

        await deed.suddenDeath({from:accounts[0]})

        const finalBalance = web3.utils.toBN( await web3.eth.getBalance(accounts[1]))

        assert (finalBalance.sub(initialBalance).toNumber()=== 100000)
        
    })

    it (" Should not withdraw if too early", async ()=>{
        deed = await Deed.new(
            accounts[0], 
            accounts[1], 
            3, 
            {value: 100000}
          );
        try{
        await deed.send_funds();
        }
        catch(error){
            error.message.includes("Funds are still locked");
            return;
        }
        assert(false);
    })

    it ( "should be able to withdraw funds after the set time has passed", async () =>{
        deed = await Deed.new(
            accounts[0], 
            accounts[1], 
            0, 
            {value: 100000}
          );

        const initialBalance =  web3.utils.toBN(await web3.eth.getBalance(accounts[1]))

        await new Promise (resolve => setTimeout(resolve,5000));

        await deed.send_funds({from:accounts[0]});

        const finalBalance = web3.utils.toBN( await web3.eth.getBalance(accounts[1]))

        assert (finalBalance.sub(initialBalance).toNumber()=== 100000)
        
    })
})
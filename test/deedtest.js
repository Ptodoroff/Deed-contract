const Deed = artifacts.require("Deed");
let deed;

contract ("Deed", (accounts) => {
    beforeEach ( async () => {
        deed= await Deed.deployed();
    })

    it ( "Should send funds only when the preset time has passet", async () =>{
        
    })
})
// Load the ethers library from the external source

const script = document.createElement('script');
script.src = 'https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js';
script.type = 'application/javascript';
script.onload = () => {
    // Your code that relies on ethers library
    const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
    provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then((accounts) => {
            signer = provider.getSigner(accounts[0]);
            MoodContract = new ethers.Contract(
                MoodContractAddress,
                MoodContractABI,
                signer
            );
        });
    });
};
document.head.appendChild(script);


// Your code
// Replace the following two values
const MoodContractAddress = '0x764AcD20fcf155eC0fDc4A37E160A20DA79DC14c';
const MoodContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_mood",
                "type": "string"
            }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Currently these two are undefined, we will use Ethers to assign them values
let MoodContract = undefined;
let signer = undefined;



  async function getMood() {
    const mood = await MoodContract.getMood();
    document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
    console.log(mood);
  }
  
  async function setMood() {
    const mood = document.getElementById("mood").value;
    await MoodContract.setMood(mood);
  }
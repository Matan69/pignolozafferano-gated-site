
async function hasNFT() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    "0x9217dA7A278dDB9E99538e645BCD65ba3ddA724e",
    ["function ownerOf(uint256 tokenId) public view returns (address)"],
    provider
  );

  try {
    const owner = await contract.ownerOf(2);
    if (owner.toLowerCase() === account.toLowerCase()) {
      document.getElementById("recipe").style.display = "block";
    } else {
      alert("You do not own the required NFT to view this recipe.");
    }
  } catch (err) {
    console.error(err);
    alert("Error checking token ownership.");
  }
}

window.onload = function () {
  if (typeof window.ethereum !== 'undefined') {
    hasNFT();
  } else {
    alert("Please install MetaMask to access the content.");
  }
};

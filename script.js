const contractAddress = "0x9217dA7A278dDB9E99538e645BCD65ba3ddA724e"; // Tvoj wallet s Manifolda
const tokenId = 1;

async function checkOwnership() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    const contract = new ethers.Contract(
      contractAddress,
      [
        "function balanceOf(address owner) view returns (uint256)",
        "function ownerOf(uint256 tokenId) view returns (address)"
      ],
      provider
    );

    try {
      const balance = await contract.balanceOf(userAddress);
      const owner = await contract.ownerOf(tokenId);

      if (balance.gt(0) || owner.toLowerCase() === userAddress.toLowerCase()) {
        document.getElementById("secret-content").style.display = "block";
      } else {
        document.getElementById("no-access").style.display = "block";
      }
    } catch (error) {
      document.getElementById("no-access").style.display = "block";
    }
  } else {
    alert("Please install MetaMask to access this page.");
  }
}

window.onload = checkOwnership;

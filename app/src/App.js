import server from './server';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

export async function refund(escrowContract, signer) {
  const refundTxn = await escrowContract.connect(signer).refund();
  await refundTxn.wait();
}

export async function toggleActionability(escrowContract, signer) {
  const toggleAction = await escrowContract.connect(signer).toggleActionability();
  await toggleAction.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [currencyType, setCurrencyType] = useState("ETH");
  const [currencyAmt, setCurrencyAmt] = useState("");

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  // TODO: Get escrows stored in array on server!
  useEffect(() => {
    async function getEscrows() {

      const initContracts = await server.get("http://localhost:5000/escrows").then((response) => {
        setEscrows(response.data)
        console.log(response);
      })
      // console.log(initContracts);
      // setEscrows(initContracts);
    }
    getEscrows();
  }, []);

  const handleCurrencyAmtChange = (event) => {
    setCurrencyAmt(event.target.value);
  }

  async function toggleCurrencyType() {
    if (currencyType === "WEI") {
      setCurrencyType("ETH");
      setCurrencyAmt(currencyAmt / 1000000000000000000);
    } else {
      setCurrencyType("WEI");
      setCurrencyAmt(currencyAmt * 1000000000000000000);
    }
  }

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    let tmpValue = document.getElementById('wei').value;

    const value = currencyType === "ETH" ?
      (ethers.BigNumber.from(ethers.utils.parseEther(tmpValue, "ether"))) :
      (ethers.BigNumber.from(tmpValue));

    const escrowContract = await deploy(signer, arbiter, beneficiary, value);

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address + "Approve").className = 'complete';
          document.getElementById(escrowContract.address + "Refund").className = 'invalid';
          document.getElementById(escrowContract.address + "Toggle").classList.add("invalid");
          document.getElementById(escrowContract.address + "Approve").innerText = "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
      handleRefund: async () => {
        escrowContract.on('Refunded', () => {
          document.getElementById(escrowContract.address + "Refund").className = 'complete';
          document.getElementById(escrowContract.address + "Approve").className = 'invalid';
          document.getElementById(escrowContract.address + "Toggle").classList.add("invalid");
          document.getElementById(escrowContract.address + "Refund").innerText = "🗴 It's been refunded!";
        });

        await refund(escrowContract, signer);
      },
      handleToggleActionability: async () => {
        escrowContract.on("ActionabilityChanged", (actionability) => {
          if (actionability) {
            document.getElementById(escrowContract.address + "Approve").classList.remove('disabled');
            document.getElementById(escrowContract.address + "Refund").classList.remove('disabled');
          } else {
            document.getElementById(escrowContract.address + "Approve").classList.add("disabled");
            document.getElementById(escrowContract.address + "Refund").classList.add("disabled");
          }
        });
        await toggleActionability(escrowContract, signer);
      }
    };

    await server.post("http://localhost:5000/escrows", { escrow }).then((response) => {
      // setEscrows(response.data)
      console.log(response);
    })

    setEscrows([...escrows, escrow]);
  }

  return (
    <div className="appContainer">
      <div className="contract">
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (<span className="currencyType" onClick={(e) => {
            e.preventDefault();
            // TODO: change "in Wei" to "in ETH"
            toggleCurrencyType();

          }}>in {currencyType}</span>)
          <input type="text" id="wei" onChange={handleCurrencyAmtChange} value={currencyAmt} />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

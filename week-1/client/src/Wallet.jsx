import server from "./server";
import {getAddressFromPk} from './shared/utils/keys';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  function calculateAddress(evt) {
    const pk = (evt.target.value || '').replace('0x', '');
    setPrivateKey(pk);
    if (pk) {
      const addrr = getAddressFromPk(pk, true);
      setAddress(addrr);
      refreshBalance(addrr)
    }
  }
  async function refreshBalance(addrr) {
    if (addrr) {
      const {
        data: { balance },
      } = await server.get(`balance/${addrr}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Private key
        <input placeholder="Type your PK" onChange={calculateAddress}></input>
      </label>
      <label>
        Wallet Address
        <input disabled value={address} ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

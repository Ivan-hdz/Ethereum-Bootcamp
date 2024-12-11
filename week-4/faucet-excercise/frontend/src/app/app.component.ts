import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ethers } from 'ethers';
import faucetContractArtifact from './shared/contracts/Faucet/Faucet.json';
import faucetAddrrJson from './shared/contracts/Faucet/Faucet.addr.json';
import { Faucet } from './shared/contracts/types';
import { ErrorDecoder } from 'ethers-decode-error';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'faucet-example';
  address = '';
  amount = '';
  error = '';
  success = false;
  loading = false;

  async requestEth() {
    this.success = false;
    this.error = '';
    this.loading = true;
    try {
      const jsonRPCProvider = new ethers.JsonRpcProvider(
        'http://127.0.0.1:8545/'
      );
      const signer = await jsonRPCProvider.getSigner();
      const faucetContract = new ethers.BaseContract(
        faucetAddrrJson.address,
        faucetContractArtifact.abi
      ) as Faucet;

      if (ethers.isAddress(this.address) && this.amount) {
        const txResp = await faucetContract
          .connect(signer)
          .requestEther(this.address, ethers.parseEther(this.amount));
        await txResp.wait();
        this.success = true;
      } else {
        this.error = 'Invalid inputs';
        this.success = false;
      }
    } catch (e) {
      const errorDecoder = ErrorDecoder.create([faucetContractArtifact.abi]);
      this.error = (await (await errorDecoder.decode(e)).reason) ?? '';
      this.success = false;
    } finally {
      this.loading = false;
    }
  }
}

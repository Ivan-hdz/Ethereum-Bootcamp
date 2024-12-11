/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { Faucet, FaucetInterface } from "../Faucet";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "balance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
    ],
    name: "requestEther",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b506103b68061001f6000396000f3fe60806040526004361061002d5760003560e01c8063b69ef8a814610039578063cb5cc8f21461006457610034565b3661003457005b600080fd5b34801561004557600080fd5b5061004e61008d565b60405161005b9190610187565b60405180910390f35b34801561007057600080fd5b5061008b60048036038101906100869190610231565b610095565b005b600047905090565b670de0b6b3a76400008111156100e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100d7906102f4565b60405180910390fd5b47811115610123576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161011a90610360565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610169573d6000803e3d6000fd5b505050565b6000819050919050565b6101818161016e565b82525050565b600060208201905061019c6000830184610178565b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101d2826101a7565b9050919050565b6101e2816101c7565b81146101ed57600080fd5b50565b6000813590506101ff816101d9565b92915050565b61020e8161016e565b811461021957600080fd5b50565b60008135905061022b81610205565b92915050565b60008060408385031215610248576102476101a2565b5b6000610256858286016101f0565b92505060206102678582860161021c565b9150509250929050565b600082825260208201905092915050565b7f4d6178207175616e7469747920706572207472616e73616374696f6e2072656160008201527f6368656400000000000000000000000000000000000000000000000000000000602082015250565b60006102de602483610271565b91506102e982610282565b604082019050919050565b6000602082019050818103600083015261030d816102d1565b9050919050565b7f496e73756666696369656e742062616c616e636520696e20636f6e7472616374600082015250565b600061034a602083610271565b915061035582610314565b602082019050919050565b600060208201905081810360008301526103798161033d565b905091905056fea264697066735822122079282235bc152d7639ca396bb0a45d6256e389917ab9706d0ae59dd36b0f373664736f6c634300081c0033";

type FaucetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FaucetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Faucet__factory extends ContractFactory {
  constructor(...args: FaucetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Faucet & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Faucet__factory {
    return super.connect(runner) as Faucet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FaucetInterface {
    return new Interface(_abi) as FaucetInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Faucet {
    return new Contract(address, _abi, runner) as unknown as Faucet;
  }
}

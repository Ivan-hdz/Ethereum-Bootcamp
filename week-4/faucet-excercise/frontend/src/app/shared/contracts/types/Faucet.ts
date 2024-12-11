/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface FaucetInterface extends Interface {
  getFunction(nameOrSignature: "balance" | "requestEther"): FunctionFragment;

  encodeFunctionData(functionFragment: "balance", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "requestEther",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "balance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "requestEther",
    data: BytesLike
  ): Result;
}

export interface Faucet extends BaseContract {
  connect(runner?: ContractRunner | null): Faucet;
  waitForDeployment(): Promise<this>;

  interface: FaucetInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  balance: TypedContractMethod<[], [bigint], "view">;

  requestEther: TypedContractMethod<
    [to: AddressLike, _quantity: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "balance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "requestEther"
  ): TypedContractMethod<
    [to: AddressLike, _quantity: BigNumberish],
    [void],
    "nonpayable"
  >;

  filters: {};
}

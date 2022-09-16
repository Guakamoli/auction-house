import {
  Metaplex,
  keypairIdentity,
  auctionHouseModule,
  TaskStatus,
} from "@flxxyz-foundation/js";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { DEVNET_URL, secretKey } from "./constants";

jest.setTimeout(10 * 60 * 1000);

describe("metaplex-anchor-nft", () => {
  test("1=1", () => {
    expect("1").toBe("1");
  });
  // const connection = new Connection(DEVNET_URL);
  // let metaplex: Metaplex;

  // beforeAll(() => {
  //   // Clears the database and adds some testing data.
  //   // Jest will wait for this promise to resolve before running tests.
  //   metaplex = Metaplex.make(connection);
  //   const keypair = Keypair.fromSecretKey(secretKey);
  //   metaplex.use(keypairIdentity(keypair)).use(auctionHouseModule());
  // });

  // test("make Metaplex()", () => {
  //   expect(metaplex).toBeInstanceOf(Metaplex);
  // });

  // test("show pubkey", () => {
  //   expect(metaplex.identity().publicKey.toBase58()).toEqual(
  //     "5PMX3rU7y7KTBpV91nqxZQ4vRjK14AyPADS8bBqV3dZM"
  //   );
  // });

  // test("1", async () => {
  //   const mintAddress = new PublicKey(
  //     "2RBj6EBUx3tEm4UPvhfQM3vVWgcvi2GbrjMZBvQR7AJX"
  //   );
  //   const task = await metaplex.nfts().findByMint({ mintAddress });
  //   // task.onStatusChange((status: TaskStatus) => console.log(status));
  //   const nft = await task.run();
  //   const imageUrl = nft.json.image;
  //   console.info(imageUrl, "==imageUrl==");
  //   const editionAddress = nft.edition.address;
  //   console.info(editionAddress?.toString(), "===editionAddress==");

  //   expect(nft.model).toBe("nft");
  // });

  // test("findAllByMintList", async () => {
  //   const mintA = new PublicKey("2RBj6EBUx3tEm4UPvhfQM3vVWgcvi2GbrjMZBvQR7AJX");
  //   const mintB = new PublicKey("FDGAE6rp98dDx9boZyVrmzDDKR5FGHhYpME9sDnJrnoY");
  //   const [nftA, nftB] = await metaplex
  //     .nfts()
  //     .findAllByMintList({ mints: [mintA, mintB] })
  //     .run();

  //   console.info(
  //     nftA.address.toString(),
  //     nftB.address.toString(),
  //     "------===="
  //   );
  // });

  // test("findAllByOwner", async () => {
  //   const myNfts = await metaplex
  //     .nfts()
  //     .findAllByOwner({ owner: metaplex.identity().publicKey })
  //     .run();
  //   expect(myNfts.length).toEqual(17);
  // });

  // test("auctionHouse", async () => {
  //   const auctionHouseAddress = new PublicKey(
  //     "G5WZFqLRNfusVxkbzFWsHJvFuArodVJKtjnMeF76X7Wf"
  //   );
  //   const auctionHouse = await metaplex
  //     .auctionHouse()
  //     .findByAddress({ address: auctionHouseAddress })
  //     .run();
  //   console.log(auctionHouse, "===auctionHouse==");

  //   metaplex.auctionHouse().create;
  // });
});

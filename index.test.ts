import {
  Metaplex,
  keypairIdentity,
  auctionHouseModule,
  candyMachineModule,
  mockStorage,
  toMetaplexFile,
  toMetaplexFileFromJson,
  sol,
} from "@flxxyz-foundation/js";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { DEVNET_URL, secretKey } from "./constants";
import * as fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";
import { randomUUID } from "crypto";

jest.setTimeout(10 * 60 * 1000);

describe("xian start", () => {
  let metaplex: Metaplex;
  const auctionHouseKeypair = Keypair.fromSecretKey(secretKey);
  let nftAccountKeyPair: Keypair;
  let uploadNft: Object;

  beforeAll(() => {
    const connection = new Connection(DEVNET_URL);
    // Clears the database and adds some testing data.
    // Jest will wait for this promise to resolve before running tests.
    metaplex = Metaplex.make(connection);
    metaplex.use(auctionHouseModule()).use(mockStorage());
  });

  test("创建nft持有者", async () => {
    nftAccountKeyPair = Keypair.generate();
    metaplex.use(keypairIdentity(nftAccountKeyPair));

    const publicKey = metaplex.identity().publicKey;
    const address = publicKey.toBase58();
    const pubkey = publicKey.toString();
    console.log(address, pubkey);

    await metaplex.rpc().airdrop(publicKey, sol(1));
    const balance = await metaplex.rpc().getBalance(publicKey);
    console.log("------- balance: ", balance.basisPoints.toString());

    // const options: any = {};
    // console.log(
    //   process.env.HTTPS_PROXY,
    //   process.env.HTTP_PROXY,
    //   "process.env.HTTPS_PROXY || process.env.HTTP_PROXY"
    // );
    // if (process.env.HTTPS_PROXY || process.env.HTTP_PROXY) {
    //   options.agent = new HttpsProxyAgent(
    //     process.env.HTTPS_PROXY || process.env.HTTP_PROXY
    //   );
    // }

    // await fetch("https://api.devnet.solana.com/", {
    //   ...options,
    //   method: "POST",
    //   headers: {
    //     "user-agent":
    //       "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: randomUUID(),
    //     jsonrpc: "2.0",
    //     method: "requestAirdrop",
    //     params: [address, 2],
    //   }),
    // });
    expect(address).not.toBeNull();
    expect(pubkey).not.toBeNull();
    expect(address).not.toBeUndefined();
    expect(pubkey).not.toBeUndefined();
  });

  test("上传nft元数据", async () => {
    // 准备原数据
    uploadNft = await metaplex
      .nfts()
      .uploadMetadata({
        name: "My NFT",
        description: "My description No. 1",
        image: toMetaplexFileFromJson({ name: "No. 1" }, "1.json", {
          displayName: "A Nice Title For My File", // Defaults to the filename.
          uniqueName: "my-company/files/some-identifier", // Defaults to a random string.
          contentType: "application/json", // Infer it from filename by default.
          extension: "json", // Infer it from filename by default.
          tags: [{ name: "my-tag", value: "some-value" }], // Defaults to [].
        }),
      })
      .run();
    console.log(uploadNft);

    expect(uploadNft.metadata.name).toEqual("My NFT");
  });

  test("创建NFT", async () => {
    console.info(metaplex.identity().publicKey.toString());

    const nft = await metaplex
      .nfts()
      .create({
        uri: uploadNft.uri,
        name: "My NFT",
        sellerFeeBasisPoints: 500,
      })
      .run();

    console.log(nft, nft.mintAddress.toString(), "nft");
    expect(nft).not.toBeNull();
  });

  test("将NFT上架至拍卖场", () => {});
});

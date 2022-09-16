import { Metaplex, keypairIdentity, auctionHouseModule } from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { DEVNET_URL, secretKey } from "./constants";

jest.setTimeout(10 * 60 * 1000);

describe('metaplex-anchor-nft', () => {
  const connection = new Connection(DEVNET_URL);
  let metaplex: Metaplex;

  test('make Metaplex()', () => {
    metaplex = Metaplex.make(connection);
    const keypair = Keypair.fromSecretKey(secretKey);
    metaplex.use(keypairIdentity(keypair))
      .use(auctionHouseModule());
    expect(metaplex).toBeInstanceOf(Metaplex);
  });

  test('show pubkey', () => {
    expect(metaplex.identity().publicKey.toBase58()).toEqual('7mzxFYbKPwJqgwUxwC8QNM4MpMG3Xp3sUYkX6u2P5fZ');
  });

  test('1', async () => {
    const mintAddress = new PublicKey('2RBj6EBUx3tEm4UPvhfQM3vVWgcvi2GbrjMZBvQR7AJX');
    const nft = await metaplex.nfts().findByMint({ mintAddress }).run();
    expect(nft.model).toBe('nft')
  });

  test('2', async () => {
    const mintAddress = new PublicKey('2RBj6EBUx3tEm4UPvhfQM3vVWgcvi2GbrjMZBvQR7AJX');
    console.log(metaplex)
    // metaplex.auctions().createAuctionHouse({sellerFeeBasisPoints: 1}).run();
  })
});

// generated from MatterCodex in https://github.com/WebOfTrust/keripy/blob/development/src/keri/core/coring.py

import { TypeSelector, type, selector } from "./TypeSelector.js";

export const Matter = new class extends TypeSelector {
    get [type]() { return MatterType; }
    get [selector]() { return MatterSelector; }
    Ed25519_Seed = "Ed25519_Seed";
    Ed25519N = "Ed25519N";
    X25519 = "X25519";
    Ed25519 = "Ed25519";
    Blake3_256 = "Blake3_256";
    Blake2b_256 = "Blake2b_256";
    Blake2s_256 = "Blake2s_256";
    SHA3_256 = "SHA3_256";
    SHA2_256 = "SHA2_256";
    ECDSA_256k1_Seed = "ECDSA_256k1_Seed";
    Ed448_Seed = "Ed448_Seed";
    X448 = "X448";
    Short = "Short";
    Big = "Big";
    X25519_Private = "X25519_Private";
    X25519_Cipher_Seed = "X25519_Cipher_Seed";
    Salt_128 = "Salt_128";
    Ed25519_Sig = "Ed25519_Sig";
    ECDSA_256k1_Sig = "ECDSA_256k1_Sig";
    Blake3_512 = "Blake3_512";
    Blake2b_512 = "Blake2b_512";
    SHA3_512 = "SHA3_512";
    SHA2_512 = "SHA2_512";
    Long = "Long";
    ECDSA_256k1N = "ECDSA_256k1N";
    ECDSA_256k1 = "ECDSA_256k1";
    Ed448N = "Ed448N";
    Ed448 = "Ed448";
    Ed448_Sig = "Ed448_Sig";
    Tern = "Tern";
    DateTime = "DateTime";
    X25519_Cipher_Salt = "X25519_Cipher_Salt";
    TBD1 = "TBD1";
    TBD2 = "TBD2";
    StrB64_L0 = "StrB64_L0";
    StrB64_L1 = "StrB64_L1";
    StrB64_L2 = "StrB64_L2";
    StrB64_Big_L0 = "StrB64_Big_L0";
    StrB64_Big_L1 = "StrB64_Big_L1";
    StrB64_Big_L2 = "StrB64_Big_L2";
    Bytes_L0 = "Bytes_L0";
    Bytes_L1 = "Bytes_L1";
    Bytes_L2 = "Bytes_L2";
    Bytes_Big_L0 = "Bytes_Big_L0";
    Bytes_Big_L1 = "Bytes_Big_L1";
    Bytes_Big_L2 = "Bytes_Big_L2";
}
Object.freeze(Matter);

export const MatterType = {
    [Matter.Ed25519_Seed]: "A",
    [Matter.Ed25519N]: "B",
    [Matter.X25519]: "C",
    [Matter.Ed25519]: "D",
    [Matter.Blake3_256]: "E",
    [Matter.Blake2b_256]: "F",
    [Matter.Blake2s_256]: "G",
    [Matter.SHA3_256]: "H",
    [Matter.SHA2_256]: "I",
    [Matter.ECDSA_256k1_Seed]: "J",
    [Matter.Ed448_Seed]: "K",
    [Matter.X448]: "L",
    [Matter.Short]: "M",
    [Matter.Big]: "N",
    [Matter.X25519_Private]: "O",
    [Matter.X25519_Cipher_Seed]: "P",
    [Matter.Salt_128]: "0A",
    [Matter.Ed25519_Sig]: "0B",
    [Matter.ECDSA_256k1_Sig]: "0C",
    [Matter.Blake3_512]: "0D",
    [Matter.Blake2b_512]: "0E",
    [Matter.SHA3_512]: "0F",
    [Matter.SHA2_512]: "0G",
    [Matter.Long]: "0H",
    [Matter.ECDSA_256k1N]: "1AAA",
    [Matter.ECDSA_256k1]: "1AAB",
    [Matter.Ed448N]: "1AAC",
    [Matter.Ed448]: "1AAD",
    [Matter.Ed448_Sig]: "1AAE",
    [Matter.Tern]: "1AAF",
    [Matter.DateTime]: "1AAG",
    [Matter.X25519_Cipher_Salt]: "1AAH",
    [Matter.TBD1]: "2AAA",
    [Matter.TBD2]: "3AAA",
    [Matter.StrB64_L0]: "4A",
    [Matter.StrB64_L1]: "5A",
    [Matter.StrB64_L2]: "6A",
    [Matter.StrB64_Big_L0]: "7AAA",
    [Matter.StrB64_Big_L1]: "8AAA",
    [Matter.StrB64_Big_L2]: "9AAA",
    [Matter.Bytes_L0]: "4B",
    [Matter.Bytes_L1]: "5B",
    [Matter.Bytes_L2]: "6B",
    [Matter.Bytes_Big_L0]: "7AAB",
    [Matter.Bytes_Big_L1]: "8AAB",
    [Matter.Bytes_Big_L2]: "9AAB",
}
Object.freeze(MatterType);

export const MatterSelector = {
    [MatterType.Ed25519_Seed]: Matter.Ed25519_Seed,
    [MatterType.Ed25519N]: Matter.Ed25519N,
    [MatterType.X25519]: Matter.X25519,
    [MatterType.Ed25519]: Matter.Ed25519,
    [MatterType.Blake3_256]: Matter.Blake3_256,
    [MatterType.Blake2b_256]: Matter.Blake2b_256,
    [MatterType.Blake2s_256]: Matter.Blake2s_256,
    [MatterType.SHA3_256]: Matter.SHA3_256,
    [MatterType.SHA2_256]: Matter.SHA2_256,
    [MatterType.ECDSA_256k1_Seed]: Matter.ECDSA_256k1_Seed,
    [MatterType.Ed448_Seed]: Matter.Ed448_Seed,
    [MatterType.X448]: Matter.X448,
    [MatterType.Short]: Matter.Short,
    [MatterType.Big]: Matter.Big,
    [MatterType.X25519_Private]: Matter.X25519_Private,
    [MatterType.X25519_Cipher_Seed]: Matter.X25519_Cipher_Seed,
    [MatterType.Salt_128]: Matter.Salt_128,
    [MatterType.Ed25519_Sig]: Matter.Ed25519_Sig,
    [MatterType.ECDSA_256k1_Sig]: Matter.ECDSA_256k1_Sig,
    [MatterType.Blake3_512]: Matter.Blake3_512,
    [MatterType.Blake2b_512]: Matter.Blake2b_512,
    [MatterType.SHA3_512]: Matter.SHA3_512,
    [MatterType.SHA2_512]: Matter.SHA2_512,
    [MatterType.Long]: Matter.Long,
    [MatterType.ECDSA_256k1N]: Matter.ECDSA_256k1N,
    [MatterType.ECDSA_256k1]: Matter.ECDSA_256k1,
    [MatterType.Ed448N]: Matter.Ed448N,
    [MatterType.Ed448]: Matter.Ed448,
    [MatterType.Ed448_Sig]: Matter.Ed448_Sig,
    [MatterType.Tern]: Matter.Tern,
    [MatterType.DateTime]: Matter.DateTime,
    [MatterType.X25519_Cipher_Salt]: Matter.X25519_Cipher_Salt,
    [MatterType.TBD1]: Matter.TBD1,
    [MatterType.TBD2]: Matter.TBD2,
    [MatterType.StrB64_L0]: Matter.StrB64_L0,
    [MatterType.StrB64_L1]: Matter.StrB64_L1,
    [MatterType.StrB64_L2]: Matter.StrB64_L2,
    [MatterType.StrB64_Big_L0]: Matter.StrB64_Big_L0,
    [MatterType.StrB64_Big_L1]: Matter.StrB64_Big_L1,
    [MatterType.StrB64_Big_L2]: Matter.StrB64_Big_L2,
    [MatterType.Bytes_L0]: Matter.Bytes_L0,
    [MatterType.Bytes_L1]: Matter.Bytes_L1,
    [MatterType.Bytes_L2]: Matter.Bytes_L2,
    [MatterType.Bytes_Big_L0]: Matter.Bytes_Big_L0,
    [MatterType.Bytes_Big_L1]: Matter.Bytes_Big_L1,
    [MatterType.Bytes_Big_L2]: Matter.Bytes_Big_L2,
}
Object.freeze(MatterSelector);

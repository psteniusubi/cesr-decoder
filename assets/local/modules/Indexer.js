// generated from IndexerCodex in https://github.com/WebOfTrust/keripy/blob/development/src/keri/core/coring.py

import { TypeSelector, type, selector } from "./TypeSelector.js";

export const Indexer = new class extends TypeSelector {
    get [type]() { return IndexerType; }
    get [selector]() { return IndexerSelector; }
    Ed25519_Sig = "Ed25519_Sig";
    Ed25519_Crt_Sig = "Ed25519_Crt_Sig";
    ECDSA_256k1_Sig = "ECDSA_256k1_Sig";
    ECDSA_256k1_Crt_Sig = "ECDSA_256k1_Crt_Sig";
    Ed448_Sig = "Ed448_Sig";
    Ed448_Crt_Sig = "Ed448_Crt_Sig";
    Ed25519_Big_Sig = "Ed25519_Big_Sig";
    Ed25519_Big_Crt_Sig = "Ed25519_Big_Crt_Sig";
    ECDSA_256k1_Big_Sig = "ECDSA_256k1_Big_Sig";
    ECDSA_256k1_Big_Crt_Sig = "ECDSA_256k1_Big_Crt_Sig";
    Ed448_Big_Sig = "Ed448_Big_Sig";
    Ed448_Big_Crt_Sig = "Ed448_Big_Crt_Sig";
    TBD0 = "TBD0";
    TBD1 = "TBD1";
    TBD4 = "TBD4";
}
Object.freeze(Indexer);

export const IndexerType = {
    [Indexer.Ed25519_Sig]: "A",
    [Indexer.Ed25519_Crt_Sig]: "B",
    [Indexer.ECDSA_256k1_Sig]: "C",
    [Indexer.ECDSA_256k1_Crt_Sig]: "D",
    [Indexer.Ed448_Sig]: "0A",
    [Indexer.Ed448_Crt_Sig]: "0B",
    [Indexer.Ed25519_Big_Sig]: "2A",
    [Indexer.Ed25519_Big_Crt_Sig]: "2B",
    [Indexer.ECDSA_256k1_Big_Sig]: "2C",
    [Indexer.ECDSA_256k1_Big_Crt_Sig]: "2D",
    [Indexer.Ed448_Big_Sig]: "3A",
    [Indexer.Ed448_Big_Crt_Sig]: "3B",
    [Indexer.TBD0]: "0z",
    [Indexer.TBD1]: "1z",
    [Indexer.TBD4]: "4z",
}
Object.freeze(IndexerType);

export const IndexerSelector = {
    [IndexerType.Ed25519_Sig]: Indexer.Ed25519_Sig,
    [IndexerType.Ed25519_Crt_Sig]: Indexer.Ed25519_Crt_Sig,
    [IndexerType.ECDSA_256k1_Sig]: Indexer.ECDSA_256k1_Sig,
    [IndexerType.ECDSA_256k1_Crt_Sig]: Indexer.ECDSA_256k1_Crt_Sig,
    [IndexerType.Ed448_Sig]: Indexer.Ed448_Sig,
    [IndexerType.Ed448_Crt_Sig]: Indexer.Ed448_Crt_Sig,
    [IndexerType.Ed25519_Big_Sig]: Indexer.Ed25519_Big_Sig,
    [IndexerType.Ed25519_Big_Crt_Sig]: Indexer.Ed25519_Big_Crt_Sig,
    [IndexerType.ECDSA_256k1_Big_Sig]: Indexer.ECDSA_256k1_Big_Sig,
    [IndexerType.ECDSA_256k1_Big_Crt_Sig]: Indexer.ECDSA_256k1_Big_Crt_Sig,
    [IndexerType.Ed448_Big_Sig]: Indexer.Ed448_Big_Sig,
    [IndexerType.Ed448_Big_Crt_Sig]: Indexer.Ed448_Big_Crt_Sig,
    [IndexerType.TBD0]: Indexer.TBD0,
    [IndexerType.TBD1]: Indexer.TBD1,
    [IndexerType.TBD4]: Indexer.TBD4,
}
Object.freeze(IndexerSelector);

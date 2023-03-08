// generated from CounterCodex in https://github.com/WebOfTrust/keripy/blob/development/src/keri/core/coring.py

import { TypeSelector, type, selector } from "./TypeSelector.js";

export const Counter = new class extends TypeSelector {
    get [type]() { return CounterType; }
    get [selector]() { return CounterSelector; }
    ControllerIdxSigs = "ControllerIdxSigs";
    WitnessIdxSigs = "WitnessIdxSigs";
    NonTransReceiptCouples = "NonTransReceiptCouples";
    TransReceiptQuadruples = "TransReceiptQuadruples";
    FirstSeenReplayCouples = "FirstSeenReplayCouples";
    TransIdxSigGroups = "TransIdxSigGroups";
    SealSourceCouples = "SealSourceCouples";
    TransLastIdxSigGroups = "TransLastIdxSigGroups";
    SealSourceTriples = "SealSourceTriples";
    SadPathSig = "SadPathSig";
    SadPathSigGroup = "SadPathSigGroup";
    PathedMaterialQuadlets = "PathedMaterialQuadlets";
    AttachedMaterialQuadlets = "AttachedMaterialQuadlets";
    BigAttachedMaterialQuadlets = "BigAttachedMaterialQuadlets";
    KERIProtocolStack = "KERIProtocolStack";
}
Object.freeze(Counter);

export const CounterType = {
    [Counter.ControllerIdxSigs]: "-A",
    [Counter.WitnessIdxSigs]: "-B",
    [Counter.NonTransReceiptCouples]: "-C",
    [Counter.TransReceiptQuadruples]: "-D",
    [Counter.FirstSeenReplayCouples]: "-E",
    [Counter.TransIdxSigGroups]: "-F",
    [Counter.SealSourceCouples]: "-G",
    [Counter.TransLastIdxSigGroups]: "-H",
    [Counter.SealSourceTriples]: "-I",
    [Counter.SadPathSig]: "-J",
    [Counter.SadPathSigGroup]: "-K",
    [Counter.PathedMaterialQuadlets]: "-L",
    [Counter.AttachedMaterialQuadlets]: "-V",
    [Counter.BigAttachedMaterialQuadlets]: "-0V",
    [Counter.KERIProtocolStack]: "--AAA",
}
Object.freeze(CounterType);

export const CounterSelector = {
    [CounterType.ControllerIdxSigs]: Counter.ControllerIdxSigs,
    [CounterType.WitnessIdxSigs]: Counter.WitnessIdxSigs,
    [CounterType.NonTransReceiptCouples]: Counter.NonTransReceiptCouples,
    [CounterType.TransReceiptQuadruples]: Counter.TransReceiptQuadruples,
    [CounterType.FirstSeenReplayCouples]: Counter.FirstSeenReplayCouples,
    [CounterType.TransIdxSigGroups]: Counter.TransIdxSigGroups,
    [CounterType.SealSourceCouples]: Counter.SealSourceCouples,
    [CounterType.TransLastIdxSigGroups]: Counter.TransLastIdxSigGroups,
    [CounterType.SealSourceTriples]: Counter.SealSourceTriples,
    [CounterType.SadPathSig]: Counter.SadPathSig,
    [CounterType.SadPathSigGroup]: Counter.SadPathSigGroup,
    [CounterType.PathedMaterialQuadlets]: Counter.PathedMaterialQuadlets,
    [CounterType.AttachedMaterialQuadlets]: Counter.AttachedMaterialQuadlets,
    [CounterType.BigAttachedMaterialQuadlets]: Counter.BigAttachedMaterialQuadlets,
    [CounterType.KERIProtocolStack]: Counter.KERIProtocolStack,
}
Object.freeze(CounterSelector);

# CESR decoder

Browser based [CESR decoder app](https://psteniusubi.github.io/cesr-decoder/) implemented in javascript. The purpose of this app is to visualize CESR streams and values. I have found this useful when learning how CESR works.

This implementation is based on following specifications 

* https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html
* https://weboftrust.github.io/ietf-cesr-proof/draft-pfeairheller-cesr-proof.html
* https://trustoverip.github.io/tswg-acdc-specification/draft-ssmith-acdc.html

Note! This app may fail to recognize some latest CESR codes already implemented in [keripy](https://github.com/WebOfTrust/keripy) but that haven't been added to the spec.

## Usage

1. Navigate to https://psteniusubi.github.io/cesr-decoder/
2. Paste CESR text into textbox 
3. Check Interleaved if CESR text is stream content
4. Click Decode

## Sample CESR content

Top of the page has a number of links to previously recorded CESR streams. Click on the link to see the CESR stream decoded.

### From public sources

* gleif-witness.cesr
    * GLEIF Root AID from https://gleif-it.github.io/.well-known/keri/oobi/EDP1vHcw_wc4M__Fj53-cJaBnZZASd-aMTaSyWEQ-PC2
    * `curl http://5.161.69.25:5623/oobi/EDP1vHcw_wc4M__Fj53-cJaBnZZASd-aMTaSyWEQ-PC2/witness`

### From development environment

* root-gar-witness.cesr
    * Root AID 
    * `curl http://localhost:5642/oobi/EOrY4RvOFobQABrEXfs-aeLm6g16SvTxuLXny7L7tRsr/witness/BBD-O2WpLl_Hj0H-SXQ304ih90p64myHJvONeACSfV3L`
* external-gar-witness.cesr
    * External GAR AID 
    * `curl http://localhost:5642/oobi/ECEGsrEr76cDQCdIUHbsO39sI_0WFTbbfdMB0O2LHLyD/witness/BBD-O2WpLl_Hj0H-SXQ304ih90p64myHJvONeACSfV3L`
* qvi-vc.cesr
    * QVI credential issued by External Root to QVI
    * `kli vc export --said EN0PX0BxkYvdx9zdidmjEcswQFNIGFsv5RJ87XUcaui5 --full`
* vlei-vc.cesr
    * vLEI credential issued by QVI to Legal Entity
    * `kli vc export --said EIZr1Ehn41dbGRMD-_B7gZsSZnZwMR3dffMzqEMvfzOr --full`
* ecr-vc.cesr
    * ECR credential issued by Legal Entity to individual
    * `kli vc export --said EJmXcc0-50VW1gHgFgBf5_mlMGdcp12psvuUfxb2CsGK --full`
* oorauth-vc.cesr
    * OOR authorization credential issued by Legal Entity to QVI
    * `kli vc export --said ENc0tif7Pkdikih4zZWTIA3WFM_gIOxhVlkrMTMMIACt --full`
* oor-vc.cesr
    * OOR credential issued by QVI to individual
    * `kli vc export --said EKVOy7xgTvSl2YXqi3s-OfQPm5tIC3AlD8VMTdNaNVZ_ --full`


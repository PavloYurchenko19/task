import React, {useState} from 'react';
import {createAlchemyWeb3} from "@alch/alchemy-web3";
import {Button, Input} from "@mui/material";

import baseURL, {urls} from "../../config/urls";
import style from './Form.module.css'

const Form = () => {

    const [wallet, setWallet] = useState('')
    const [nfts, setNfts] = useState(null)
    const getNfts = async (walletAddress) => {

        const web3 = createAlchemyWeb3(baseURL + urls.apiKey);
        const {ownedNfts} = await web3.alchemy.getNfts({owner: walletAddress})
        setNfts(ownedNfts.filter((nft) => !nft.error))
    }

    return (
        <div className={style.mainBox}>
            <div className={style.form}>

                <Input className={style.input} onChange={(e) => {
                    setWallet(e.target.value)
                }} type="text" name={'wallet'} placeholder={'Wallet key'} value={wallet}/>
                <Button variant={'outlined'} onClick={() => {
                    getNfts(wallet)
                }}>Find nfts</Button>

            </div>
            <div className={style.nftsBox}>

                {nfts && (nfts.map((nft) => (<div className={style.nftBox} key={nft.id.tokenID}>
                        <div className={style.imgBox}>
                            {nft.metadata.image.startsWith("ipfs") ? <img
                                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1CanFB2mBrMwI8ZuhI05XUHWz69wAY-fRA&usqp=CAU'}
                                    alt={nft.metadata.name}/>
                                : <img src={nft.metadata.image} alt={nft.metadata.name}/>

                            }
                        </div>
                        <h2>{nft.metadata.name}</h2>
                        <p>{nft.metadata.description}</p>
                    </div>))
                )}
            </div>
        </div>
    );
};

export {Form};

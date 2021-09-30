// import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import {NF, copyToClipboard} from '../util';
import Metamask from '../connectors/v2';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
    .custom_table {
        &.custom_table_style {
            border-collapse: separate;
            border-spacing: 10px;
            tr {
                td {
                    background: #393e4f;
                    &:first-of-type {
                        border-radius: 25px 0 0 25px;
                    }
                    &:last-of-type {
                        border-radius: 0 25px 25px 0;
                    }
                }
            }
        }
    }
    .warning-number{
        font-weight:bold;
        color:#D20807;
    }
`
function Section_13(props) {
	const L = useSelector(state => state.contract.L);
    const contractAddress = Metamask.contract;
	let contract = useSelector(state => state.contract);
    return (
        <Section className="py-3">
            <div className="content_wrapper p-0 p-md-5">
                <OverPack always={false}  style={{minHeight:186}}>
                    <QueueAnim type="scale">
                        <div key="a">
                            <h3 className="text-center">
                                {L["TITLE_12"]}
                            </h3>
                        </div>
                        <div key="b">
                            <table className="w-100 text-center custom_table custom_table_style">
                                <tbody>
                                    <tr>
                                        <td>{L["CONTENT_12_LABEL1"]}</td>
                                        <td onClick={()=>copyToClipboard(contractAddress)}>{contractAddress ? contractAddress.slice(0,8)+'***'+contractAddress.slice(-4) : '-'} <span class="text-white-50">{L["TEXT_COPY"]}</span></td>
                                    </tr>
                                    <tr>
                                        <td>{L["CONTENT_12_LABEL2"]}</td>
                                        <td onClick={()=>copyToClipboard(contract._referer)}>{contract._referer ? contract._referer.slice(0,8)+'***'+contract._referer.slice(-4) : '-'} <span class="text-white-50">{L["TEXT_COPY"]}</span></td>
                                    </tr>
                                    <tr>
                                        <td>{L["CONTENT_12_LABEL3"]}</td>
                                        <td onClick={()=>copyToClipboard('https://'+window.location.host+'/mlm/'+contract.address || '')}>{contract.address ? contract.address.slice(0,8)+'***'+contract.address.slice(-4) : '-'} <span class="text-white-50">{L["TEXT_COPY"]}</span></td>
                                    </tr>
                                    <tr>
                                        <td>{L["CONTENT_12_LABEL4"]}</td>
                                        <td><span className="warning-number">{contract.redeemAmount ? NF(contract.redeemAmount/10) : '-'}</span> USDT</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </QueueAnim>
                </OverPack>           
            </div>
        </Section>
    );
}
export default Section_13;
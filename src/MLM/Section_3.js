/* import React from 'react'; */
import styled from 'styled-components';
import ImgLogo from '../img/prism.webp'
import ImgGalaxy from '../img/galaxy.webp'
import { /* Parallax, */OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import {copyToClipboard} from '../util';
import { useSelector} from 'react-redux';
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
    position: relative;
    margin-top: 10px;
    background: #080E23 url(${ImgGalaxy}) center/cover no-repeat;
    padding-bottom:0;
    .invite{
        margin-top:0;
        .invitelink{
            background-color:#000;
            color:#13B643;
            font-weight:100;
            margin-right:0;
            border:1px solid #000;
            border-radius:6px;
            border-top-right-radius:0;
            border-bottom-right-radius:0;
        }
        button{
            margin-left:0 !important;
            border-top-left-radius:0;
            border-bottom-left-radius:0;
            color:#fff !important;
            background-color:#13B643 !important;
            border-color:#13B643 !important;
            width:100px;
        }
    }
    .invitelink{
        word-break: break-all;
        font-size:12px;
        background-color:#000;
        padding:2.5px 5px;
        border-top-left-radius:6;
        border-bottom-left-radius:6;
        color:#ccc;
    }
    .network-static{
        margin-top:10px;
        display:flex;
        flex-direction:column;
        *{
            display:flex;
            flex-direction:column;
        }
        .row-content{
            flex-direction: row;
            width:50%;    
            *{font-size:12px;color:#13B643 !important}        
            .label{
                margin-right:10px;
            }
            .content{

            }
        }
    }
`;
  
function Section_3(props) {
	const L = useSelector(state => state.contract.L);
    let contract = useSelector(state => state.contract);
    let totalUser = contract.totalUsers;
    let currentLayer = contract.currentLayer;
    return (
        <Section>
            <OverPack always={false}  style={{minHeight:25}}><h3><Texty>{L['TITLE_3']}</Texty></h3></OverPack>
            <div className="content_wrapper" style={{minHeight:486.83}}>
                <OverPack always={false} >
                    <QueueAnim type={['scale']} duration={1000}>
                        <div key="section1" className="network-static">
                            <div className="row-content">
                                <div className="label">{L['TOTAL_USER']}</div>
                                <div className="content">{totalUser}</div>
                            </div>
                            <div className="row-content">
                                <div className="label">{L['CURRENT_LAYER']}</div>
                                <div className="content">{currentLayer}</div>
                            </div>
                        </div>
                        <div key="section2">
                            <img className="w-100" src={ImgLogo} alt="value_tree" />
                        </div>
                    </QueueAnim>
                </OverPack>
            </div>
            
            {contract._deposit?
            <div className="txt_wrapper">
                <OverPack always={false} style={{minHeight:66}} >
                    <QueueAnim duration={1000} type="scale">
                        <div key="a">
                            <h4 className="mb-3" style={{fontSize:12,fontWeight:100}}>
                            {L['CONTENT_3_LINK']}
                            </h4>
                        </div>
                        <div key="b">
                            <div className="d-flex invite">
                                <div className="invitelink">{"https://"+window.location.host+"/mlm/"+contract.address}</div>
                                <button onClick={()=>copyToClipboard("https://"+window.location.host+"/mlm/"+contract.address)} className="btn btn-muted bg_cyan text-white ms-2 text-nowrap radius-button" style={{backgroundColor:'#15b643'}}>
                                {L['CONTENT_3_COPY']}
                                </button>
                            </div>
                        </div>                
                </QueueAnim>
                </OverPack> 
            </div>
            :null}
        </Section>
    );
}

export default Section_3;
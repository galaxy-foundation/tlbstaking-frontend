// import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';
import ImgSolar from '../img/solar.webp'
import { OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
    position: relative;
    width: 100%;
    margin-top: 0px;
    overflow: hidden;
    z-index: 1;
    &::after{
        z-index: -1;
        content:"";
        position: absolute;
        top: 0;
        right: 0;
        width: 60%;
        height: 60%;
        background: url(${ImgSolar}) center/contain no-repeat;
        pointer-events: none;
    }
    table.custom_table {
        text-align: center;
        border-collapse: separate;
        border-spacing: 0 15px;
        * {
            border: 0;
        }
        tr {
            background: rgba(38, 43, 61, 0.651);
            border-radius: 25px;

            .serial_number{
                display: inline-block;
                width: 1.6em;
                height: 1.6em;
                border-radius: 50%;
            }
        }
    }
    table thead tr th{
        font-size:12px;
        padding: 1rem 0rem;
        text-align:center;
    }
    .bg-white{
        color:#222;
    }
`

function Section_6(props) {
	const L = useSelector(state => state.contract.L);
	let contract = useSelector(state => state.contract);
    let classes = [
        'bg_yellow',    'text_yellow',
        'bg_9',         'text_9',
        'bg_yellow_50', 'text_yellow_50',
        'bg-white',     'text-white',
        'bg-white',     'text-white'
    ];
    let index = 1;

    return (
        <Section>
            <div className="content_wrapper" style={{minHeight:117}}>
                <OverPack style={{minHeight:24}} always={false}>
                <h3 className="text-white font_size_68">
                    <Texty>{L['TITLE_6']}</Texty>
                </h3>
                </OverPack>
                <OverPack style={{minHeight:300}} always={false}>
                    <QueueAnim type="left">
                        <div key="a">
                            <table className="table custom_table font_size_37">
                                <thead>
                                    <tr className="text-white mb-3 mb-md-5">
                                        <th>{L['CONTENT_6_COL1']}</th>
                                        <th>{L['CONTENT_6_COL2']}</th>
                                        <th>{L['CONTENT_6_COL3']}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contract.ranks.map((v,k)=>
                                    
                                    //不显示管理员地址
                                    v[0] === '0xc90a7ccda318d0839ccd8be84dc37c6d94702bbb'?'':
                                    <tr key={k}>
                                        <td className="text-white" >
                                            <span className={"serial_number "+classes[Number(k)*2]}>{index++}</span>
                                            {/* <span className={"serial_number "+classes[Number(k)*2]}>{Number(k)+1}</span> */}
                                        </td>
                                        <td className={classes[Number(k)*2+1]}>{v[0].slice(0,8)+'***'+v[0].slice(-4)}</td>
                                        <td className={classes[Number(k)*2+1]}>{v[1]}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </QueueAnim>
                </OverPack>
            </div>
        </Section>
    );
}

export default Section_6;
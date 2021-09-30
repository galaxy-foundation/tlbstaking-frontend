import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
import { contractSlice } from '../reducer';
import {Link} from "react-router-dom";
import Logo from '../img/tlb.svg'
import jp from "../img/jp.webp";
import kr from "../img/kr.webp";
import ru from "../img/rus.webp";
import us from "../img/us.webp";
import ch from "../img/ch.webp";

const Head = styled.header`
	background: #0e1525;
    padding: 15px 36px;
    @media (max-width: 575px) {
        padding: 8px 15px;
    }
    @media (max-width: 767px) {
        .logo {
        height: 60px;
        @media (max-width: 575px) {
            height: 40px;
        }
        }
        .toggle_wrapper {
            .fa-5x {
                font-size: 3rem;
                @media (max-width: 575px) {
                font-size: 2rem;
                }
            }
        }
    }
    .change-lang{
        li{
            color:#fff;
            padding:5px 10px;
            border-bottom:1px solid #000;
            .icon{
                width:20px;
                margin-right:5px;
                display:inline;
                border-radius:2px;
                boder:1px solid #000;
            }
        }
    }
`


export default function () {
	const L = useSelector(state => state.contract.L);
	const contract = useSelector(state => state.contract);
    
	const dispatch = useDispatch();
    function changeLang(lang){
        dispatch(contractSlice.actions.lang(lang));
    }
    return (
        <Head>
            <div className="header_wrapper d-flex justify-content-between align-items-center">
                <Link to="/">
                    <img className="logo" src={Logo} alt="logo" />
                </Link>
                <div className="col_wrapper d-flex align-items-center">            
                    <div className="change-lang">
                        <div className="dropdown custom_dropdown">
                            <button id="dropdownLangButton"
                                data-mdb-toggle="dropdown"  className="btn bg-black rounded-pill font_size_29 text-white">
                                {L['LANG']}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end custom_dropdown_menu bg_blue_9" aria-labelledby="dropdownLangButton">
                                <li onClick={()=>changeLang('zh-CN')}>
                                    <img className="icon" src={ch}/>中文
                                </li>
                                <li onClick={()=>changeLang('en-US')}>
                                <img className="icon" src={us}/>English
                                </li>
                                <li onClick={()=>changeLang('japanese')}>
                                <img className="icon" src={jp}/>日本語
                                </li>
                                <li onClick={()=>changeLang('korean')}>
                                <img className="icon" src={kr}/>한글
                                </li>
                                <li onClick={()=>changeLang('ru-RU')}>
                                <img className="icon" src={ru}/>русский язык
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="toggle_wrapper ms-1 ms-sm-3">
                        <div className="dropdown custom_dropdown">
                            <button id="dropdownMenuButton"
                                data-mdb-toggle="dropdown" className="btn btn-muted shadow-0 text-white dropdown-toggle">
                                <i className="fas fa-bars fa-5x"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end custom_dropdown_menu bg_blue_9" aria-labelledby="dropdownMenuButton">
                                {contract._referer ? (<li>
                                    <Link to={"/mlm/"+contract._referer} className="dropdown-item text-white">{L['HOME']}</Link>
                                </li>) : null}
                                {(contract._minerReferer || contract._referer) ? (<li>
                                    <Link to={"/miner/"+(contract._minerReferer || contract._referer)} className="dropdown-item text-white">{L['MINER']}</Link>
                                </li>) : null}
                                <li>
                                    <Link to="/official_announcement_video.mp4" className="dropdown-item text-white" target="_blank">{L['VIDEO']}</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Head>
    );
}
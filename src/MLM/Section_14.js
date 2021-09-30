import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import ImgPartner1 from '../img/partner1.webp'
import ImgPartner2 from '../img/partner2.webp'
import ImgPartner3 from '../img/partner3.webp'
import ImgPartner4 from '../img/partner4.webp'
import ImgPartner5 from '../img/partner5.webp'
import ImgPartner6 from '../img/partner6.webp'
import ImgPartner7 from '../img/partner7.webp'
import ImgPartner8 from '../img/partner8.webp'
import ImgPartner9 from '../img/partner9.webp'
import ImgPartner10 from '../img/partner10.webp'

import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
    h3 {
        margin-bottom: 1em;
    }
`

function Section_14(props) {
	const L = useSelector(state => state.contract.L);
    return (
        <Section>
            <div className="content_head">
    
                <h3 className="text-center">
                    {L["TITLE_13"]}
                </h3>

            </div>
            <div className="content_wrapper content_wrapper_img">
                <OverPack always={false}  style={{minHeight:280}}>
                    <QueueAnim type="scale">
                        <div key="a1" className="row">
                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner1} alt="oklink" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner2} alt="viki" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div key="a2" className="row">
                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner3} alt="sportcash" />
                                    </a>
                                </div>
                            </div>


                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner4} alt="wink" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div key="a3" className="row">
                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner5} alt="linear" />
                                    </a>
                                </div>
                            </div>

                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner6} alt="grec" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div key="a4" className="row">
                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner7} alt="caa" />
                                    </a>
                                </div>
                            </div>

                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner8} alt="imToken" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div key="a5" className="row">
                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white  h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner9} alt="gfuel" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 mb-3 mb-md-5 h-auto">
                                <div className="col_wrapper h-100">
                                    <a href="#" className="w-100 d-block bg-white  h-100 d-flex justify-content-center align-items-center">
                                        <img className="w-100" src={ImgPartner10} alt="cj_hello" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </QueueAnim>
                </OverPack>
            </div>
        </Section>
    );
}

export default Section_14;
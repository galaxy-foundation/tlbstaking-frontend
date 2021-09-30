import {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import {NF} from '../util';
import ImgCounter from '../img/counter.webp'
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';

import ImgInsurance from '../img/insurance.webp'
import Imgdp from '../img/dp.webp'
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
    margin-top: 0;
    .count {
        background: url(${ImgCounter}) center/cover no-repeat;
        
    }
    .globe_bg {
        margin-top: 50px;
        height: 1000px;
        background: url(${ImgInsurance}) center/cover no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        @media (max-width: 991px) {
            height: 800px;
            @media (max-width: 767px) {
                height: 600px;
                @media (max-width: 575px) {
                    height: 400px;
                }
            }
        }
    }
    .pool-amount {
        text-align: center;
        color: #cc0000;
        text-shadow: 0px 10px 5px black;
        font-weight: bolder;
    }
    .countdown_item{
        h4{
            font-size:12px;
            font-weight:100;
        }
    }
    .countdown_wrapper{
        padding:30px 15px;
    }
    .dp {
        position: absolute;
        width: 12rem;
        height: 20rem;
        top:0;
        img {
          width: 100%;
          height: 100%;
          animation: bounce-down 6s linear infinite;
        }
  
        @keyframes bounce-down {
          25% {
            transform:rotateY(45deg);
          }
  
          50%,
          100% {
            transform:rotateY(5deg);
          }
  
          75% {
            transform:rotateY(45deg);
          }
        }
      }
      .countdown_item{
          .count{
              font-size:30px;
          }
      }
`
const calculateTimeLeft = (time) => {
	if (time) {
        let now = Math.floor(new Date().getTime()/1000);
        let insStart = 1628470979 + 86400 * 60;
        let timeleft = 0;
        if (now<insStart) {
            timeleft =  insStart - now;
        } else {
            timeleft =  (time + 129600) - now;
        }
		return {
            insuranceDays: Math.floor(timeleft / 86400),
            insuranceHours: Math.floor((timeleft % 86400) / 3600),
            insuranceMinites: Math.floor((timeleft % 3600) / 60),
            insuranceSeconds: timeleft % 60
        };
	}
	return {
        insuranceDays: 0,
        insuranceHours: 0,
        insuranceMinites: 0,
        insuranceSeconds: 0
    };
}

function Section_11(props) {
	const L = useSelector(state => state.contract.L);
	let contract = useSelector(state => state.contract);
	const [time, setTime] = useState(calculateTimeLeft(contract.insuranceCounterTime));
	useEffect(() => {
		const timer=setTimeout(() => {
			setTime(calculateTimeLeft(contract.insuranceCounterTime));
		}, 1000);
		return () => clearTimeout(timer);
	});
    /* const cells = status.insuranceDays ? 3 : 0; */
    return (
        <Section>
            <OverPack always={false}  style={{minHeight:666}}>
                <QueueAnim type="scale">
                    <div key="a">
                        <h3 className="text-center">
                            {L["TITLE_11"]}
                        </h3>
                    </div>
                    <div key="b">
                        <div className="content_wrapper content_wrapper_body">
                            <div className="countdown_wrapper d-flex justify-content-center">
                                {time.insuranceDays?(
                                    <div className="countdown_item text-center me-3 me-md-5 text-white">
                                    <strong className="h1 count py-2 px-3 text_cyan d-inline-block ">
                                        {(time.insuranceDays > 9 ? '' : '0') + time.insuranceDays}
                                    </strong>
                                    <h4>
                                    {L["CONTENT_11_TIME_DAYS"]}
                                    </h4>
                                </div>) : null}
                                <div className="countdown_item text-center me-3 me-md-5 text-white">
                                    <strong className="h1 count py-2 px-3 text_cyan d-inline-block ">
                                        {(time.insuranceHours > 9 ? '' : '0') + time.insuranceHours}
                                    </strong>
                                    <h4>
                                    {L["CONTENT_11_TIME_HOUR"]}
                                    </h4>
                                </div>
                                <div className="countdown_item text-center me-3 me-md-5 text-white">
                                    <strong className="h1 count py-2 px-3 text_cyan d-inline-block ">
                                        {(time.insuranceMinites > 9 ? '' : '0') + time.insuranceMinites}
                                    </strong>
                                    <h4>
                                    {L["CONTENT_11_TIME_MIN"]}
                                    </h4>
                                </div>
                                <div className="countdown_item text-center text-white">
                                    <strong className="h1 count py-2 px-3 text_cyan d-inline-block ">
                                        {(time.insuranceSeconds > 9 ? '' : '0') + time.insuranceSeconds}
                                    </strong>
                                    <h4>
                                    {L["CONTENT_11_TIME_SEC"]}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div key="c">
                        <h4 className="text-center text-white font_size_49">
                            {L["CONTENT_11"]}
                        </h4>
                    </div>
                    <div className="globe_bg" key="d" style={{marginLeft:-30,marginRight:-30}}>
                        <div className="dp">
                        <img src={Imgdp} alt="dp"></img>
                        </div>
                        <h2 className="text-center mb-5">
                            {L["CONTENT_11_SAFEPOOL"]}
                        </h2>
                        <h2 className="pool-amount">
                        $ {NF(contract.insuranceAmount + 1500)}
                        </h2>
                    </div>
                </QueueAnim>
            </OverPack>

        </Section>
    );
}
export default Section_11;
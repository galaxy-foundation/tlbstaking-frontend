import { toast } from 'react-toastify';



export const NF = (num,p=2) => Number(num).toFixed(p);// .replace(/(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
export const TF = (time,offset=2) => {
    let iOffset = Number(offset);
	let date = time===undefined ? new Date(Date.now()*1000 + (3600000 * iOffset)) : (typeof time==='number'?new Date(time*1000 + (3600000 * iOffset)):new Date(+time + (3600000 * iOffset)));
	let y=date.getUTCFullYear();
	let m=date.getUTCMonth() + 1;
	let d=date.getUTCDate();
	let hh=date.getUTCHours();
	let mm=date.getUTCMinutes();
	let ss=date.getUTCSeconds();
	let dt=("0" + m).slice(-2) + "-" + ("0" + d).slice(-2);
	let tt=("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2) + ":" + ("0" + ss).slice(-2);
	/* if(dateOnly==='smart') {
		let date2 = new Date(Date.now()*1000 + (3600000 * iOffset));
		let y2=date2.getUTCFullYear();
		let m2=date2.getUTCMonth() + 1;
		let d2=date2.getUTCDate();
		if(y==y2) {
			if(m!=m2 || d!=d2) return dt;
			return tt;
		}
		return y+'-'+dt;
	} */
    return y+'-'+dt+' '+tt;
}

export const copyToClipboard = (text) => {
	var textField = document.createElement('textarea')
	textField.innerText = text
	document.body.appendChild(textField)
	textField.select()
	document.execCommand('copy')
	textField.remove()
	toast(`复制到 【${text}】`, {
		position: "top-right",
		autoClose: 1000,
		/* hideProgressBar: false, */
		/* closeOnClick: true,
		pauseOnHover: true, */
		/* draggable: true, */
		/* progress: undefined, */
	});
};

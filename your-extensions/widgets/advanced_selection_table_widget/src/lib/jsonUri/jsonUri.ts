import AdvancedSelectionTable from "../../runtime/widget";

export const getJsonUri = (obj:any,self:AdvancedSelectionTable) =>{
    let url = " ";
    let blob = null;
    if (obj instanceof Object || obj instanceof Array){
        const str = JSON.stringify(obj);
        const data = encode( str );
        blob = new Blob( [ data ], {type: 'application/json'});
        url = URL.createObjectURL( blob );
    }
    return blob;
}


const encode = ( s :string)=> {
	const out = [];
	for ( var i = 0; i < s.length; i++ ) {
		out[i] = s.charCodeAt(i);
	}
	return new Uint8Array( out );
}
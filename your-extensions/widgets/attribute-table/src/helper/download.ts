
class Download{
    static downloadFile(content,filename){
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    static CSV(object,filename = "download.csv") {
        const array = [Object.keys(object[0])].concat(object)
        Download.downloadFile(array.map(it => {
            return Object.values(it).toString()
        }).join('\n'),filename);
    }
}


export default new Download();
export {Download};
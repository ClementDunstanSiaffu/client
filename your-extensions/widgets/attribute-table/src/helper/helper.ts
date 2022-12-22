
class Helper {

    openSideBar(){
        const sidebar = document.querySelector(".sidebar-controller");
        //@ts-ignore
        if(sidebar?.getAttribute("aria-expanded") === "false"){
            //@ts-ignore
            if(sidebar) sidebar.click();
        }
    }

}

export default new Helper();